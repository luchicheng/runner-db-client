<template>
    <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="albums"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Albums</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" href="http://localhost:8082" target="_blank">Import Album</v-btn>
              </template>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="gotoViewAlbum(item)"
          >
            mdi-image-filter
          </v-icon>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import AlbumsService from '@/services/AlbumsService'

export default {
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Comment', value: 'comment' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      albums: [],
      dialog: false,
      editedIndex: -1,
      menu: false,
      editedItem: {
        name: '',
        year: '',
        dor: '',
        distance: '',
        wmm: '',
        bq: '',
        desc: '',
        comment: ''
      },
      defaultItem: {
        name: '',
        year: '',
        dor: '',
        distance: '',
        wmm: '',
        bq: '',
        desc: '',
        comment: ''
      },
      errorMessages: '',
      // required: (value) => !!value || 'Required.'
      formHasErrors: false

    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Album' : 'Edit Album'
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    dialog (val) {
      val || this.close()
    },
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.albums = (await AlbumsService.index(value)).data
      }
    },
    name () {
      this.errorMessages = ''
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.albums.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem (item) {
      const index = this.albums.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        // TODO call backend
        await AlbumsService.delete(item.id)
        this.albums.splice(index, 1)
        console.log('deleted item spliced.....')
      }
    },

    gotoViewAlbum (item) {
      this.$router.push({
        name: 'albumsDetail',
        params: {
          albumId: item.id,
          albumName: item.name
        }
      })
    },

    close () {
      console.log('close method clicked.......')
      this.errorMessages = []
      this.formHasErrors = false

      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    async save () {
      this.formHasErrors = false
      // Object.keys(this.editedItem).forEach(f => {
      //   console.log(f, this.$refs[f])
      // })
      Object.keys(this.editedItem).forEach(f => {
        // console.log(f, this.formHasErrors)
        if (f !== 'id' && f !== 'dor' && f !== 'createdAt' && f !== 'updatedAt') {
          if (!this.$refs[f].validate(true)) {
            this.formHasErrors = true
          }
        }
        // console.log(f, this.formHasErrors)
      })

      if (this.formHasErrors) {
        console.log('Please fill in all the required fields.')
        return
      }

      try {
        console.log(7)
        await AlbumsService.post(this.editedItem)
        console.log(8)
      } catch (err) {
        console.log(err)
        alert(err)
        return
      }

      console.log(9)

      if (this.editedIndex && this.editedIndex > -1) {
        Object.assign(this.albums[this.editedIndex], this.editedItem)
      } else {
        this.albums.push(this.editedItem)
      }
      console.log(10)
      this.close()
    }
  }
}
</script>

<style scoped>
</style>

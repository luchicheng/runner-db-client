<template>
    <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="albums"
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
                <v-btn v-if="$store.state.isUserLoggedIn" color="primary" dark class="mb-2" v-on="on">New Album</v-btn>
              </template>
              <v-form
                ref="form"
                v-model="valid"
              >
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field ref="name" v-model="editedItem.name"
                            required
                            :rules="[ v => !!v || 'This field is required']"
                            label="Album name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="8">
                          <v-text-field ref="desc" v-model="editedItem.gid" label="https://photos.app.goo.gl/[:GID]"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field ref="comment" v-model="editedItem.comment" label="Comment"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            v-if="$store.state.user && $store.state.user.userType == 'A'"
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            v-if="$store.state.user && $store.state.user.userType == 'A'"
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
      editedItem: {},
      defaultItem: {},
      valid: false
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Album' : 'Edit Album'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.albums = (await AlbumsService.index(value)).data
      }
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
          albumGid: item.gid,
          albumName: item.name
        }
      })
    },

    close () {
      console.log('close method clicked.......')
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    async save () {
      this.$refs.form.validate()
      if (this.valid) {
        try {
          await AlbumsService.post(this.editedItem)
        } catch (err) {
          console.log(err)
          alert(err)
          return
        }

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
}
</script>

<style scoped>
</style>

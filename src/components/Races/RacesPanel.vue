<template>
    <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="races"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Races</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Race</v-btn>
              </template>
              <v-card ref="form">
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
                          :error-messages="errorMessages" label="Race name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-autocomplete ref="year" v-model="editedItem.year"
                          required
                          :items="years"
                          placeholder="Select..."
                          :rules="[ v => !!v || 'This field is required']"
                          :error-messages="errorMessages" label="Year"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                         <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.dor"
                              required
                              :rules="[ v => !!v || 'This field is required']"
                              :error-messages="errorMessages" label="Date Of Race"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            ref="picker"
                            v-model="editedItem.dor"
                            max="2030-01-01"
                            min="2020-01-01"
                            @change="save_date"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-autocomplete ref="distance"
                          v-model="editedItem.distance"
                          :items="distances"
                          placeholder="Select..."
                          label="Distance"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-autocomplete ref="wmm"
                          v-model="editedItem.wmm"
                          :items="wmms"
                          placeholder="Select..."
                          label="world major marathons"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-autocomplete ref="bq"
                          v-model="editedItem.bq"
                          :items="bqs"
                          placeholder="Select..."
                          label="BQ certified"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="12" md="8">
                        <v-text-field ref="desc" v-model="editedItem.desc" label="Description"></v-text-field>
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
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import RacesService from '@/services/RacesService'

export default {
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Year', value: 'year' },
        { text: 'Date Of Race', value: 'dor' },
        { text: 'Distance', value: 'distance' },
        { text: 'World Major Marathons', value: 'wmm' },
        { text: 'BQ Certified', value: 'bq' },
        { text: 'Description', value: 'desc' },
        { text: 'Comment', value: 'comment' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      races: [],
      distances: ['10K', '21.1K', '30K', '42.2K'],
      years: ['2020', '2021', '2022'],
      wmms: ['Y', 'N'],
      bqs: ['Y', 'N'],
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
      return this.editedIndex === -1 ? 'New Race' : 'Edit Race'
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
        this.races = (await RacesService.index(value)).data
      }
    },
    name () {
      this.errorMessages = ''
    }
  },
  methods: {
    save_date (date) {
      this.$refs.menu.save(date)
    },
    editItem (item) {
      this.editedIndex = this.races.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem (item) {
      const index = this.races.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        // TODO call backend
        await RacesService.delete(item.id)
        this.races.splice(index, 1)
        console.log('deleted item spliced.....')
      }
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
        await RacesService.post(this.editedItem)
        console.log(8)
      } catch (err) {
        console.log(err)
        alert(err)
        return
      }

      console.log(9)

      if (this.editedIndex && this.editedIndex > -1) {
        Object.assign(this.races[this.editedIndex], this.editedItem)
      } else {
        this.races.push(this.editedItem)
      }
      console.log(10)
      this.close()
    }
  }
}
</script>

<style scoped>
</style>

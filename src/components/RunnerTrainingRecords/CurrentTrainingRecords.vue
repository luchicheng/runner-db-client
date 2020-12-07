<template>
    <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="trainingRecords"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>TrainingRecord Training Records (recent performance)</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
              <v-form
                ref="form"
                v-model="valid"
              >
                <v-card ref="form">
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            v-model="date_menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.date"
                                label="Date (YYYY-MM-DD)"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="editedItem.date" @input="date_menu = false"></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete ref="distance" v-model="editedItem.distance"
                            :items="distanceType"
                            placeholder="Select..."
                            :rules="[ v => !!v || 'This field is required']"
                            :error-messages="errorMessages" label="Distance"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-checkbox
                            v-model="editedItem.currentPerf"
                            label="Current Performance"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field ref="comment"
                            v-model="editedItem.comment" label="Comment"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="8">
                          <v-menu
                            ref="time_menu"
                            v-model="time_menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="editedItem.time"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.time"
                                label="Time (HH:mm:ss)"
                                :rules="[v => !!v || 'Time is required']"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="time_menu"
                              v-model="editedItem.time"
                              full-width use-seconds format="24hr" :allowed-hours="allowedhours"
                              @click:second="$refs.time_menu.save(editedItem.time)"
                            ></v-time-picker>
                          </v-menu>
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
          <v-icon small color="blue" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import TrainingRecordsService from '@/services/TrainingRecordsService'

export default {
  // props: [
  //   'runnerId'
  // ],
  data () {
    return {
      runnerId: '',
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Distance', value: 'distance' },
        { text: 'Time', value: 'time' },
        { text: 'Pace(min/K)', value: 'pace' },
        { text: 'Recent Performance', value: 'currentPerf' },
        { text: 'Comment', value: 'comment' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      trainingRecords: [],
      YesOrNo: ['Y', 'N'],
      distanceType: ['5K', '8K', '10K', '21.1K', '30K', '32K'],
      dialog: false,
      editedIndex: -1,
      time_menu: false,
      date_menu: false,
      editedItem: {},
      defaultItem: {},
      errorMessages: '',
      valid: false,
      allowedhours: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New TrainingRecord' : 'Edit TrainingRecord'
    },
    ...mapState([
      'route'
    ])
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        console.log('value', value)
        if (this.runnerId) {
          this.trainingRecords = (await TrainingRecordsService.searchTrainingRecords(
            this.runnerId, value)
          ).data
        } else {
          console.log('runner id is null when try to query trainging data')
        }
      }
    }
  },
  methods: {
    save_date (date) {
      this.$refs.menu.save(date)
    },
    editItem (item) {
      this.editedIndex = this.trainingRecords.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem (item) {
      const index = this.trainingRecords.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        // TODO call backend
        await TrainingRecordsService.delete(item.id)
        this.trainingRecords.splice(index, 1)
        // console.log('deleted item spliced.....')
      }
    },

    close () {
      this.errorMessages = []
      this.formHasErrors = false

      this.dialog = false
      setTimeout(() => {
        this.editedItem = {}
        this.editedIndex = -1
      }, 300)
    },

    async save () {
      this.$refs.form.validate()
      if (this.valid) {
        try {
          await TrainingRecordsService.put(this.editedItem)
        } catch (err) {
          console.log(err)
          alert(err)
          return
        }

        if (this.editedIndex > -1) {
          Object.assign(this.trainingRecords[this.editedIndex], this.editedItem)
        } else {
          this.trainingRecords.push(this.editedItem)
        }
        this.close()
      }
    }
  },
  async mounted () {
    console.log('mounted:' + JSON.stringify(this.route))
    this.runnerId = this.route.params.runnerId
    console.log('mounted:' + this.runnerId)
    this.trainingRecords = (await TrainingRecordsService.searchTrainingRecords(
      this.runnerId, null)
    ).data
  }
}
</script>

<style scoped>
</style>

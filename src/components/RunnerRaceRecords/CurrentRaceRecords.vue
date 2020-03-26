<template>
    <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="raceRecords"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>RaceRecord Race Records</v-toolbar-title>
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
                          <v-autocomplete ref="RaceId"
                            v-model="selectedRace"
                            :items="validRaces"
                            placeholder="Select..."
                            item-value="value"
                            item-text="value.name"
                            :rules="[v => !!v || 'Race is required']"
                            label="Race"
                            clearable
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="validRaces"
                            v-model="selectedRace"
                            label="Date"
                            item-value="value"
                            item-text="value.dor"
                            readonly
                            >
                          </v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="validRaces"
                            v-model="selectedRace"
                            label="Distance"
                            item-value="value"
                            item-text="value.distance"
                            readonly
                            >
                          </v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-checkbox
                            v-model="editedItem.debut"
                            label="Debut"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
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
                          <v-col cols="12" sm="12" md="8">
                            <v-text-field ref="comment"
                              v-model="editedItem.comment" label="Comment"
                            ></v-text-field>
                          </v-col>
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
        <template v-slot:item.actions="{ item }">
          <v-icon small color="blue" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import RaceRecordsService from '@/services/RaceRecordsService'
import _ from 'lodash'

export default {
  props: [
    'validRaces'
  ],
  data () {
    return {
      runnerId: '',
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Name', value: 'raceName' },
        { text: 'Distance', value: 'distance' },
        { text: 'Time', value: 'time' },
        { text: 'Pace(min/K)', value: 'pace' },
        { text: 'Debut', value: 'debut' },
        { text: 'Comment', value: 'comment' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      raceRecords: [],
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
      allowedhours: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
      selectedRace: null
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New RaceRecord' : 'Edit RaceRecord'
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
      // immediate: true,
      async handler (value) {
        if (this.runnerId) {
          this.raceRecords = (await RaceRecordsService.searchRaceRecords(
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
      this.editedIndex = this.raceRecords.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // init selectedRace by editedIndex.RaceId
      this.selectedRace = _.find(this.validRaces, { 'text': this.editedItem.raceName }).value
      this.dialog = true
    },
    async deleteItem (item) {
      const index = this.raceRecords.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        // TODO call backend
        await RaceRecordsService.delete(item.id)
        this.raceRecords.splice(index, 1)
        console.log('deleted item spliced.....')
      }
    },

    close () {
      console.log('close method clicked.......')
      this.errorMessages = []
      this.formHasErrors = false

      this.dialog = false
      setTimeout(() => {
        this.editedItem = {}
        this.editedIndex = -1
      }, 300)
    },

    async save () {
      console.log('entering save', this.editedIndex)
      this.$refs.form.validate()
      if (this.valid) {
        try {
          this.editedItem.RaceId = this.selectedRace.id
          this.editedItem.raceName = this.selectedRace.name
          this.editedItem.distance = this.selectedRace.distance
          this.editedItem.date = this.selectedRace.dor
          await RaceRecordsService.put(this.editedItem)
        } catch (err) {
          alert(err)
          return
        }
        if (this.editedIndex > -1) {
          // updating
          Object.assign(this.raceRecords[this.editedIndex], this.editedItem)
        } else {
          this.raceRecords.push(this.editedItem)
        }
        console.log(10)
        this.close()
      }
    }
  },
  async mounted () {
    this.runnerId = this.route.params.runnerId
    this.raceRecords = (await RaceRecordsService.searchRaceRecords(
      this.runnerId, null)
    ).data
  }
}
</script>

<style scoped>
</style>

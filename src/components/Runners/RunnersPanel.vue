<template>
    <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="runners"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Runners</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary"
                  v-if="$store.state.user && ($store.state.user.userType == 'A' || $store.state.user.userType == 'C')"
                  dark class="mb-2" v-on="on">New Runner</v-btn>
              </template>
              <v-form
                ref="form"
                autocomplete="off">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field ref="name" v-model="editedItem.name"
                            :rules="[ v => !!v || 'This field is required']"
                            label="Runner name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            ref="date_menu"
                            v-model="date_menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.dob"
                                label="Birthday date"
                                :rules="[ v => !!v || 'This field is required']"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              ref="date_picker"
                              v-model="editedItem.dob"
                              :max="new Date().toISOString().substr(0, 10)"
                              min="1920-01-01"
                              @change="save_date"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete ref="gender" v-model="editedItem.gender"
                            :items="genders"
                            placeholder="Select..."
                            :rules="[ v => !!v || 'This field is required']"
                            label="Gender"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field ref="nickName" v-model="editedItem.nickName" label="Nick Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete ref="size"
                            v-model="editedItem.size"
                            :items="sizes"
                            placeholder="Select..."
                            label="Size"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field ref="phone"
                            :rules="[ v => !!v || 'This field is required']"
                            v-model="editedItem.phone" label="Phone"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field ref="eName"
                            v-model="editedItem.eName"
                            :rules="[ v => !!v || 'This field is required']"
                            label="Emergency Contact Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Referer"
                            v-model="editedItem.referer"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Personal Best"
                            v-model="editedItem.personalBest"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            v-model="editedItem.runningAge"
                            :items="runningAges"
                            placeholder="Select..."
                            label="Running Age"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Other Sports Hobbies"
                            v-model="editedItem.otherSportsHobbies"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Personal Target"
                            v-model="editedItem.personalTarget"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            ref="ePhone"
                            :rules="[ v => !!v || 'This field is required']"
                            v-model="editedItem.ePhone" label="Emergency Phone"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field ref="comment" v-model="editedItem.comment" label="Comment"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete ref="RaceId"
                            v-model="editedItem.RaceId"
                            :items="validRaces"
                            placeholder="Select..."
                            item-value="id"
                            item-text="name"
                            label="Goal Race"
                            clearable
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="12" md="8">
                          <v-menu
                            ref="time_menu"
                            v-model="time_menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="editedItem.goalRaceTime"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.goalRaceTime"
                                label="Goal Race Time (HH:mm:ss)"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="time_menu"
                              v-model="editedItem.goalRaceTime"
                              full-width use-seconds format="24hr" :allowed-hours="allowedhours"
                              @click:second="$refs.time_menu.save(editedItem.goalRaceTime)"
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
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on" small color="blue" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            </template>
            <span>Edit Runner</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                v-if="$store.state.user && ($store.state.user.userType == 'A' || $store.state.user.userType == 'C')"
                small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <span>Delete Runner</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon small color="orange"
                v-bind="attrs"
                v-on="on" class="mr-2" @click="gotoSubmitTrainningRecord(item)">mdi-calendar-clock</v-icon>
            </template>
            <span>Add Trainning Record</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon small color="purple" class="mr-2"
              v-bind="attrs"
              v-on="on" @click="gotoSubmitRaceRecord(item)">mdi-run-fast</v-icon>
            </template>
            <span>Add Race Record</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import RunnersService from '@/services/RunnersService'
import RacesService from '@/services/RacesService'

export default {
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Date Of Birth', value: 'dob' },
        { text: 'Gender', value: 'gender' },
        { text: 'Nick Name', value: 'nickName' },
        { text: 'Phone', value: 'phone', sortable: false },
        { text: 'Referer', value: 'referer' },
        { text: 'Comment', value: 'comment' },
        { text: 'Goal Race', value: 'Race.name' },
        { text: 'Goal Race Time', value: 'goalRaceTime' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      runners: [],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      runningAges: [ '1', '2', '3', '4', '5', '5+', '10+', '20+', '30+' ],
      genders: ['M', 'F'],
      validRaces: [],
      dialog: false,
      editedIndex: -1,
      time_menu: false,
      date_menu: false,
      editedItem: {},
      defaultItem: {},
      allowedhours: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Runner' : 'Edit Runner'
    },
    runnerFilter: function () {
      if (this.$store.state.isUserLoggedIn) {
        if (this.$store.state.user.userType === 'A') {
          return 'ALL'
        }
        if (this.$store.state.user.userType === 'C') {
          return 'ALL'
        }
        if (this.$store.state.user.userType === 'R') {
          return this.$store.state.user.RunnerId
        }
      }
      return null
    }
  },
  watch: {
    date_menu (val) {
      val && setTimeout(() => (this.$refs.date_picker.activePicker = 'YEAR'))
    },
    dialog (val) {
      val || this.close()
    },
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.runners = (await RunnersService.index(value, this.runnerFilter)).data
      }
    }
  },
  methods: {
    save_date (date) {
      this.$refs.date_menu.save(date)
    },
    editItem (item) {
      this.editedIndex = this.runners.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    gotoSubmitTrainningRecord (item) {
      console.log('gotoSubmitTrainningRecord', item.id)
      console.log('gotoSubmitTrainningRecord', item.name)
      this.$router.push({
        name: 'runner-training',
        params: {
          runnerId: item.id,
          runnerName: item.name
        }
      })
    },
    gotoSubmitRaceRecord (item) {
      console.log('gotoSubmitRaceRecord', item.id)
      this.$router.push({
        name: 'runner-race',
        params: {
          runnerId: item.id,
          runnerName: item.name
        }
      })
    },
    async deleteItem (item) {
      const index = this.runners.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        await RunnersService.delete(item.id)
        this.runners.splice(index, 1)
      }
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    async save () {
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        const newlyRunner = await RunnersService.post(this.editedItem)
        this.editedItem.id = newlyRunner.data.id
        // TODO bug here, remove GoalRace from a runner doesn't work.
      } catch (err) {
        console.log(err)
        alert(err)
        return
      }

      if (this.editedIndex > -1) {
        Object.assign(this.runners[this.editedIndex], this.editedItem)
      } else {
        this.runners.push(this.editedItem)
      }
      this.close()
    }
  },
  async mounted () {
    try {
      this.validRaces = (await RacesService.getAvailableRaces()).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>
.v-time-picker-title__time .v-picker__title__btn, .v-time-picker-title__time span{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  height: 0px;
  font-size: 16px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
</style>

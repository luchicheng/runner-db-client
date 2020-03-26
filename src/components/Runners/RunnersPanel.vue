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
                <v-btn color="primary" dark class="mb-2" v-on="on">New Runner</v-btn>
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
                          :error-messages="errorMessages" label="Runner name"
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
                          required
                          :items="genders"
                          placeholder="Select..."
                          :rules="[ v => !!v || 'This field is required']"
                          :error-messages="errorMessages" label="Gender"
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
                        <v-text-field ref="phone" v-model="editedItem.phone" label="Phone"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field ref="eName" v-model="editedItem.eName" label="Emergency Contact Name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field ref="ePhone" v-model="editedItem.ePhone" label="Emergency Phone"></v-text-field>
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
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small color="blue" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
          <v-icon small color="orange" class="mr-2" @click="gotoSubmitTrainningRecord(item)">mdi-calendar-clock</v-icon>
          <v-icon small color="purple" class="mr-2" @click="gotoSubmitRaceRecord(item)">mdi-run-fast</v-icon>
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
        { text: 'Comment', value: 'comment' },
        { text: 'Goal Race', value: 'Race.name' },
        { text: 'Goal Race Time', value: 'goalRaceTime' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      runners: [],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      genders: ['M', 'F'],
      validRaces: [],
      dialog: false,
      editedIndex: -1,
      time_menu: false,
      date_menu: false,
      editedItem: {},
      defaultItem: {},
      errorMessages: '',
      // required: (value) => !!value || 'Required.'
      formHasErrors: false,
      allowedhours: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Runner' : 'Edit Runner'
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
        this.runners = (await RunnersService.index(value)).data
      }
    },
    name () {
      this.errorMessages = ''
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
        // TODO call backend
        await RunnersService.delete(item.id)
        this.runners.splice(index, 1)
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
      Object.keys(this.editedItem).forEach(f => {
        // console.log(f, this.formHasErrors)
        if (this.$refs[f] && !this.$refs[f].validate(true)) {
          this.formHasErrors = true
        }
        // console.log(f, this.formHasErrors)
      })

      if (this.formHasErrors) {
        console.log('Please fill in all the required fields.')
        return
      }

      try {
        // TODO bug here, console.log(8) is not executeds
        console.log(7)
        // console.log(this.editedItem)
        // if (!this.editedItem.RaceId) {
        //   this.editedItem.Race = null
        // }
        // console.log(this.editedItem)
        const newlyRunner = await RunnersService.post(this.editedItem)
        this.editedItem.id = newlyRunner.data.id
        // TODO bug here, remove GoalRace from a runner doesn't work.
        console.log(8)
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
      console.log(10)
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

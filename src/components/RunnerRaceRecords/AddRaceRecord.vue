<template>
  <v-layout>
    <v-flex xs12>
      <panel title="RaceRecord Metadata">
        <v-form
          ref="form"
          v-model="valid"
        >
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
          <v-select
            :items="validRaces"
            v-model="selectedRace"
            label="Date"
            item-value="value"
            item-text="value.dor"
            readonly
            >
          </v-select>
          <v-select
            :items="validRaces"
            v-model="selectedRace"
            label="Distance"
            item-value="value"
            item-text="value.distance"
            readonly
            >
          </v-select>
          <v-menu
            ref="time_menu"
            v-model="time_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="racerecord.time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="racerecord.time"
                label="Time (HH:mm:ss)"
                readonly
                :rules="[v => !!v || 'Time is required']"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="time_menu"
              v-model="racerecord.time"
              full-width use-seconds format="24hr" :allowed-hours="allowedhours"
              @click:second="$refs.time_menu.save(racerecord.time)"
            ></v-time-picker>
          </v-menu>
          <v-checkbox
            v-model="racerecord.debut"
            label="Debut"
          ></v-checkbox>

          <v-text-field
            label="Comment"
            v-model="racerecord.comment"
          ></v-text-field>
          <v-btn class="primary"
            @click="save">
            Save
          </v-btn>
        </v-form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import RaceRecordsService from '@/services/RaceRecordsService'
import {mapState} from 'vuex'

export default {
  props: [
    'validRaces'
  ],
  data () {
    return {
      valid: false,
      time_menu: false,
      date_menu: false,
      racerecord: {
        raceId: null,
        date: new Date().toISOString().slice(0, 10),
        distance: '10K',
        time: null,
        currentPerf: true,
        comment: null
      },
      defaultRacerecord: {
        date: new Date().toISOString().slice(0, 10),
        distance: '10K',
        time: null,
        currentPerf: true,
        comment: null
      },
      distanceTypes: ['5K', '8K', '10K', '21.1K', '30K', '32K'],
      error: null,
      allowedhours: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
      runnerId: '',
      selectedRace: null
    }
  },
  computed: {
    ...mapState([
      'route'
    ])
  },
  mounted () {
    this.runnerId = this.route.params.runnerId
  },
  methods: {
    async save () {
      this.$refs.form.validate()
      if (this.valid) {
        try {
          await RaceRecordsService.post(this.runnerId, this.selectedRace.id, this.racerecord)
          // message success
          alert('Race Record add successfully!')
          this.$refs.form.reset()
          this.racerecord.date = new Date().toISOString().slice(0, 10)

          this.$emit('addSuccess')
        } catch (err) {
          // message failure
          alert('Race Record add failed!')
          console.log(err)
        }
      }
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

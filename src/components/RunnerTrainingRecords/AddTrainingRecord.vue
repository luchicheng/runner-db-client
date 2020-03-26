<template>
  <v-layout>
    <v-flex xs12>
      <panel title="TrainingRecord Metadata">
        <v-form
          ref="form"
          v-model="valid"
        >
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
                v-model="trainingrecord.date"
                label="Date (YYYY-MM-DD)"
                :rules="[v => !!v || 'Date is required']"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="trainingrecord.date" @input="date_menu = false"></v-date-picker>
          </v-menu>
          <v-select
            v-model="trainingrecord.distance"
            :items="distanceTypes"
            :rules="[v => !!v || 'Distance is required']"
            label="Distance"
          ></v-select>
          <v-menu
            ref="time_menu"
            v-model="time_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="trainingrecord.time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="trainingrecord.time"
                label="Time (HH:mm:ss)"
                readonly
                :rules="[v => !!v || 'Time is required']"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="time_menu"
              v-model="trainingrecord.time"
              full-width use-seconds format="24hr" :allowed-hours="allowedhours"
              @click:second="$refs.time_menu.save(trainingrecord.time)"
            ></v-time-picker>
          </v-menu>
          <v-checkbox
            v-model="trainingrecord.currentPerf"
            label="Current Performance"
          ></v-checkbox>

          <v-text-field
            label="Comment"
            v-model="trainingrecord.comment"
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
import TrainingRecordsService from '@/services/TrainingRecordsService'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      valid: false,
      time_menu: false,
      date_menu: false,
      trainingrecord: {
        date: new Date().toISOString().slice(0, 10),
        distance: '10K',
        time: null,
        currentPerf: true,
        comment: null
      },
      defaultTrainingrecord: {
        date: new Date().toISOString().slice(0, 10),
        distance: '10K',
        time: null,
        currentPerf: true,
        comment: null
      },
      distanceTypes: ['5K', '8K', '10K', '21.1K', '30K', '32K'],
      error: null,
      // [ 0,...10 ]
      allowedhours: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
      runnerId: ''
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
          await TrainingRecordsService.post(this.runnerId, this.trainingrecord)
          // message success
          alert('Training Record add successfully!')
          this.$refs.form.reset()
          this.trainingrecord.date = new Date().toISOString().slice(0, 10)

          this.$emit('addSuccess')
        } catch (err) {
          // message failure
          alert('failed')
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

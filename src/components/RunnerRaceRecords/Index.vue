<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>Race records for [ {{ runnerName }} ]
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <template v-slot:extension>
            <v-tabs
              v-model="tabs"
            >
              <v-tabs-slider></v-tabs-slider>
              <v-tab
                href="#tr-tabs-5-1"
              >
                <v-icon>mdi-account-box</v-icon>
                Runner Metadata
              </v-tab>

              <v-tab
                href="#tr-tabs-5-2"
              >
                <v-icon>mdi-calendar-multiple-check</v-icon>
                Search race records
              </v-tab>

              <v-tab
                href="#tr-tabs-5-3"
              >
                <v-icon>mdi-calendar-plus</v-icon>
                Add race record
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="tabs">
          <v-tab-item
            v-for="i in 3"
            :key="i"
            :value="'tr-tabs-5-' + i"
          >
            <v-card v-if="i==1" flat>
              <runner-metadata/>
            </v-card>
            <v-card v-if="i==2" flat>
              <search-race-records :validRaces="validRaces"/>
              <current-race-records class="mt-2" :key="keyCurrentRaceRecords" :validRaces="validRaces"/>
            </v-card>
            <v-card v-if="i==3" flat>
              <add-race-record @addSuccess="newRecordCreated" :validRaces="validRaces"/>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import RunnerMetadata from '../Runners/RunnerMetadata'
import SearchRaceRecords from './SearchRaceRecords'
import AddRaceRecord from './AddRaceRecord'
import CurrentRaceRecords from './CurrentRaceRecords'
import RacesService from '@/services/RacesService'

// import RaceRecordsService from '@/services/RaceRecordsService'

export default {
  data () {
    return {
      // default tab
      tabs: 'tr-tabs-5-3',
      runnerId: null,
      runnerName: '',
      validRaces: [],
      keyCurrentRaceRecords: 0
    }
  },
  computed: {
    ...mapState([
      'route'
    ])
  },
  methods: {
    newRecordCreated (value) {
      this.keyCurrentRaceRecords++
      this.tabs = 'tr-tabs-5-2'
      // this.dialog = true
    }
  },
  async mounted () {
    this.runnerId = this.route.params.runnerId
    this.runnerName = this.route.params.runnerName
    console.log('runnerId in RaceRecords Index vue:', this.runnerId)
    // const runnerId = this.$store.state.route.params.runnerId
    // TODO get current runner's recent race records
    // this.runnerRaceRecords = RaceRecordsService.showTRByRunner(this.runnerId)
    try {
      this.validRaces = (await RacesService.getAvailableRacesObj()).data
    } catch (err) {
      console.log(err)
    }
  },
  components: {
    RunnerMetadata,
    SearchRaceRecords,
    AddRaceRecord,
    CurrentRaceRecords
  }
}
</script>

<style scoped>
</style>

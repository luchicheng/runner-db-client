<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>Training records for [ {{ runnerName }} ]
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
                Search training records
              </v-tab>

              <v-tab
                href="#tr-tabs-5-3"
              >
                <v-icon>mdi-calendar-plus</v-icon>
                Add training record
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
              <search-training-records/>
              <current-training-records class="mt-2" :key="keyCurrentTrainingRecords"/>
            </v-card>
            <v-card v-if="i==3" flat>
              <add-training-record @addSuccess="newRecordCreated"/>
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
import SearchTrainingRecords from './SearchTrainingRecords'
import AddTrainingRecord from './AddTrainingRecord'
import CurrentTrainingRecords from './CurrentTrainingRecords'

// import TrainingRecordsService from '@/services/TrainingRecordsService'

export default {
  data () {
    return {
      // default tab
      tabs: 'tr-tabs-5-3',
      runnerId: null,
      runnerName: '',
      keyCurrentTrainingRecords: 0
    }
  },
  computed: {
    ...mapState([
      'route'
    ])
  },
  methods: {
    newRecordCreated (value) {
      this.keyCurrentTrainingRecords++
      this.tabs = 'tr-tabs-5-2'
      // this.dialog = true
    }
  },
  async mounted () {
    this.runnerId = this.route.params.runnerId
    this.runnerName = this.route.params.runnerName
    console.log('runnerId in TrainingRecords Index vue:', this.runnerId)
    // const runnerId = this.$store.state.route.params.runnerId
    // TODO get current runner's recent training records
    // this.runnerTrainingRecords = TrainingRecordsService.showTRByRunner(this.runnerId)
  },
  components: {
    RunnerMetadata,
    SearchTrainingRecords,
    AddTrainingRecord,
    CurrentTrainingRecords
  }
}
</script>

<style scoped>
</style>

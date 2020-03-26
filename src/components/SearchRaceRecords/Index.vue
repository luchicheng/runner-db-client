<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <search-criteria @submitSearch="startSearch"/>
        <search-result class="mt-2" :key="keySearchResult" :searchResult="searchResultData"/>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SearchCriteria from '../SearchTrainingRecords/SearchCriteria'
import SearchResult from './SearchResult'

import DataSearchService from '@/services/DataSearchService'

export default {
  data () {
    return {
      keySearchResult: 0,
      searchResultData: []
    }
  },
  computed: {
  },
  methods: {
    async startSearch (event) {
      console.log('start searching:', event)
      this.searchResultData = (await DataSearchService.searchRaceRecords(event.runnerIds, event.raceIds, event.recentYear))
        .data
      this.keySearchResult++
      console.log('this.searchResultData:', this.searchResultData)
    }
  },
  async mounted () {
    this.searchResultData = (await DataSearchService.searchRaceRecords()).data
  },
  components: {
    SearchCriteria,
    SearchResult
  }
}
</script>

<style scoped>
</style>

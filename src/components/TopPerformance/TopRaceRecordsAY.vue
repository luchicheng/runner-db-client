<template>
    <div id="app">
    <v-app id="inspire">
      <v-layout>
        <v-data-table
          :headers="headers"
          :items="searchResultFemale"
          class="elevation-1" hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Top Performances Females</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <p class="font-weight-light">asof {{ asOf }}</p>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
        </v-data-table>
        <v-data-table
          :headers="headers"
          :items="searchResultMale"
          class="elevation-1 ml-4"  hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Males </v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-layout>
    </v-app>
  </div>
</template>

<script>

import DataSearchService from '@/services/DataSearchService'

export default {
  data () {
    return {
      headers: [
        { text: 'Name', value: 'runnerName', sortable: false },
        { text: 'NickName', value: 'nickName', sortable: false },
        { text: 'AgeGroup', value: 'ageGroup', sortable: false },
        { text: 'Race', value: 'raceName', sortable: false },
        { text: 'Date', value: 'raceTime', sortable: false },
        { text: 'Time', value: 'time', sortable: false }
      ],
      searchResultFemale: [],
      searchResultMale: [],
      asOf: new Date().toISOString().slice(0, 10),
      numberOfTops: 10
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
  async mounted () {
    // gender, number, year
    this.searchResultFemale = (await DataSearchService.searchTopRaceRecords('F', this.numberOfTops, null)).data
    this.searchResultMale = (await DataSearchService.searchTopRaceRecords('M', this.numberOfTops, null)).data
  }
}
</script>

<style scoped>
</style>

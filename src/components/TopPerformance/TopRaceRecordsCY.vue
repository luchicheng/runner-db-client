<template>
  <panel title="Top Performances from Current Year">
    <p class="font-weight-light text-left">
      {{ thisYear }} asof {{ asOf }}
    </p>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-data-table
            :headers="headers"
            :items="searchResultFemale"
            class="elevation-1" hide-default-footer
            style="overflow: auto"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Females</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="12" md="6">
          <v-data-table
            :headers="headers"
            :items="searchResultMale"
            class="elevation-1"  hide-default-footer
            style="overflow: auto"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Males</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </panel>
</template>
<script>
import DataSearchService from '@/services/DataSearchService'

export default {
  data () {
    return {
      headers: [
        // TODO, INDEX column
        { text: '#', value: 'index', sortable: false },
        { text: 'Name', value: 'runnerName', sortable: false },
        { text: 'NickName', value: 'nickName', sortable: false },
        { text: 'AgeGroup', value: 'ageGroup', sortable: false },
        { text: 'Race', value: 'raceName', sortable: false },
        { text: 'Date', value: 'raceTime', sortable: false },
        { text: 'Time', value: 'time', sortable: false }
      ],
      searchResultFemale: [],
      searchResultMale: [],
      thisYear: new Date().getFullYear(),
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
    console.log(this.thisYear)
    // gender, number, year
    this.searchResultFemale = (await DataSearchService.searchTopRaceRecords('F', this.numberOfTops, this.thisYear)).data
    this.searchResultMale = (await DataSearchService.searchTopRaceRecords('M', this.numberOfTops, this.thisYear)).data
  }
}
</script>

<style scoped>
</style>

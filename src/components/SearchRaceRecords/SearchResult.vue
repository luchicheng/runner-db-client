<template>
    <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="searchResult"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>RaceRecord Records</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
// import RaceRecordsService from '@/services/RaceRecordsService'

export default {
  props: [
    'searchResult'
  ],
  data () {
    return {
      runnerId: '',
      headers: [
        { text: 'Name', value: 'runnerName' },
        { text: 'NickName', value: 'nickName' },
        { text: 'AgeGroup', value: 'ageGroup' },
        { text: 'BQ Time', value: 'bqTime' },
        { text: 'Race Name', value: 'raceName' },
        { text: 'Race Time', value: 'time' },
        { text: 'BQ Flag', value: 'bqFlag' },
        { text: 'Debut', value: 'debut' },
        { text: 'Comment', value: 'comment' }
      ]
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
  async mounted () {
  }
}
</script>

<style scoped>
</style>

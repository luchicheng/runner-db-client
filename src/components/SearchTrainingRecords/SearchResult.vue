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
            <v-toolbar-title>TrainingRecord Records</v-toolbar-title>
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
// import TrainingRecordsService from '@/services/TrainingRecordsService'

export default {
  props: [
    'searchResult'
  ],
  data () {
    return {
      runnerId: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'NickName', value: 'nickName' },
        { text: 'AgeGroup', value: 'ageGroup' },
        { text: 'BQ Time', value: 'bqTime' },
        { text: 'GoalRace', value: 'raceName' },
        { text: '5KTime', value: '5KTIME' },
        { text: '5KPace(min/K)', value: '5KPACE' },
        { text: '8KTime', value: '8KTIME' },
        { text: '8KPace(min/K)', value: '8KPACE' },
        { text: '10KTime', value: '10KTIME' },
        { text: '10KPace(min/K)', value: '10KPACE' },
        { text: 'HMTime', value: '21.1KTIME' },
        { text: 'HMPace(min/K)', value: '21.1KPACE' },
        { text: '30KTime', value: '30KTIME' },
        { text: '30KPace(min/K)', value: '30KPACE' },
        { text: '32KTime', value: '32KTIME' },
        { text: '32KPace(min/K)', value: '32KPACE' },
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

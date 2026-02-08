<template>
  <panel title="Search Emails">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Search by Recepient or comment"
          v-model="search"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          label="Request Status"
          v-model="statusFilter"
          :items="statusOptions"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Sent Date From"
          type="date"
          v-model="dateFrom"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Sent Date To"
          type="date"
          v-model="dateTo"
        ></v-text-field>
      </v-col>
    </v-row>
  </panel>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      search: '',
      statusFilter: '',
      dateFrom: '',
      dateTo: '',
      statusOptions: ['ALL', 'pending', 'canceled', 'sent', 'failed']
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'emails',
        query: {}
      }
      if (this.search !== '') {
        route.query.search = this.search
      }
      if (this.statusFilter !== '') {
        route.query.statusFilter = this.statusFilter
      }
      if (this.dateFrom !== '') {
        route.query.dateFrom = this.dateFrom
      }
      if (this.dateTo !== '') {
        route.query.dateTo = this.dateTo
      }
      // console.log('route when search is changing:', route)
      this.$router.push(route)
    }, 700),
    statusFilter: _.debounce(async function (value) {
      const route = {
        name: 'emails',
        query: {}
      }
      if (this.search !== '') {
        route.query.search = this.search
      }
      if (this.statusFilter !== '') {
        route.query.statusFilter = this.statusFilter
      }
      if (this.dateFrom !== '') {
        route.query.dateFrom = this.dateFrom
      }
      if (this.dateTo !== '') {
        route.query.dateTo = this.dateTo
      }
      // console.log('route when statusFilter is changing:', route)
      this.$router.push(route)
    }, 700),
    dateFrom: _.debounce(async function (value) {
      const route = {
        name: 'emails',
        query: {}
      }
      if (this.search !== '') {
        route.query.search = this.search
      }
      if (this.statusFilter !== '') {
        route.query.statusFilter = this.statusFilter
      }
      if (this.dateFrom !== '') {
        route.query.dateFrom = this.dateFrom
      }
      if (this.dateTo !== '') {
        route.query.dateTo = this.dateTo
      }
      console.log('route when dateFrom is changing:', route)
      this.$router.push(route)
    }, 700),
    dateTo: _.debounce(async function (value) {
      const route = {
        name: 'emails',
        query: {}
      }
      if (this.search !== '') {
        route.query.search = this.search
      }
      if (this.statusFilter !== '') {
        route.query.statusFilter = this.statusFilter
      }
      if (this.dateFrom !== '') {
        route.query.dateFrom = this.dateFrom
      }
      if (this.dateTo !== '') {
        route.query.dateTo = this.dateTo
      }
      console.log('route when dateTo is changing:', route)
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value || ''
      }
    },
    '$route.query.statusFilter': {
      immediate: true,
      handler (value) {
        this.statusFilter = value || ''
      }
    },
    '$route.query.dateFrom': {
      immediate: true,
      handler (value) {
        this.dateFrom = value || ''
      }
    },
    '$route.query.dateTo': {
      immediate: true,
      handler (value) {
        this.dateTo = value || ''
      }
    }
  }
}
</script>

<style>

</style>

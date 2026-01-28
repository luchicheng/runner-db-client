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
  </panel>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      search: '',
      statusFilter: '',
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
      // console.log('route when statusFilter is changing:', route)
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
    }
  }
}
</script>

<style>

</style>

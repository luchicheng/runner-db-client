<template>
  <panel title="Filter Training Recordss">
    <v-layout>
      <v-flex xs6>
        <v-text-field
          label="Search by distance,date or commnet"
          v-model="search"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'runner-training'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<style>

</style>

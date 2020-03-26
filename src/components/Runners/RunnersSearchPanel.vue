<template>
  <panel title="Search Runner">
    <v-layout>
      <v-flex xs6>
        <v-text-field
          label="Search by name, nickName,phone or comment"
          v-model="search"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 class="ml-8">
        <v-text-field
          label="Search by goal race"
          v-model="searchByRace"
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
      search: '',
      searchByRace: ''
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'runners'
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

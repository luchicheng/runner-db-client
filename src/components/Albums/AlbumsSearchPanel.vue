<template>
  <panel title="Search Album">
    <v-text-field label="Search by name, description or comment" v-model="search"></v-text-field>
  </panel>
</template>

<script>
import _ from 'lodash'
// import AlbumsService from '@/services/AlbumsService'

export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'albums'
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

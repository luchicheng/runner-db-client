<template>
  <v-layout>
    <v-flex xs12 class="ml-2">
      <template>
        <v-parallax
          height="900"
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        ></v-parallax>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      news: null
    }
  },
  async mounted () {
    // TODO get all news
  }
}
</script>

<style scoped>
</style>

<template>
  <v-layout>
    <v-flex xs12>
      <races-search-panel />
      <races-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
import RacesPanel from './RacesPanel'
import RacesSearchPanel from './RacesSearchPanel'
import RacesService from '@/services/RacesService'
import {mapState} from 'vuex'

export default {
  components: {
    RacesPanel,
    RacesSearchPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      races: null
    }
  },
  async mounted () {
    this.races = (await RacesService.index()).data
  }
}
</script>

<style scoped>
</style>

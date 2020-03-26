<template>
  <v-layout>
    <v-flex xs12>
      <runners-search-panel />
      <runners-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
import RunnersPanel from './RunnersPanel'
import RunnersSearchPanel from './RunnersSearchPanel'
// import RunnersService from '@/services/RunnersService'
import {mapState} from 'vuex'

export default {
  components: {
    RunnersPanel,
    RunnersSearchPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      // runners: null
    }
  },
  async mounted () {
    // this.runners = (await RunnersService.index()).data
  }
}
</script>

<style scoped>
</style>

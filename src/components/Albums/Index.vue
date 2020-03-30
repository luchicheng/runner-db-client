<template>
  <v-layout>
    <v-flex xs12>
      <albums-search-panel />
      <albums-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
import AlbumsPanel from './AlbumsPanel'
import AlbumsSearchPanel from './AlbumsSearchPanel'
import AlbumsService from '@/services/AlbumsService'
import {mapState} from 'vuex'

export default {
  components: {
    AlbumsPanel,
    AlbumsSearchPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      albums: null
    }
  },
  async mounted () {
    this.albums = (await AlbumsService.index()).data
  }
}
</script>

<style scoped>
</style>

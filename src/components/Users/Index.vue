<template>
  <v-layout>
    <v-flex xs12>
      <users-search-panel />
      <users-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
import UsersPanel from './UsersPanel'
import UsersSearchPanel from './UsersSearchPanel'
import UsersService from '@/services/UsersService'
import {mapState} from 'vuex'

export default {
  components: {
    UsersPanel,
    UsersSearchPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      users: null
    }
  },
  async mounted () {
    this.users = (await UsersService.index()).data
  }
}
</script>

<style scoped>
</style>

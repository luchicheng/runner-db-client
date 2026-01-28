<template>
  <v-layout>
    <v-flex xs12>
      <emails-search-panel />
      <emails-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
import EmailsPanel from './EmailsPanel'
import EmailsSearchPanel from './EmailsSearchPanel'
import EmailsService from '@/services/EmailsService'
import {mapState} from 'vuex'

export default {
  components: {
    EmailsPanel,
    EmailsSearchPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      emails: null
    }
  },
  async mounted () {
    this.emails = (await EmailsService.index()).data
  }
}
</script>

<style scoped>
</style>

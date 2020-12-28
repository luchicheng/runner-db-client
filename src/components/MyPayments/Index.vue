<template>
  <v-layout>
    <v-flex xs12>
      <payments-search-panel />
      <payments-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
import PaymentsPanel from './PaymentsPanel'
import PaymentsSearchPanel from './PaymentsSearchPanel'
import {mapState} from 'vuex'

export default {
  components: {
    PaymentsPanel,
    PaymentsSearchPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      // payments: null
    }
  },
  async mounted () {
    // this.payments = (await PaymentsService.index()).data
  }
}
</script>

<style scoped>
</style>

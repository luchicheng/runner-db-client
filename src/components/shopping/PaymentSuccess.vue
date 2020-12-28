<template>
  <v-container>
    <h1>Thanks for your order!</h1>
    <p>
      We appreciate your business!
      If you have any questions, please
      <router-link :to="{ name: 'home', hash: '#contact-us' }" > CONTRACT US</router-link> or email
      <a href="mailto:toronto91camp@gmail.com">toronto91camp@gmail.com</a>.
    </p>
  </v-container>
</template>

<script>
import PaymentService from '@/services/PaymentService'
// var util = require('util')
export default {
  data: () => ({
  }),
  async mounted () {
    this.$store.dispatch('clearCart')
    if (this.$route.query.session_id) {
      console.log('update success payment with id', this.$route.query.session_id)
      await PaymentService.markPaymentSuccess(this.$route.query.session_id)
    }
  }
}
</script>

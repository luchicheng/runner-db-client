<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="590"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-toolbar-items>
        <v-btn text
          v-bind="attrs"
          v-on="on">
          <v-badge left color="green">
              <span slot="badge">{{numInCart}}</span>
              <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </v-toolbar-items>
    </template>
    <v-form
      ref="form"
      autocomplete="off">
      <v-card>
        <v-card-title class="headline">
          Shopping Cart
        </v-card-title>
        <v-card-text>
          <v-list two-line>
            <template v-for="(product, index) in inCart">
              <v-list-item :key="product.invId">
                <v-list-item-avatar>
                  <img :src="getImgUrl(product.image)">
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{product.name}}</v-list-item-title>
                  <v-list-item-subtitle v-html="product.description"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item>
                  {{product.name}} {{product.price}}$
                </v-list-item>
                <v-list-item>
                  <v-text-field label="Quantity" reverse :value="product.qty"
                    :rules="[numberRule]"
                    @change="updateToCartQty(product.invId, $event)"></v-text-field>
                </v-list-item>
                <v-list-item>
                  <v-text-field label="Comment" reverse :value="product.comment"
                    @change="updateToCartCmt(product.invId, $event)"></v-text-field>
                </v-list-item>
                <v-list-item>
                  {{product.price * product.qty}}$
                </v-list-item>
                <v-list-item-action>
                  <v-btn icon ripple @click="removeFromCart(index)">
                    <v-icon color="red lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider v-if="index + 1 < numInCart" :key="index"></v-divider>
            </template>
            <h3 class="display-1 text-right font-weight-light blue--text mb-2">TOTAL: {{total}}$</h3>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$refs.form.validate() ? dialog = false : dialog = true"
          >
            Keep shopping
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="checkout()"
          >
            Check out
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import PaymentService from '@/services/PaymentService'
let stripe = window.Stripe(process.env.NODE_ENV === 'production' ? 'pk_live_BAv4X0q2SplDJB89oSVG2pRc' : 'pk_test_6fMfJdRQBuh8xIbqmNIySq5r')

export default {
  name: 'shoppingCart',
  data () {
    return {
      baseURL: process.env.NODE_ENV === 'production' ? 'https://91camp.ca/#' : 'http://localhost:8080/#',
      dialog: false,
      numberRule: v => {
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true
        return '0>Quantity>999'
      }
    }
  },
  computed: {
    inCart () { return this.$store.getters.inCart },
    numInCart () { return this.inCart.length },
    total () { return this.$store.getters.inCartTotal }
  },
  methods: {
    getImgUrl (pic) {
      return require('../../assets/shopping/' + pic)
    },
    removeFromCart (index) { this.$store.dispatch('removeFromCart', index) },
    updateToCartQty (invId, qty) {
      // console.log('updateToCart:', invId, qty)
      if (!isNaN(parseFloat(qty)) && qty >= 0 && qty <= 999) {
        this.$store.dispatch('updateToCart', {invId: invId, qty: qty})
        // this.total = this.getTotal()
        alert('Quantity update successfully!')
      }
    },
    updateToCartCmt (invId, comment) {
      // console.log('updateToCart:', invId, qty)
      if (comment) {
        this.$store.dispatch('updateToCart', {invId: invId, comment: comment})
        // this.total = this.getTotal()
        alert('Comment update successfully!')
      }
    },
    async checkout () {
      if (!this.$refs.form.validate()) {
        return
      }
      const isUserLogin = this.$store.state.isUserLoggedIn
      if (!isUserLogin) {
        this.dialog = false
        alert('Please login first.')
        this.$router.push({
          name: 'login'
        })
        return
      } else {
        if (!this.$store.state.user.email2) {
          alert('Please update your profile with email adress.')
          this.dialog = false
          this.$router.push({
            name: 'myInfo'
          })
          return
        }
      }
      this.dialog = false
      // 'http://localhost:8080/#' + path
      let currentLocation = this.baseURL + this.$route.path
      let successLocation = this.baseURL + 'paymentSuccess' + '?session_id={CHECKOUT_SESSION_ID}'
      // alert('current router' + util.inspect(this.$route.path))
      /*
      * When the customer clicks on the button, redirect
      * them to Checkout.
      */
      // stripe.redirectToCheckout({
      //   lineItems: [{price: 'price_1I2e3Z2zJQsBba6fm5i0XHpo', quantity: 3}],
      //   mode: 'payment',
      //   /*
      //   * Do not rely on the redirect to the successUrl for fulfilling
      //   * purchases, customers may not always reach the success_url after
      //   * a successful payment.
      //   * Instead use one of the strategies described in
      //   * https://stripe.com/docs/payments/checkout/fulfill-orders
      //   */
      //   successUrl: window.location.protocol + '//test',
      //   cancelUrl: window.location.protocol + '//tttttttttttttttttttt'
      // })
      //   .then(function (result) {
      //     if (result.error) {
      //     /*
      //     * If `redirectToCheckout` fails due to a browser or network
      //     * error, display the localized error message to your customer.
      //     */
      //       alert(result.error.message)
      //     }
      //   })
      try {
        const newSession = await PaymentService.createCheckoutSession({
          inCart: this.inCart,
          currentLocation: currentLocation,
          successLocation: successLocation
        })
        // console.log('session:', newSession)
        // stripe.redirectToCheckout({ sessionId: 'cs_test_a1mt2C08xglNFpDkECXYMpDFrfu7qXNBBCuC3N7J3z27xB5mPK1ZOt19LA' })
        stripe.redirectToCheckout({ sessionId: newSession.data.id })
          .then(function (result) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using `error.message`.
            if (result.error) {
              alert(result.error.message)
            }
          })
          .catch(function (error) {
            console.error('Error:', error)
          })
      } catch (err) {
        // console.log(err)
        alert(err.response.data.error)
      }
    }
  },
  mounted () {
    // this.inCart = this.$store.getters.inCart
    // this.total = this.getTotal()
  }
}
</script>

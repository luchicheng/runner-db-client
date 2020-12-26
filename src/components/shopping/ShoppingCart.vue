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
          Shopping cart
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
                    @change="updateToCart(product.invId, $event)"></v-text-field>
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
export default {
  name: 'shoppingCart',
  data () {
    return {
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
    updateToCart (invId, qty) {
      // console.log('updateToCart:', invId, qty)
      if (!isNaN(parseFloat(qty)) && qty >= 0 && qty <= 999) {
        this.$store.dispatch('updateToCart', {invId: invId, qty: qty})
        // this.total = this.getTotal()
        alert('Quantity update successfully!')
      }
    },
    checkout () {
      this.dialog = false
    }
  },
  mounted () {
    // this.inCart = this.$store.getters.inCart
    // this.total = this.getTotal()
  }
}
</script>

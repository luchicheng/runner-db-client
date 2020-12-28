<template>
  <v-container>
    <h2 class="display-2 mb-4">Payment Service</h2>
    <div class="font-weight-light text-left mb-2">All payment currency is CAD.</div>
    <div class="font-weight-light text-left mb-2">After selection, please goto shopping cart at top right corner to review and checkout.</div>
    <div class="font-weight-light text-left mb-2">Each click will add quantity in shopping cart.</div>
    <v-divider></v-divider>
    <v-layout row wrap>
      <template v-for="(service, index) in forSaleService">
        <v-flex col12 md4 pa-1 :key="index">
          <v-hover>
            <v-card slot-scope="{hover}" class="mx-auto" color="gray lighten-4" width="350" height="350">
              <v-img :src="getImgUrl(service.image)" :aspect-ratio="16/9" contain>
                <v-expand-transition>
                  <div v-if="hover" class="d-flex transition-fast-in-fast-out blue draken-2 display-3 v-card--reveal display3 black--text" style="height: 100%;">
                    ${{service.price}}
                  </div>
                </v-expand-transition>
              </v-img>

              <v-card-text class="pt-4" style="position: relative;">
                <v-btn absolute color="blue" class="white--text" fab medium right top
                  @click="addToCart(service.invId)">
                  <v-icon>mdi-cart</v-icon>
                </v-btn>

                <div class="font-weight-light grey--text title mb-2">{{service.category}}</div>
                <h3 class="display-1 font-weight-light orange--text mb-2">{{service.name}}</h3>
                <div class="font-weight-light mb-2">${{service.price}}</div>
                <div class="font-weight-light mb-2">{{service.description}}</div>
              </v-card-text>

            </v-card>
          </v-hover>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {
    getImgUrl (pic) {
      return require('../../assets/shopping/' + pic)
    },
    addToCart (invId) {
      this.$store.dispatch('addToCart', invId)
    }
  },
  computed: {
    forSaleService () {
      // console.log(this.$store.getters.forSaleService)
      return this.$store.getters.forSaleService
    }
  }
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

.v-card h3.display-1 {
  font-size: 24px !important;
}
</style>

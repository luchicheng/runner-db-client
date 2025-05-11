<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="434"
    max-height="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="fa-star"
        icon
        x-large
        :disabled="isStarDisabled()"
        v-bind="attrs"
        v-on="on"
      >
        <v-img max-height="60" max-width="60" :src="getImgUrl('six_star.png')"></v-img>
      </v-btn>
    </template>
    <template v-slot:default="">
      <v-card
        class="mx-auto"
        max-width="434"
        tile
      >
        <v-img
          height="200"
          src="https://assets-global.website-files.com/5f58a4616a9e71d63ca059c8/5f58a4616a9e714585a05a36_sixstar-medal-berlin-p-1080.jpeg"
        ></v-img>

        <v-card-title>
          <v-row align="end" class="fill-height">
            <v-col align-self="start" class="pa-0" cols="12">
              <div class="d-flex flex-column align-center">
                <v-avatar
                  v-if="star.img"
                  class="profile ma-2"
                  color="grey"
                  size="100"
                >
                  <v-img :src="getImgUrl(star.img)"></v-img>
                </v-avatar>
                <div v-if="star.wmmImages && star.wmmImages.length" class="wmm-images-container">
                  <v-img
                    v-for="(wmmImg, idx) in star.wmmImages"
                    :key="idx"
                    class="wmm-image ma-1"
                    :src="getWwmImgUrl(wmmImg)"
                    width="400"
                    contain
                  ></v-img>
                </div>
              </div>
            </v-col>
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)">
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{ star.name }}{{ star.nickName }} <p class="font-weight-black">完成年份{{ star.year }}</p>
                  </v-list-item-title>
                  <v-list-item-subtitle>Boston Marathon 完成年份：{{ star.boston_year }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Chicago Marathon 完成年份：{{ star.chi_year }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Newyork City Marathon 完成年份：{{ star.nyc_year }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Tokyo Marathon 完成年份：{{ star.tokyo_year }}</v-list-item-subtitle>
                  <v-list-item-subtitle>London Marathon 完成年份：{{ star.london_year }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Berlin Marathon 完成年份：{{ star.berlin_year }}</v-list-item-subtitle>
                  <div class="text-caption font-weight-medium font-italic text-left">{{ star.desc }}</div>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: ['star'],
  methods: {
    isStarDisabled () {
      return this.star == null || this.star.name == null ||
        this.star.name.length === 0
    },
    getImgUrl (pic) {
      return require('../../assets/stars/' + pic)
    },
    getWwmImgUrl (pic) {
      return require('../../assets/wmm/' + pic)
    }
  }
}
</script>

<style scoped>
.fa-star {
  color: white;
  margin: 20px;
  font-size: 150px !important;
  cursor: pointer;
  text-shadow: 0 0 15px #1b2afb,
    0 0 30px #1b2afb,
    0 0 45px #1b2afb,
    0 0 60px #1b2afb;
}
.fa-star:hover {
  color: #1b2afb;
  transform: translateY(-5px);
}
</style>

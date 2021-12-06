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
            <v-icon color="yellow">mdi-star</v-icon>
          </v-btn>
        </template>
        <template v-slot:default="">
          <v-card
            class="mx-auto"
            max-width="434"
            tile
          >
            <v-img
              height="100%"
              src="https://www.baa.org/sites/default/files/inline-images/virtualbkgd_14.jpg"
            >
            </v-img>
            <v-card-title>
              <v-row
                  align="end"
                  class="fill-height"
                >
                  <v-col
                    align-self="start"
                    class="pa-0"
                    cols="12"
                  >
                    <v-avatar
                      class="profile"
                      color="grey"
                      size="100"
                    >
                      <v-img :src="getImgUrl(star.img)"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col class="py-0">
                    <v-list-item
                      color="rgba(0, 0, 0, .4)"
                    >
                      <v-list-item-content>
                        <v-list-item-title class="text-h6">
                          {{ star.name }}{{ star.nickName }} <p class="font-weight-black">{{ star.serielNumber }}</p>
                        </v-list-item-title>
                        <v-list-item-subtitle>首次参赛年份：{{ star.year }}</v-list-item-subtitle>
                        <v-list-item-subtitle>参赛Bib#：{{ star.bib }}</v-list-item-subtitle>
                        <v-list-item-subtitle>完赛时间：{{ star.time }}</v-list-item-subtitle>
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
  props: [
    'star'
  ],
  methods: {
    isStarDisabled () {
      // console.log(this.star)
      return this.star == null || this.star.name == null ||
        this.star.name.length === 0
    },
    getImgUrl (pic) {
      return require('../../assets/stars/' + pic)
    }
  }
}
</script>
<style scoped>
.fa-star{
  color: white;
  margin: 20px;
  font-size: 150px !important;
  cursor: pointer;
  text-shadow: 0 0 15px #1b2afb,
    0 0 30px #1b2afb,
    0 0 45px #1b2afb,
    0 0 60px #1b2afb;
}
.fa-star:hover{
  color: #1b2afb;
  transform: translateY(-5px);
}
</style>

<template>
  <v-container
    class="fill-height"
    fluid
    style="min-height: 434px"
  >
    <v-fade-transition mode="out-in">
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-img
              :src="getImgUrl('jersey2018.jpg')"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="title">
              2018 Jersey - (SOLD OUT)
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card>
            <v-img
              :src="getImgUrl('jersey2019.jpg')"
              contain
              class="grey darken-4"
            ></v-img>
            <v-card-title class="title">
              2019 Jersey - (SOLD OUT)
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-img
              :src="getImgUrl('jersey2019-2.jpg')"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="title">
              2019 Coach Jersey - (SOLD OUT)
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-img
              :src="getImgUrl('jersey2020.jpg')"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="title">
              2020 Jersey - $50
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-img
              :src="getImgUrl('race2018.jpg')"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="title">
              Race Jersey 2018 - (SOLD OUT)
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-img
              :src="getImgUrl('race2019.jpg')"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="title">
              Race Jersey 2019 - $40
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-img
              :src="getImgUrl('race2020.jpg')"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="title">
              Race Jersey 2020 - $40
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-img
              :src="getImgUrl('race2020-1.jpg')"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="title">
              Race Jersey 2020 - $40
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-img
              :src="getImgUrl('race2020-2.jpg')"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="title">
              Race Jersey Boston - 1st time BQer only
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-img
              :src="getImgUrl('hat2019.jpg')"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="title">
              2019 91CAMP Visor Hat - $10
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    getImgUrl (pic) {
      return require('../assets/' + pic)
    }
  },
  async mounted () {
  },
  computed: {
  }
}
</script>

<style scoped>
</style>

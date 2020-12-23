<template>
  <v-card class="mx-auto" tile elevation="2" outlined>
    <v-img height="200" :src="getImgUrl(coach.src)"></v-img>
    <v-card-subtitle class=pb-1>
      <v-list-item style="margin:2.5%;position:absolute; top: 100px">
        <v-list-item-avatar size="100">
          <img
            :src="getImgUrl('cert.jpg')"
            alt="John"
          >
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">{{coach.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-subtitle>
    <v-card-text class="text--primary">
      <div v-for="value in coach.desc" class="text-lg-left" v-bind:key="value">{{value}}</div>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title text-lg-left">{{coach.nickName}}'s Bio</v-list-item-title>
          <v-list-item-subtitle v-for="(bullet, index) in coach.bio"
            :key="index">
            <li class="text-lg-left">{{bullet}}</li>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: [
    'coach'
  ],
  methods: {
    getImgUrl (pic) {
      // if (pic !== 'ddd') {
      //   return require('../../assets/rico.png')
      // }
      return require('../../assets/coaches/' + pic)
    }
  }
}
</script>
<style scoped>
</style>

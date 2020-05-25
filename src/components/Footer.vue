<template>
  <v-footer height="auto" color="primary" dark>
    <v-layout justify-center row wrap>
      <v-flex color="primary" dark py-3 text-xs-center white--text xs12>
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            v-bind:href="icon.url" target="_blank"
            icon
          >
            <v-icon size="24px">{{ icon.name }}</v-icon>
          </v-btn>
          <v-btn color='blue darken-4' :to="{ name: 'sponsor' }"> Sponsorship </v-btn>
        </v-card-text>
      </v-flex>
      <v-flex color="primary" dark py-3 text-xs-center white--text xs12>
        &copy;2020 — 91 Running Camp
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {name: 'fab fa-facebook', url: 'https://www.facebook.com/groups/413792679085011/'},
      {name: 'mdi-strava', url: 'https://www.strava.com/clubs/91RunningCAMP'},
      {name: 'mdi-wechat', url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5MjU3MjUwMw==&scene=124#wechat_redirect'}
    ]
  })
}
</script>

<style scoped>
</style>

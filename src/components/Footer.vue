<template>
  <v-footer height="auto" color="primary" dark>
    <v-layout justify-center row wrap>
      <v-flex color="primary" dark py-3 text-xs-center white--text xs12>
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
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
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ]
  })
}
</script>

<style scoped>
</style>

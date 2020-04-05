<template>
  <v-layout row wrap align-center>
    <v-flex xs8 offset-md2>
      <youtube
        :video-id="youtubeId"
        :player-width="800"
        :player-height="330">
      </youtube>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    'youtubeId'
  ]
}
</script>

<style scoped>
</style>

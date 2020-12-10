<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <YouTube :youtubeId="youtubeId3"/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <YouTube :youtubeId="youtubeId1"/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <YouTube :youtubeId="youtubeId2"/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <YouTube :youtubeId="youtubeId4"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import YouTube from './YouTube'

export default {
  data () {
    return {
      youtubeId1: 'Ot_zFegCX5s',
      youtubeId2: '8HQAsXOA-nQ',
      youtubeId3: 'BOAO9GPiPMQ',
      youtubeId4: 'eM8a-xOS85M'
    }
  },
  async mounted () {
  },
  components: {
    YouTube
  }
}
</script>

<style scoped>
</style>

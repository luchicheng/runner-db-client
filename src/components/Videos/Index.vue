<template>
  <div>
    <br />
    <v-layout>
      <v-flex xs6>
        <YouTube :youtubeId="youtubeId6"/>
      </v-flex>
    </v-layout>
    <br />
    <v-layout>
      <v-flex xs6>
        <YouTube :youtubeId="youtubeId5"/>
      </v-flex>
    </v-layout>
    <br />
    <v-layout>
      <v-flex xs6>
        <YouTube :youtubeId="youtubeId3"/>
      </v-flex>
    </v-layout>
    <br />
    <v-layout>
      <v-flex xs6>
        <YouTube :youtubeId="youtubeId1"/>
      </v-flex>
    </v-layout>
    <br />
    <v-layout>
      <v-flex xs6>
        <YouTube :youtubeId="youtubeId2"/>
      </v-flex>
    </v-layout>
    <br />
    <v-layout>
      <v-flex xs6>
        <YouTube :youtubeId="youtubeId4"/>
      </v-flex>
    </v-layout>
    <br />
  </div>
</template>

<script>
import YouTube from './YouTube'

export default {
  data () {
    return {
      youtubeId6: 'f6SMvSD-F9I',
      youtubeId5: 'tkDoW2tlQnc',
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

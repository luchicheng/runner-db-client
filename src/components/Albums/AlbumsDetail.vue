<template>
  <div class="gallery">
    <div class="gallery-panel" v-for="photo in photos" :key="photo.id">
      <v-btn :href="photo.url" target="_blank">
        <img :src="thumbUrl(photo.url)"/>
      </v-btn>
    </div>
  </div>
</template>

<script>
import AlbumsService from '@/services/AlbumsService'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      displayZoom: false,
      currentPhotoIndex: 0,
      currentPhoto: {},
      albumId: null,
      photos: []
    }
  },
  methods: {
    thumbUrl (baseUrl) {
      // return `${baseUrl}=w256-h256`;
      return `${baseUrl}=w256-h256`
    }
  },
  computed: {
    ...mapState(['route'])
  },
  async mounted () {
    this.albumId = this.route.params.albumId
    console.log(this.albumId)
    this.photos = (await AlbumsService.indexPhotos(this.albumId)).data
    this.currentPhoto = this.photos[this.currentPhotoIndex]
  }
}
</script>

<style>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 5rem;
}

.gallery-panel img {
  width: 100%;
  height: 22vw;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>

<template>
  <div>
    <CoolLightBox
      :items="items"
      :index="index"
      loop
      @close="index = null">
    </CoolLightBox>
    <div class="images-wrapper">
      <div class="image"
        v-for="(image, imageIndex) in items"
        :key="imageIndex"
        @click="setIndex(imageIndex)"
        :style='{ backgroundImage: "url(" + image.src + ")", }'
      ></div>
    </div>
  </div>
</template>

<script>
import AlbumsService from '@/services/AlbumsService'
import { mapState } from 'vuex'
import CoolLightBox from 'vue-cool-lightbox'
/* New step! For version >= 1.1.0 add Vue CoolLightBox CSS. Can be added as a static asset or inside a component */
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  name: 'AlbumsDetail',
  components: {
    CoolLightBox
  },
  data () {
    return {
      displayZoom: false,
      currentPhotoIndex: 0,
      currentPhoto: {},
      albumGid: '',
      items: [],
      // items: [
      //   {
      //     title: 'In nature, nothing is perfect and everything is perfect',
      //     description: 'Photo by Lucas',
      //     src: 'https://cosmos-images2.imgix.net/file/spina/photo/20565/191010_nature.jpg?ixlib=rails-2.1.4&auto=format&ch=Width%2CDPR&fit=max&w=835'
      //   },
      //   {
      //     title: 'a beautiful mountain view',
      //     description: 'Photo by Facundo',
      //     src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nature-quotes-1557340276.jpg?crop=0.666xw:1.00xh;0.168xw,0&resize=640:*'
      //   }
      // ],
      index: null
    }
  },
  methods: {
    setIndex (index) {
      this.index = index
    }
    // thumbUrl (baseUrl) {
    //   // return `${baseUrl}=w256-h256`;
    //   return `${baseUrl}=w200`
    // }
  },
  computed: {
    ...mapState(['route'])
  },
  async mounted () {
    this.albumGid = this.route.params.albumGid
    console.log(this.albumGid)
    this.items = await AlbumsService.getPhotoUrls(this.albumGid)
  }
}
</script>

<style scoped>
.images-wrapper {
  /* display: flex; */
  height: 100000px;
}

.image {
  height: 300px;
  width: 300px;
  display: block;
  background-color: red;
  background-position: center;
  background-size: cover;
}

body,
html {
  height: 100%; /* REMOVING THIS FIXES THE ISSUE */
  scroll-behavior: smooth;
}
</style>

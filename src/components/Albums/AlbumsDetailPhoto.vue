<template>
  <div class="lightbox" @click.self="closeLightbox">
    <img :src="photo.url">
    <div class="lightbox-info">
      <div class="lightbox-info-inner">
        <p v-if="photo.name">{{ photo.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'photo'
  ],
  data () {
  },
  computed: {
  },
  methods: {
    closeLightbox () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }

  .lightbox img {
    margin: auto;
    width: 100%;
    grid-column-start: 2;
  }

  .lightbox-info {
    margin: auto 2rem auto 0;
  }

  .lightbox-info-inner {
    background-color: #FFFFFF;
    display: inline-block;
    padding: 2rem;
  }
</style>

<template>
  <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in items"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="getImgUrl(card.src)"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
              <v-card-title v-text="card.title"></v-card-title>

            </v-img>

            <v-card-actions>
              <div>{{card.desc}}</div>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>

export default {
  data () {
    return {
      items: [
        { title: '2018 Jersey - (SOLD OUT)', src: 'jersey2018.jpg', flex: 6 },
        { title: '2019 Jersey - (SOLD OUT)', src: 'jersey2019.jpg', flex: 6 },
        { title: '2019 Coach Jersey - (SOLD OUT)', src: 'jersey2019-2.jpg', flex: 12 },
        { title: '2020 Jersey - $50', src: 'jersey2020.jpg', flex: 6 },
        { title: 'Race Jersey 2018 - (SOLD OUT)', src: 'race2018.jpg', flex: 6 },
        { title: 'Race Jersey 2019 - $40', src: 'race2019.jpg', flex: 6 },
        { title: 'Race Jersey 2020 (M) - $40', src: 'race2020.jpg', flex: 6 },
        { title: 'Race Jersey 2020 (F) - $40', src: 'race2020-1.jpg', flex: 6 },
        { title: 'Race Jersey Boston - $40', src: 'race2020-2.jpg', flex: 6, desc: '1st time BQer only' },
        { title: '2019 91CAMP Visor Hat - $10', src: 'hat2019.jpg', flex: 6 }
      ]
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

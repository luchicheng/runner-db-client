<template>
  <v-layout row wrap align-center>
          <v-flex xs8 offset-md2>
            <div>
              <v-card class="my-3">
                <v-img
                  :src="getImgUrl('sponsors_low.png')"
                ></v-img>
                  <v-container fill-height fluid>
                    <v-layout>
                      <v-flex xs12 align-end d-flex>
                      </v-flex>
                    </v-layout>
                  </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  async mounted () {
  },
  methods: {
    getImgUrl (pic) {
      return require('../../assets/' + pic)
    }
  }
}
</script>

<style scoped>
</style>

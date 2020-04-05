<template>
  <v-app-bar
    app
    color="primary"
  >
    <v-toolbar fixed color="primary" dark padding=0 elevation="0">
      <v-div class="mt-1"
      >
        <v-img contain width="200px" class="mr-3 ml-3 mt-1 mb-1"
          :src="require('@/assets/logo1_white.png')"
        ></v-img>
      </v-div>
      <v-toolbar-title class="ml-2 mr-2"></v-toolbar-title>
        <v-btn text dark :to="{ name: 'home' }"> Home </v-btn>
        <v-menu open-on-hover close-on-click close-on-content-click offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text dark
              v-on="on"
            >Blogs</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(blogItems, index_blogs) in blogItems"
              :key="index_blogs"
              @click="goto(blogItems.name)"
            >
              <v-list-item-title>{{ blogItems.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu v-if="$store.state.isUserLoggedIn" open-on-hover close-on-click close-on-content-click offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text dark
              v-on="on"
            >Data</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(dataItem, index_data) in dataItems"
              :key="index_data"
              @click="goto(dataItem.name)"
            >
              <v-list-item-title>{{ dataItem.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu open-on-hover close-on-click close-on-content-click offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text dark
              v-on="on"
            >Records</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(topItem, index_tops) in topItems"
              :key="index_tops"
              @click="goto(topItem.name)"
            >
              <v-list-item-title>{{ topItem.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-toolbar>
    <v-spacer></v-spacer>
    <v-toolbar fixed color="primary" dark padding=0 elevation="0">
      <v-layout align-end justify-end>
        <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{ name: 'login' }"> Login </v-btn>
        <v-btn v-if="false" text dark :to="{ name: 'register' }"> Sign Up </v-btn>
        <v-btn v-if="$store.state.isUserLoggedIn" text dark @click="logout"> Log Out </v-btn>
      </v-layout>
    </v-toolbar>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    blogItems: [
      { title: 'Races', name: 'newsLetter' },
      // { title: 'Training', name: 'blog_training' },
      // { title: 'Club', name: 'blog_club' },
      { title: 'PhotoAlbums', name: 'albums' },
      { title: 'Videos', name: 'videos' }
    ],
    dataItems: [
      { title: 'Runners', name: 'runners' },
      { title: 'Races', name: 'races' },
      { title: 'TrainingData', name: 'searchTrainingRecords' },
      { title: 'RaceData', name: 'searchRaceRecords' }
    ],
    topItems: [
      { title: 'Current Year', name: 'topRaceRecordsCY' },
      { title: 'All Years', name: 'topRaceRecordsAY' }
    ]
  }),
  methods: {
    goto (routerName) {
      this.$router.push({
        name: routerName
      })
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>
</style>

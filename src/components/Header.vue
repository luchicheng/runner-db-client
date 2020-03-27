<template>
  <v-app-bar
    app
    color="primary"
  >
    <v-toolbar fixed color="primary" dark padding=0 elevation="0">
      <v-avatar
        class="mr-3"
        color="grey lighten-5"
        size="60"
      >
        <v-img
          contain
          max-height="70%"
          :src="require('@/assets/91logo_lightblue.png')"
        ></v-img>
      </v-avatar>
      <v-toolbar-title class="mr-4">91 Runner DB </v-toolbar-title>
        <v-btn text dark :to="{ name: 'home' }"> Home </v-btn>
        <v-btn text dark :to="{ name: 'news' }"> News </v-btn>
        <v-btn v-if="$store.state.isUserLoggedIn" text dark :to="{ name: 'runners' }">Runners</v-btn>
        <v-btn v-if="$store.state.isUserLoggedIn" text dark :to="{ name: 'races' }">Races</v-btn>
        <v-menu v-if="$store.state.isUserLoggedIn" open-on-hover close-on-click close-on-content-click offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text dark
              v-on="on"
            >Records</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(recordItem, index) in recordItems"
              :key="index"
              @click="goto(recordItem.name)"
            >
              <v-list-item-title>{{ recordItem.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu open-on-hover close-on-click close-on-content-click offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text dark
              v-on="on"
            >Tops</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(topItem, index2) in topItems"
              :key="index2"
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
        <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{ name: 'register' }"> Sign Up </v-btn>
        <v-btn v-if="$store.state.isUserLoggedIn" text dark @click="logout"> Log Out </v-btn>
      </v-layout>
    </v-toolbar>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    recordItems: [
      { title: 'Trainings', name: 'searchTrainingRecords' },
      { title: 'Races', name: 'searchRaceRecords' }
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

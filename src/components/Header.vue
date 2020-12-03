<template>
  <v-app-bar
    app
    color="primary" height="64px"
  >
    <v-toolbar fixed color="primary" dark padding=0 elevation="0">
      <div class="mt-1">
        <v-img contain width="200px" class="mr-3 ml-3 mt-1 mb-1 hidden-sm-and-down"
          :src="require('@/assets/logo1_white.png')"
        ></v-img>
        <v-img contain width="65px" class="mr-3 ml-3 mt-1 mb-1 hidden-md-and-up"
          :src="require('@/assets/small_logo_white.png')"
        ></v-img>
      </div>
      <v-toolbar-items class="hidden-sm-and-down">
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
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{ name: 'login' }"> Login </v-btn>
        <v-btn v-if="false" text dark :to="{ name: 'register' }"> Sign Up </v-btn>
        <v-btn v-if="$store.state.isUserLoggedIn" text dark @click="logout"> Log Out </v-btn>
      </v-toolbar-items>
      <v-menu :close-on-content-click="false" open-on-hover bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-group
            v-for="item in displayedMenus"
            :key="item.title"
            v-model="item.active"
            @click="goto(item.name)"
            no-action
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="subItem in item.items"
              :key="subItem.title"
              @click="goto(subItem.name)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ subItem.title }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-menu>
    </v-toolbar>
  </v-app-bar>
</template>

<script>
import _ from 'lodash'
export default {
  data: () => ({
    // isUserLogin: this.$store.state.isUserLoggedIn,
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
    ],
    items: [
      {
        action: 'home',
        title: 'HOME',
        active: true,
        enabled: true,
        login_required: false,
        name: 'home'
      },
      {
        action: 'blogs',
        title: 'BLOGS',
        active: false,
        enabled: true,
        login_required: false,
        items: [
          { title: 'Races', name: 'newsLetter', enabled: true },
          { title: 'PhotoAlbums', name: 'albums', enabled: true },
          { title: 'Videos', name: 'videos', enabled: true },
          { title: 'DISABLED', name: 'DISABLED', enabled: false }
        ]
      },
      {
        action: 'disabled',
        title: 'DISABLED',
        active: false,
        enabled: false,
        login_required: false,
        name: ''
      },
      {
        action: 'data',
        title: 'DATA',
        active: false,
        enabled: true,
        login_required: true,
        items: [
          { title: 'Runners', name: 'runners', enabled: true },
          { title: 'Races', name: 'races', enabled: true },
          { title: 'TrainingData', name: 'searchTrainingRecords', enabled: true },
          { title: 'RaceData', name: 'searchRaceRecords', enabled: true }
        ]
      },
      {
        action: 'top',
        title: 'TOP',
        active: false,
        enabled: true,
        login_required: false,
        items: [
          { title: 'Current Year', name: 'topRaceRecordsCY', enabled: true },
          { title: 'All Years', name: 'topRaceRecordsAY', enabled: true }
        ]
      }
    ]
  }),
  computed: {
    displayedMenus: function () {
      const isUserLogin = this.$store.state.isUserLoggedIn
      // console.log('***************begin' + isUserLogin)
      // console.log(this.items)
      // console.log('*********************end')
      // var r = _.pickBy(this.items, function (i) {
      var r = this.items.filter(function (i) {
        return (i.enabled && (!i.login_required || isUserLogin))
      })
      // console.log('***************begin r1')
      // console.log(r)
      // console.log('*********************end r1')
      r.forEach((obj, objIdx) => {
        obj.items = _.pickBy(obj.items, function (i) {
          return (i.enabled && (!i.login_required || isUserLogin))
        })
      })
      // console.log('***************begin r2')
      // console.log(r)
      // console.log('*********************end r2')
      return r
    }
  },
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

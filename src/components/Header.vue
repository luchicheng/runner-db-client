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
            >GROUP</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(eventsItems, index_blogs) in eventsItems"
              :key="index_blogs"
              @click="goto(eventsItems.name)"
            >
              <v-list-item-title>{{ eventsItems.title }}</v-list-item-title>
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
        <v-menu open-on-hover close-on-click close-on-content-click offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text dark
              v-on="on"
            >Shopping</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(shopItem, index_shop) in shopItems"
              :key="index_shop"
              @click="goto(shopItem.name)"
            >
              <v-list-item-title>{{ shopItem.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-toolbar-items>
         <v-btn v-if="$store.state.user && $store.state.user.userType == 'A'" text dark :to="{ name: 'members' }"> Membership </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{ name: 'login' }"> Login </v-btn>
        <v-btn v-if="!$store.state.isUserLoggedIn" text dark :to="{ name: 'register' }"> Sign Up </v-btn>
        <shopping-cart/>
        <v-menu open-on-hover v-if="$store.state.isUserLoggedIn" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="ma-4"
              color="#0D47A1"
              text-color="white"
              v-bind="attrs"
              v-on="on"
            >
              <v-avatar left>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              {{loginUserType}} {{$store.state.user ? $store.state.user.name : ""}}
            </v-chip>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title @click="goto( 'passwordReset' )">Password Reset</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title @click="goto( 'myInfo' )">My Information</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title @click="goto( 'myPayments' )">My Payments</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title @click="logout">Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
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
import ShoppingCart from '@/components/shopping/ShoppingCart'
export default {
  components: {
    ShoppingCart
  },
  data: () => ({
    // isUserLogin: this.$store.state.isUserLoggedIn,
    eventsItems: [
      { title: 'Blogs', name: 'newsLetter' },
      { title: 'Photos', name: 'albums' },
      { title: 'Videos', name: 'videos' },
      { title: 'Coaches', name: 'coaches' },
      { title: 'World Major Marathon', name: 'wmm' },
      { title: 'Hall of Fame', name: 'halloffame' }
    ],
    dataItems: [
      { title: 'Runners', name: 'runners' },
      { title: 'Races', name: 'races' },
      { title: 'TrainingData', name: 'searchTrainingRecords' },
      { title: 'RaceData', name: 'searchRaceRecords' }
    ],
    shopItems: [
      { title: 'Mechandise', name: 'shoppingMechandise' },
      { title: 'Payment', name: 'shoppingService' }
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
        title: 'GROUP',
        active: false,
        enabled: true,
        login_required: false,
        items: [
          { title: 'Blogs', name: 'newsLetter', enabled: true },
          { title: 'Photos', name: 'albums', enabled: true },
          { title: 'Video', name: 'videos', enabled: true },
          { title: 'Coaches', name: 'coaches', enabled: true },
          { title: 'World Major Marathon', name: 'wnn', enabled: true },
          { title: 'Hall of Fame', name: 'halloffame', enabled: true }
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
      },
      {
        action: 'shopping',
        title: 'SHOPPING',
        active: false,
        enabled: true,
        login_required: false,
        items: [
          { title: 'Mechandise', name: 'shoppingMechandise', enabled: true },
          { title: 'Payment', name: 'shoppingService', enabled: true }
        ]
      }
    ]
  }),
  computed: {
    inCart: function () { return this.$store.getters.inCart },
    numInCart: function () { return this.inCart.length },
    displayedMenus: function () {
      const isUserLogin = this.$store.state.isUserLoggedIn
      var r = this.items.filter(function (i) {
        return (i.enabled && (!i.login_required || isUserLogin))
      })
      r.forEach((obj, objIdx) => {
        obj.items = _.pickBy(obj.items, function (i) {
          return (i.enabled && (!i.login_required || isUserLogin))
        })
      })
      return r
    },
    loginUserType: function () {
      if (this.$store.state.isUserLoggedIn && this.$store.state.user) {
        if (this.$store.state.user.userType === 'A') {
          return 'Admin'
        }
        if (this.$store.state.user.userType === 'C') {
          return 'Coach'
        }
        if (this.$store.state.user.userType === 'R') {
          return 'Runner'
        }
      }
      return null
    }
  },
  methods: {
    goto (routerName) {
      if (this.$route.name !== routerName) {
        this.$router.push({
          name: routerName
        })
      }
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      if (this.$route.name !== 'home') {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>

<style scoped>
</style>

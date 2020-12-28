<template>
  <panel title="Search Payment">
    <v-layout>
      <v-flex xs6>
        <v-text-field
          label="Search by item name, payment ID or comment"
          v-model="search"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 class="ml-8">
        <v-autocomplete ref="UserId"
          v-if="$store.state.user && $store.state.user.userType == 'A'"
          v-model="userId"
          :items="validUsers"
          placeholder="Select..."
          item-value="id"
          item-text="email"
          label="Query Payment for for User"
          clearable
        ></v-autocomplete>
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import _ from 'lodash'
import UsersService from '@/services/UsersService'

export default {
  data () {
    return {
      validUsers: [],
      userId: this.$store.state.user.id,
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'myPayments',
        query: {
          search: this.search,
          userId: this.userId
        }
      }
      this.$router.push(route)
    }, 700),
    userId: _.debounce(async function (value) {
      const route = {
        name: 'myPayments',
        query: {
          search: this.search,
          userId: this.userId
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query': {
      immediate: true,
      handler (value) {
        this.search = value.search
        this.userId = value.userId
      }
    }
  },
  async mounted () {
    try {
      if (this.$store.state.user && this.$store.state.user.userType === 'A') {
        this.validUsers = (await UsersService.index()).data
      }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>

</style>

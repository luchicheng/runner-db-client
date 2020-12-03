<template>
<v-row no-gutters>
  <v-spacer/>
  <v-col sm="6" cols="12">
    <panel title="Login">
      <v-text-field
        label="Email"
        v-model="email"
      ></v-text-field>
      <br>
      <v-text-field
        label="Password"
        type="password"
        v-model="password"
        @keyup.enter.native="login"
      ></v-text-field>
      <br>
      <div class="danger-alert" v-html="error" />
      <br>
      <v-btn
        dark
        class="primary"
        @click="login">
        Login
      </v-btn>
    </panel>
  </v-col>
  <v-spacer/>
  </v-row>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'home'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>

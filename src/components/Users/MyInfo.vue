<template>
<v-row no-gutters>
  <v-spacer/>
  <v-col sm="6" cols="12">
    <panel title="My Basic Information">
      <v-form
        ref="form"
        autocomplete="off">
        <p class="font-weight-light text-left">
          Other information please goto Data -> Runners page.
        </p>
          <v-text-field
            label="Email"
            :value="email"
            :rules="emailRules"
            @input="updateEmail"
          ></v-text-field>
        <br>
          <v-text-field
            label="Address"
            :value="address"
            @input="updateAddress"
          ></v-text-field>
        <br>
          <v-text-field
            label="Register Date"
            disabled
            :value="registerDate"
          ></v-text-field>
      </v-form>
      <br>
      <div class="danger-alert" v-html="error"/>
      <br>
      <v-btn
        dark
        class="primary"
        @click="submit">
        Submit
      </v-btn>
    </panel>
  </v-col>
  <v-spacer/>
  </v-row>
</template>

<script>
import UsersService from '@/services/UsersService'
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      email: state => state.user.email2,
      address: state => state.user.address,
      registerDate: state => state.user.registerDate
    })
  },
  data () {
    return {
      error: null,
      userInfo: {},
      // userInfo: {
      //   email2: '',
      //   address: ''
      // },
      userId: this.$store.state.user.id,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    updateEmail (e) {
      this.userInfo.email2 = e
    },
    updateAddress (e) {
      this.userInfo.address = e
    },
    async submit () {
      this.error = null
      if (!this.$refs.form.validate()) {
        return
      }
      if (!this.$store.state.user || !this.$store.state.user.id) {
        alert('User session lost, please login again.')
        return
      }

      try {
        this.userInfo.id = this.$store.state.user.id
        console.log('submitting:' + JSON.stringify(this.userInfo))
        await UsersService.post(this.userInfo).then(response => {
          this.error = 'User information updated successfully.'
          let currentUser = {}
          Object.assign(currentUser, this.$store.state.user)
          Object.assign(currentUser, response.data)
          this.$store.dispatch('setUser', currentUser)
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  async mounted () {
    // try {
    //   if (this.$store.state.user) {
    //     this.userInfo.email2 = this.$store.state.user.email2
    //     this.userInfo.address = this.$store.state.user.address
    //     this.userInfo.registerDate = this.$store.state.user.registerDate
    //   }
    // } catch (err) {
    //   console.log(err)
    // }
  }
}
</script>

<style scoped>
</style>

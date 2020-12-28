<template>
<v-row no-gutters>
  <v-spacer/>
  <v-col sm="6" cols="12">
    <panel title="Password Reset">
      <v-form
        ref="form"
        autocomplete="off">
          <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="password"
          label="Enter Password"
          hint="At least 8 characters"
          counter
          @click:append="show = !show"
        ></v-text-field>
        <br>
          <v-text-field
            v-model="rePassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, passwordConfirmationRule]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Re-enter Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        <br>
        <v-autocomplete ref="RunnerId"
          v-if="$store.state.user && $store.state.user.userType == 'A'"
          v-model="userId"
          :items="validUsers"
          placeholder="Select..."
          item-value="id"
          item-text="email"
          label="Reset passwor for User"
          clearable
        ></v-autocomplete>
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
import AuthenticationService from '@/services/AuthenticationService'
import UsersService from '@/services/UsersService'

export default {
  data () {
    return {
      show: false,
      show1: false,
      rePassword: '',
      password: '',
      error: null,
      validUsers: [],
      userId: this.$store.state.user.id,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    async submit () {
      this.error = null
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        await AuthenticationService.passwordReset({
          userId: this.userId,
          password: this.password
        }).then(
          this.error = 'User password reset successfully.'
        )
      } catch (error) {
        this.error = error.response.data.error
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
  },
  computed: {
    passwordConfirmationRule () {
      return () => (this.password === this.rePassword) || 'Password must match'
    }
  }
}
</script>

<style scoped>
</style>

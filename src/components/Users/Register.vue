<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Membership Agreement and Benefits
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Membership Waiver
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Member Information
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <MembershipAgreement/>
        <MembershipBenefit/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="e1 = 1">Back</v-btn>
          <v-btn color="blue darken-1" text @click="e1 = 2">I Agree and Continue</v-btn>
        </v-card-actions>
      </v-stepper-content>

      <v-stepper-content step="2">
        <MemberWaiver/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="e1 = 1">Back</v-btn>
          <v-btn color="blue darken-1" text @click="e1 = 3">I Agree and Continue</v-btn>
        </v-card-actions>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-form
          ref="form"
          autocomplete="off">
          <v-card>
            <v-card-title>
              <span class="headline">Member basic information</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="ID"
                      :rules="[rules.required]"
                      v-model="userInfo.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="userInfo.password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show ? 'text' : 'password'"
                      name="password"
                      label="Enter Password"
                      hint="At least 8 characters"
                      counter
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="userInfo.rePassword"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min, passwordConfirmationRule]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Re-enter Password"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Email"
                      v-model="userInfo.email2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Address"
                      v-model="userInfo.address"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Referer"
                      v-model="runnerInfo.referer"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Personal Best"
                      v-model="runnerInfo.personalBest"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      v-model="runnerInfo.runningAge"
                      :items="runningAges"
                      placeholder="Select..."
                      label="Running Age"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Other Sports Hobbies"
                      v-model="runnerInfo.otherSportsHobbies"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Personal Target"
                      v-model="runnerInfo.personalTarget"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="runnerInfo.name"
                      :rules="[rules.required]"
                      label="First & Last name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      ref="date_menu"
                      v-model="date_menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="runnerInfo.dob"
                          label="Birthday date"
                          :rules="[ v => !!v || 'This field is required']"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="date_picker"
                        v-model="runnerInfo.dob"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1920-01-01"
                        @change="save_date"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete ref="gender" v-model="runnerInfo.gender"
                      :items="genders"
                      placeholder="Select..."
                      :rules="[ v => !!v || 'This field is required']"
                      label="Gender"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field ref="nickName" v-model="runnerInfo.nickName" label="Wechat Nick Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete ref="size"
                      v-model="runnerInfo.size"
                      :items="sizes"
                      placeholder="Select..."
                      label="Size"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field ref="phone"
                      :rules="[ v => !!v || 'This field is required']"
                      v-model="runnerInfo.phone" label="Phone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field ref="eName"
                      v-model="runnerInfo.eName"
                      :rules="[ v => !!v || 'This field is required']"
                      label="Emergency Contact Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      ref="ePhone"
                      :rules="[ v => !!v || 'This field is required']"
                      v-model="runnerInfo.ePhone" label="Emergency Phone"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <div class="danger-alert" v-html="error" />
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="register">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import MembershipAgreement from './MembershipAgreement'
import MembershipBenefit from './MembershipBenefit'
import MemberWaiver from './MemberWaiver'

export default {
  components: {
    MembershipAgreement,
    MembershipBenefit,
    MemberWaiver
  },
  data () {
    return {
      runningAges: [ '1', '2', '3', '4', '5', '5+', '10+', '20+', '30+' ],
      e1: 1,
      show: false,
      show1: false,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      genders: ['M', 'F'],
      date_menu: false,
      userInfo: {
        email: '',
        rePassword: '',
        password: '',
        email2: '',
        address: ''
      },
      runnerInfo: {
        name: '',
        nickName: '',
        phone: '',
        gender: '',
        dob: '',
        size: '',
        ePhone: '',
        eName: '',
        referer: '',
        personalBest: '',
        runningAge: '',
        otherSportsHobbies: '',
        personalTarget: ''
      },
      error: null,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    async register () {
      this.error = null
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        const response = await AuthenticationService.register({
          userInfo: this.userInfo,
          runnerInfo: this.runnerInfo
        })
        // this.$store.dispatch('setToken', response.data.token)
        // this.$store.dispatch('setUser', response.data.user)
        if (response.data.user) {
          alert('User [' + response.data.user.email + '] has been registered succussfully, please contact 91CAMP admin, to activate it. Thank you.')
        }
        this.$router.push({
          name: 'home'
        })
      } catch (error) {
        alert(error.response.data.error)
        this.error = error.response.data.error
      }
    },
    close () {
      this.$router.push({
        name: 'home'
      })
    },
    save_date (date) {
      this.$refs.date_menu.save(date)
    }
  },
  watch: {
    date_menu (val) {
      val && setTimeout(() => (this.$refs.date_picker.activePicker = 'YEAR'))
    }
  },
  computed: {
    passwordConfirmationRule () {
      return () => (this.userInfo.password === this.userInfo.rePassword) || 'Password must match'
    }
  }
}
</script>

<style scoped>
</style>

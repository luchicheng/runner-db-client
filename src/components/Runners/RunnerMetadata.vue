<template>
  <panel title="Runner Information">
    <v-text-field label="Name" readonly v-model="runnerMetadata.name" ></v-text-field>
    <v-text-field label="Wechat Nick Name" readonly v-model="runnerMetadata.nickName" ></v-text-field>
    <v-text-field label="Gender" readonly v-model="runnerMetadata.gender" ></v-text-field>
    <v-text-field label="Goal Race" readonly v-model="runnerMetadata.raceName" ></v-text-field>
    <v-text-field label="Goal Time" readonly v-model="runnerMetadata.goalRaceTime" ></v-text-field>
    <v-text-field label="Age Group" readonly v-model="runnerMetadata.ageGroup" ></v-text-field>
    <v-text-field label="BQ Time" readonly v-model="runnerMetadata.bqTime" ></v-text-field>
    <v-text-field label="Comment" readonly v-model="runnerMetadata.comment" ></v-text-field>
    <!-- <v-btn dark class="primary" :to="{
      name: 'runner-edit',
      params () {
        return {
          runnerId: runner.id
        }
      }
    }"> Edit Runner </v-btn> -->
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import RunnersService from '@/services/RunnersService'

export default {
  data () {
    return {
      runnerId: '',
      runnerMetadata: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'route'
    ])
  },
  watch: {
  },
  methods: {
  },
  async mounted () {
    this.runnerId = this.route.params.runnerId
    console.log('RunnerMetadata mounted:', this.runnerId)
    if (!this.isUserLoggedIn || !this.runnerId) {
      alert('system error.')
      return
    }
    this.runnerMetadata = (await RunnersService.showExtra(this.runnerId)).data
  }
}
</script>

<style scoped>
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>

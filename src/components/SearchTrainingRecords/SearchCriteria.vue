<template>
  <panel title="Searching Records">
    <v-layout>
      <v-flex xs6>
        <v-autocomplete ref="runnerId"
          v-model="search.runnerIds"
          :items="validRunners"
          placeholder="Select..."
          item-value="id"
          item-text="name"
          label="Runners"
          multiple
          clearable
        ></v-autocomplete>
      </v-flex>
      <v-flex xs6 class="ml-4" >
        <v-autocomplete ref="raceId"
          v-model="search.raceIds"
          :items="validRaces"
          placeholder="Select..."
          item-value="id"
          item-text="name"
          label="Goal Races"
          multiple
          clearable
        ></v-autocomplete>
      </v-flex>
      <v-flex>
        <v-checkbox
          v-model="search.recentYear"
          label="Past Year Only"
        ></v-checkbox>
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import _ from 'lodash'
import RacesService from '@/services/RacesService'
import RunnersService from '@/services/RunnersService'

export default {
  data () {
    return {
      validRaces: [],
      validRunners: [],
      search: {
        raceIds: null,
        runnerIds: null,
        recentYear: null
      }
    }
  },
  methods: {
  },
  watch: {
    'search.raceIds': _.debounce(async function (value) {
      if (typeof this.search.raceIds !== 'undefined' ||
        typeof this.search.runnerIds !== 'undefined' ||
        typeof this.search.recentYear !== 'undefined') {
        this.$emit('submitSearch', this.search)
      }
    }, 700),
    'search.runnerIds': _.debounce(async function (value) {
      // console.log('runnerIds changed:', this.search)
      if (typeof this.search.raceIds !== 'undefined' ||
        typeof this.search.runnerIds !== 'undefined' ||
        typeof this.search.recentYear !== 'undefined') {
        this.$emit('submitSearch', this.search)
      }
    }, 700),
    'search.recentYear': _.debounce(async function (value) {
      if (typeof this.search.raceIds !== 'undefined' ||
        typeof this.search.runnerIds !== 'undefined' ||
        typeof this.search.recentYear !== 'undefined') {
        this.$emit('submitSearch', this.search)
      }
    }, 700)
    // 'search.runnerIds': this.CheckAndSubmit,
    // 'search.recentYear': this.CheckAndSubmit

  },
  async mounted () {
    try {
      this.validRaces = (await RacesService.index()).data
      this.validRunners = (await RunnersService.index(null, 'ALL')).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>

</style>

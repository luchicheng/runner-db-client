<template>
  <div id="app">
    <v-app id="inspire">
      <page-header />
      <v-content>
        <v-container max-width="100%">
          <router-view></router-view>
        </v-container>
      </v-content>

      <page-footer height="auto"/>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.danger-alert {
  color: red;
}
</style>

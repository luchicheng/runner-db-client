<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-on="on"
        v-bind="$attrs"
        @click="$emit('click')"
      >
        <slot />
      </v-btn>
    </template>

    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

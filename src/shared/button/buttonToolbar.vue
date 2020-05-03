<template>
  <v-tooltip bottom color="green">
    <template v-slot:activator="{ on }">
      <v-btn dark icon v-on="on" @click="$emit('click')">
        <v-icon>{{icon}}</v-icon>
      </v-btn>
    </template>
    <span class="caption">{{ tooltip }}</span>
  </v-tooltip>
</template>
<script>
export default {
  props: [ "icon", "tooltip"]
};
</script>
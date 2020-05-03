<template>
  <v-tooltip bottom color="green">
    <template v-slot:activator="{ on }">
      <v-btn  v-on="on" class="mx-1" fab dark  :color="color"  @click="$emit('click')">
        <v-icon dark>{{icon}}</v-icon>
      </v-btn>
    </template>
    <span class="caption">{{ tooltip }}</span>
  </v-tooltip>
</template>
<script>
export default {
    props:['color','icon','tooltip']
}
</script>
<template>
  <v-tooltip bottom color="green">
    <template v-slot:activator="{ on }">
      <!--<v-btn x-small v-on="on" class="mx-1" fab dark  :color="color"  @click="$emit('click')">
        <v-icon dark>{{icon}}</v-icon>
      </v-btn>-->
       <v-icon small class="ma-2"   v-on="on" :color="color" @click="$emit('click')" >{{icon}}</v-icon>
    </template>
    <span class="caption">{{ tooltip }}</span>
  </v-tooltip>
</template>
<script>
export default {
    props:['color','icon','tooltip']
}
</script>
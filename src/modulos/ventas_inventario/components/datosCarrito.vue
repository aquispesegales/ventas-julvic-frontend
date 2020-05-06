<template>
  <card>

    <v-list dense three-line class="font-weight-light caption" min-width="300">
      <v-list-item class="pt-0 pb-0" v-for="item in getCarrito" :key="item">
        <v-list-item-content>
          <div v-html="'<b>'  + item.nombre   + '</b>'"></div>
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-list-item-action color>
          <span class="caption">{{"cantidad: "+item.cantidad}}</span>
          <span class="headline indigo--text">{{ "$ "+item.precio}}</span>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content class="title"></v-list-item-content>
        <v-list-item-action>
          <span class="headline indigo--text">{{"total: $ "+precioTotal}}</span>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </card>
</template>
<script>
import typesUtils from "@/modulos/ventas_inventario/store/types/utils";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    precioTotal() {
      return this.getCarrito.reduce(function(total, currentValue) {
        return total + currentValue.precio;
      }, 0);
    },
    ...mapGetters({
      getCarrito: typesUtils.getters.getCarrito
    })
  }
};
</script>
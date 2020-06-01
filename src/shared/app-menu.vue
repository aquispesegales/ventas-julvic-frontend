<template>
  <nav>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-flex pa-2>
            <v-avatar
              class="blue white--text"
              v-text="iniciales"
            ></v-avatar>
          </v-flex>

          <!--<v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>-->
        </v-list-item-avatar>
        <v-list-tile-content>
          <v-list-item-title class="caption">{{nombre_usuario}}</v-list-item-title>
         <v-list-item-subtitle class="caption">{{getObjDatosUsuario[0].es_admin?"SUPERVISOR":"CAJERO"}}</v-list-item-subtitle>
        </v-list-tile-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-group prepend-icon="mdi-home" value="true">
        <template v-slot:activator>
          <v-list-item-title>Ventas</v-list-item-title>
        </template>
        <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Configurar Parametros</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(item, i) in opciones" :key="i" @click="go(item[2])">
            <span class="subMenu caption">{{item[0]}}</span>
          </v-list-item>
        </v-list-group>
      </v-list-group>
      <v-list-group sub-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-for="(item, i) in opcionesOtros" :key="i" @click="go(item[2])">
          <span class="subMenu caption">{{item[0]}}</span>
        </v-list-item>
      </v-list-group>
    </v-list>
  </nav>
</template>
<script>

import typesUtils from "@/modulos/ventas_inventario/store/types/utils";
import { mapGetters } from "vuex";


export default {
  data: () => ({
    opciones: [
      ["Categorias", "mdi-home", "/categoria"],
      ["Clientes", "mdi-home", "/cliente"],
      ["Productos", "mdi-home", "/producto"],
      ["Vender", "mdi-home", "/vender"],
      ["Carrito", "mdi-home", "/carrito"],
      ["Ventas Realizadas", "mdi-home", "/ventas-realizadas"]
    ],
    opcionesOtros: [["Usuario", "mdi-home", "/usuario"]]
  }),
  computed:{
    ...mapGetters({
      getObjDatosUsuario: typesUtils.getters.getObjDatosUsuario,
    }),
    nombre_usuario(){
      return this.getObjDatosUsuario[0].nombre+' '+(this.getObjDatosUsuario[0].apellido_pat!=null?this.getObjDatosUsuario[0].apellido_pat:'')+' '+
      (this.getObjDatosUsuario[0].apellido_mat!=null ? this.getObjDatosUsuario[0].apellido_mat :'');
    },
    iniciales(){
      return this.getObjDatosUsuario[0].nombre.slice(0, 1).toUpperCase() + (this.getObjDatosUsuario[0].apellido_pat !=null?this.getObjDatosUsuario[0].apellido_pat.slice(0, 1).toUpperCase():'');
    }
    
  },
  methods: {
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style lang="scss">
.subMenu {
  color: #5c6bc0;
}
</style>


<template>
  <nav>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-tile-content>
          <v-list-item-title class="caption">Carla Quisbert</v-list-item-title>
          <v-list-item-subtitle class="caption">cquisbert@wistupico.com</v-list-item-subtitle>
        </v-list-tile-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-group prepend-icon="mdi-home" value="true">
        <template v-slot:activator>
          <v-list-item-title>Ventas</v-list-item-title>
        </template>
        <v-list-group sub-group no-action  >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Configurar Parametros</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(item, i) in opciones" :key="i"  @click="go(item[2])">
            <span class="subMenu caption">{{item[0]}}</span>
          </v-list-item>
        </v-list-group>
      </v-list-group>
      <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Configuraciones </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(item, i) in opcionesOtros" :key="i"  @click="go(item[2])">
            <span class="subMenu caption">{{item[0]}}</span>
          </v-list-item>
        </v-list-group>
    </v-list>
  </nav>
</template>
<script>
export default {
  data: () => ({
    opciones: [
      ["Categorias", "mdi-home","/categoria"],
      ["Clientes", "mdi-home","/cliente"],
      ["Productos", "mdi-home","/producto"],
      ["Vender", "mdi-home","/vender"],
      ["Carrito", "mdi-home","/carrito"],
      ["Ventas Realizadas", "mdi-home","/ventas-realizadas"],
      
      
    ],
    opcionesOtros:[
       ["Usuarios", "mdi-home","/usuario"],
    ]
  }),
  methods:{
     go (url) {
        this.$router.push(url)
    },
  }
};
</script>
<style lang="scss">
.subMenu
{
  color:#5C6BC0;
}
</style>


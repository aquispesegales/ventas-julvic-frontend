<template>
  <v-app>
  

  <dialogProgress titulo="Procesando" :dialog="getdialogProgress" ></dialogProgress>


   <!-- :append-icon="()?'':'mdi-layers-search'" -->
    <notifications group="notificacion" position="bottom" />
    
    <v-navigation-drawer v-model="drawer" app temporary>
      <app-menu></app-menu>
    </v-navigation-drawer>
    <template>

      <v-card class="overflow-hidden">
        <v-app-bar 
          color="indigo"
          dark
          scroll-target="#scrolling-techniques-7"
          position: fixed 
        >

        <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title  class="pr-7" >{{$route.name}}</v-toolbar-title>
          <v-spacer></v-spacer>

        <v-menu :close-on-content-click="false" offset-x  v-if="$route.path==='/vender'">
        <template v-slot:activator="{ on }">
            <v-badge
                color="green"
                :content="cantidadTotal"
            >
                <v-icon v-on="on" >mdi-cart</v-icon>
            </v-badge>
        </template>
        <v-card>
          <div v-if="getCarrito.length>0">
            <div class="text-center title">
              <h4>PRODUCTOS</h4>
            </div>
            <v-divider></v-divider>
            <datosCarritoComponent ></datosCarritoComponent>
            <v-btn block small color="primary" @click="irCarrito()">Ir a Cesta</v-btn>
          </div>
          <div v-else>
            <h4 class="pa-5">No existen productos en carrito</h4>
          </div>
        </v-card>
      </v-menu>


         
        </v-app-bar>

        <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="1000">
          <v-container style="height: 1000px; padding-top:80px;">
            
            <router-view />
          </v-container>
        </v-sheet>
        
      </v-card>
    </template>
  </v-app>
</template>
<script>





import AppMenu from "@/shared/app-menu.vue";
import typesUtils from "@/modulos/ventas_inventario/store/types/utils";
import datosCarritoComponent from "@/modulos/ventas_inventario/components/datosCarrito";
import dialogProgress from "@/shared/dialog-progress";
import { mapGetters } from "vuex";


export default {
  name: "App",
  components: {
    AppMenu,
    dialogProgress,
    datosCarritoComponent
  
  },
  computed: {
    ...mapGetters({
      getCarrito: typesUtils.getters.getCarrito,
      getdialogProgress: typesUtils.getters.getdialogProgress,
      
    }),
    cantidadTotal() {
      return this.getCarrito.reduce(function(total, currentValue) {
        return parseInt(total) + parseInt(currentValue.cantidad);
      }, 0);

    },


  },
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },

  methods: {
    go(url) {
      this.$router.push(url);
    },
        irCarrito(){
       this.$router.push('/carrito');
    }
  }
};
</script>


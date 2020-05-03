<template>
  <v-app>
  
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
        
          <v-toolbar-title  class="pr-7" >TITULO</v-toolbar-title>
        
         
          <v-spacer></v-spacer>
        
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
import { mapGetters } from "vuex";


export default {
  name: "App",
  components: {
    AppMenu,
   
  },
  computed: {
    ...mapGetters({
    }),

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
    }
  }
};
</script>


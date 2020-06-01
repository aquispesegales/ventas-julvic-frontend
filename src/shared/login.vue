<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
                
              >
                <v-toolbar-title>Autenticación</v-toolbar-title>
                <v-spacer></v-spacer>
           
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Usuario"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="usuario"
                  ></v-text-field>

                  <v-text-field
                    label="Contraseña - CI"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="contraseña"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small color="primary" @click="autenticarse">Ingresar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import typesUtils from "@/modulos/ventas_inventario/store/types/utils";
import { mapGetters, mapMutations } from "vuex";
  export default {

    data(){
        return{
            usuario:null,
            contraseña:null,
        }
    },
    methods:{
        ...mapMutations({
            setObjDatosUsuario:typesUtils.mutations.setObjDatosUsuario
        }),
        autenticarse(){
            let data = {
                usuario_pc : this.usuario,
                ci:this.contraseña
            };
            this.axios.post('usuario/autenticar',data).then(r=>{
                if(r.data.code!=200){
                    alert("Usuario No existe");
                }else{
                    this.setObjDatosUsuario(r.data.usuario);
                    this.$router.push('/vender');
                }
            });
        }
    }
  }
</script>
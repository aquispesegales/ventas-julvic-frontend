<template>
  <div>
    <v-snackbar v-model="snackbar" :color="'red'">{{ text_snack_bar }}</v-snackbar>
    <v-dialog scrollable v-model="dialogo" max-width="500px">
      <v-card>
        <v-card-title class="indigo pa-2">
          <span dark class="font-weight-light white--text">{{$route.name}}</span>
          <v-spacer></v-spacer>
          <buttonToolbarComponent
            icon="mdi-content-save-outline"
            tooltip="Actualizar Registro"
            @click="insertOrUpdate()"
          ></buttonToolbarComponent>

          <buttonToolbarComponent
            icon="mdi-close"
            tooltip="Cerrar Formulario"
            @click="dialogo=false;"
          ></buttonToolbarComponent>
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn dark icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item v-if="Object.keys(obj).length > 0" @click="eliminar()">
                <v-list-item-title>Eliminar</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>.....</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-card-text>
          <v-container class="altura_contenido">
            <slot name="slot_dialog"></slot>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card>
      <v-data-table
        dense
        :headers="lst_headers"
        :items="lstItems"
        :hide-default-header="true"
        :search="search"
      >
        <template v-slot:header="{ props: { headers } }">
          <thead>
            <tr>
              <th class="subtitle-2" v-for="obj in headers" :key="obj">
                <spam class="indigo--text">{{obj.text.toUpperCase()}}</spam>
              </th>
              <th v-if="propiedades.comportamiento==='listar'"></th>
            </tr>
          </thead>
        </template>

        <template v-slot:item="{ item }">
          <tr v-if="propiedades.comportamiento==='crud'" @click="editar(item)">
            <td
              v-for="obj in lst_headers"
              :key="obj"
              class="pa-2 font-weight-light caption"
            >{{item[obj.value]}}</td>
          </tr>

          <tr v-if="propiedades.comportamiento==='listar'">
            <td
              v-for="obj in lst_headers"
              :key="obj"
              class="pa-2 font-weight-light caption"
            >{{item[obj.value]}}</td>
            <td>
              <slot v-bind:itemCrudPC="item"></slot>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-btn
      class="mx-2 fixed"
      fab
      dark
      small
      color="teal"
      v-if="propiedades.comportamiento==='crud'"
    >
      <buttonCircleComponent color="indigo" icon="mdi-plus" tooltip="Nuevo" @click="nuevo()"></buttonCircleComponent>
    </v-btn>
  </div>
</template>
<script >
import buttonCircleComponentSmall from "@/shared/button/buttonCircleSmall";
import buttonCircleComponent from "@/shared/button/buttonCircle";
import buttonToolbarComponent from "@/shared/button/buttonToolbar";

import { mapGetters, mapMutations } from "vuex";
import typesCrud from "@/modulos/ventas_inventario/store/types/crud-generico.js";

export default {
  components: {
    buttonCircleComponentSmall,
    buttonCircleComponent,
    buttonToolbarComponent
  },
  props: ["propiedades", "lst_headers"],
  data() {
    return {
      search: "",
      lstItems: [],
      dialogo: false,
      snackbar: false,
      text_snack_bar: "jajaja"
    };
  },
  mounted() {
    console.log("obtener clientes");
    this.obtener();
  },
  computed: {
    ...mapGetters({
      getObjFile: typesCrud.getters.getObjFile,
      getObj: typesCrud.getters.getObj,
      getTitulo: typesCrud.getters.getTitulo
    }),

    obj: {
      get() {
        return this.getObj;
      },
      set(newValue) {
        return this.setObj(newValue);
      }
    }
  },
  methods: {
    ...mapMutations({
      setObj: typesCrud.mutations.setObj
    }),

    nuevo() {
      this.dialogo = true;
      this.obj = {};
    },
    mensajeConfirmacion(icon, mensaje) {
      this.$swal({
        icon: icon,
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
      });
    },

    insertarDatos() {
      this.$swal
        .fire({
          title: "Esta seguro de Insertar Registro?",
          text: "Esta Acción no se puede revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "OK",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.axios
              .post(`${this.propiedades.api_insert}`, this.obj)
              .then(r => {
                if (r.status != 200) {
                  throw new Error("Error en la Conexión");
                }
                return r.data;
              })
              .catch(error => {
                this.mensajeConfirmacion("error", error);
                this.obtener();
              });
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        })
        .then(res => {
          console.log(res);
          if (res.value) {
            if (res.value.status === "success") {
              this.mensajeConfirmacion(
                "success",
                "Inserción de Registro Exitoso "
              );

              if (this.$route.path === "/producto") {
                console.log("nevita<zo")
                console.log(res)
                this.actualizarImagen(res.value.producto._id);
              }

              this.obtener();
              this.dialogo = false;
            } else {
              this.mensajeConfirmacion("error", res.value.menssaje);
              this.obtener();
            }
          }
        });
    },
    actualizarImagen(_id) {
      console.log("acualizando imagen")
      console.log(this.getObjFile.name)
      if(this.getObjFile && this.getObjFile.name){
        const formData = new FormData();
      formData.append("file0", this.getObjFile, this.getObjFile.name);
      this.axios.post(`${this.propiedades.api_upload}/${_id}`, formData);
      }
      
    },
    actualizarDatos() {
      this.$swal
        .fire({
          title: "Esta seguro de Actualizar Registro?",
          text: "Esta Acción no se puede revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "OK",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.axios
              .put(
                `${this.propiedades.api_update}/${
                  this.obj[this.propiedades.id_key]
                }`,
                this.obj
              )
              .then(r => {
                if (r.status != 200) {
                  throw new Error("Error en la Conexión");
                }
                return r.data;
              })
              .catch(error => {
                this.mensajeConfirmacion("error", error);
                this.obtener();
              });
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        })
        .then(res => {
          console.log(res);
          if (res.value) {
            if (res.value.status === "success") {
              this.mensajeConfirmacion(
                "success",
                "Actualización de Registro Exitoso "
              );
              if (this.$route.path === "/producto") {
                this.actualizarImagen(this.obj[this.propiedades.id_key]);
              }

              this.obtener();
              this.dialogo = false;
            } else {
              this.mensajeConfirmacion("error", res.value.menssaje);
              this.obtener();
            }
          }
        });
    },

    insertOrUpdate() {
      if (this.obj[this.propiedades.id_key]) {
        this.actualizarDatos();
      } else {
        this.insertarDatos();
      }
    },
    editar(item) {
      this.obj = item;
      this.dialogo = true;
    },

    eliminar() {
      let item = this.obj;
      this.$swal
        .fire({
          title: "Desea Eliminar el registro ?",
          text: "Esta Acción no se puede revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "OK",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.axios
              .delete(
                `${this.propiedades.api_delete}/${
                  item[this.propiedades.id_key]
                }`
              )
              .then(r => {
                if (r.status != 200) {
                  throw new Error("Error en la Conexión");
                }
                return r.data;
              })
              .catch(error => {
                this.mensajeConfirmacion("error", error);
                this.obtener();
              });
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        })
        .then(res => {
          if (res.value) {
            if (res.value.status === "success") {
              this.mensajeConfirmacion(
                "success",
                "Se ha eliminado el Registro"
              );
              this.obtener();
              this.dialogo = false;
            } else {
              this.mensajeConfirmacion("error", res.value.menssaje);
              this.obtener();
            }
          }
        });
    },
    obtener() {
      this.lstItems = [];
      this.axios.get(`${this.propiedades.api_get}`).then(r => {

        

        this.lstItems = r.data[this.propiedades.api_response.lst];
      });
    }
  }
};
</script>

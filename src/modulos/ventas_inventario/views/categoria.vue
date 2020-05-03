<template>
  <v-card class="ma-2">
    <v-dialog scrollable v-model="dialogo" max-width="500px">
      <v-card>
        <v-card-title class="indigo pa-2">
          <span dark class="font-weight-light white--text">CATEGORIAS</span>
          <v-spacer></v-spacer>
          <v-icon dark medium @click="registrarOactualizar()">mdi-content-save</v-icon>
        </v-card-title>
        <v-card-text>
          <v-container class="altura_contenido">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Nombre "
                  v-model="objCategria.nombre"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  class="caption"
                  dense
                  hide-details
                  auto-grow
                  outlined
                  name="input-7-1"
                  label="Descripción"
                  v-model="objCategria.descripcion"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-data-table
      dense
      :headers="header_categoria"
      :items="items_categoria"
      :hide-default-header="true"
      :search="search"
    >
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th class="subtitle-2" v-for="obj in headers" :key="obj.categoria_id">
              <spam class="indigo--text">{{obj.text.toUpperCase()}}</spam>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td class="pa-2 font-weight-light caption">{{item.nombre}}</td>
          <td class="pa-2 font-weight-light caption">{{item.descripcion}}</td>
          <td
            class="pa-2 font-weight-light caption"
          >{{ $fechas.FormatearFechaParaLocal(item.fecha_registro)}}</td>
          <td>
            <v-btn class="mx-2" fab dark x-small color="teal" @click="editar(item)">
              <v-icon dark small>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark x-small color="pink" @click="eliminar(item)">
              <v-icon small dark>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- boton lfotante -->

    <v-btn class="mx-2 fixed" fab dark color="indigo" @click="nuevo()">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      dialogo: false,
      search: "",
      header_categoria: [
        { text: "Nombre", value: "nombre" },
        { text: "Descripcion ", value: "descripcion" },
        { text: "Fecha Registro ", value: "fecha_registro" },
        { text: "Acciones ", value: "" }
      ],
      items_categoria: [],
      objCategria: {}
    };
  },

  mounted() {
    this.obtenerCategorias();
  },
  methods: {
    obtenerCategorias() {
      this.axios.get(`categoria/obtener-todos`).then(r => {
        this.items_categoria = r.data.categorias;
      });
    },
    nuevo() {
      this.dialogo = true;
      this.objCategria = {};
    },
    registrarOactualizar() {
      if(this.objCategria.categoria_id>0){
        this.axios.put(`categoria/actualizar/${this.objCategria.categoria_id}`, this.objCategria).then(r => {
          this.obtenerCategorias();
        });
      }else{
          this.axios.post(`categoria/registrar`, this.objCategria).then(r => {
            this.obtenerCategorias();
          });
      }
      this.dialogo = false;
    },
    editar(item){
      this.objCategria = item;
      this.dialogo = true;
    },
    eliminar(item){
        this.axios.delete(`categoria/eliminar/${item.categoria_id}`).then(r => {
        this.obtenerCategorias();
      });
    }
  }
};
</script>

<style  lang="scss">
.fixed {
  position: fixed;
  top: 85%;
  right: 5%;
}
</style>
<template>
  <v-card class="ma-2">
    <v-dialog scrollable v-model="dialogo" max-width="500px">
      <v-card>
        <v-card-title class="indigo pa-2">
          <span dark class="font-weight-light white--text">CLIENTE</span>
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
                  label="CI "
                  v-model="objUsuario.ci"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Nombre "
                  v-model="objUsuario.nombre"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Apellido Paterno "
                  v-model="objUsuario.apellido_pat"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Apellido Materno "
                  v-model="objUsuario.apellido_mat"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Usuario PC"
                  v-model="objUsuario.usuario_pc"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field class="caption" dense hide-details outlined label="Telefono "></v-text-field>

                <v-switch v-model="objUsuario.es_admin" :label="`Es Administrador`"></v-switch>
              </v-col>
             
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-data-table
      dense
      :headers="header_usuario"
      :items="items_usuario"
      :hide-default-header="true"
      :search="search"
    >
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th class="subtitle-2" v-for="obj in headers" :key="obj.usuario_id">
              <spam class="indigo--text">{{obj.text.toUpperCase()}}</spam>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td class="pa-2 font-weight-light caption">{{item.ci}}</td>
          <td class="pa-2 font-weight-light caption">{{item.nombre}}</td>
          <td class="pa-2 font-weight-light caption">{{item.apellido_pat}}</td>
          <td class="pa-2 font-weight-light caption">{{item.apellido_mat}}</td>
          <td class="pa-2 font-weight-light caption">{{item.usuario_pc}}</td>
          <td class="pa-2 font-weight-light caption">{{(item.es_admin)?"SI":"NO"}}</td>
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
      header_usuario: [
        { text: "CI", value: "ci" },
        { text: "Nombre", value: "nombre" },
        { text: "Apellido Paterno ", value: "apellido_pat" },
        { text: "Apellido Materno ", value: "apellido_mat" },
        { text: "Usuario ", value: "usuario_pc" },
        { text: "Administrador ", value: "es_admin" },
        { text: "Fecha Registro ", value: "fecha_registro" },
        { text: "Acciones ", value: "" }
      ],
      items_usuario: [],
      objUsuario: {}
    };
  },

  mounted() {
    this.obtenerUsuarios();
  },
  methods: {
    obtenerUsuarios() {
      this.axios.get(`usuario/obtener-todos`).then(r => {
        this.items_usuario = r.data.usuarios;
      });
    },
    eliminar(item) {
      this.axios.delete(`usuario/eliminar/${item.usuario_id}`).then(r => {
        this.obtenerUsuarios();
      });
    },
    editar(item) {
      this.objUsuario = item;
      this.dialogo = true;
    },
    nuevo() {
      this.dialogo = true;
      this.objUsuario = {};
    },
    registrarOactualizar() {
      if (this.objUsuario.usuario_id > 0) {
        this.axios
          .put(
            `usuario/actualizar/${this.objUsuario.usuario_id}`,
            this.objUsuario
          )
          .then(r => {
            this.obtenerUsuarios();
          });
      } else {
        this.axios.post(`usuario/registrar`, this.objUsuario).then(r => {
          this.obtenerUsuarios();
        });
      }
      this.dialogo = false;
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

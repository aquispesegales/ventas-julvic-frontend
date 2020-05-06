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
                  label="Nombre "
                  v-model="objCliente.nombre"
                ></v-text-field>
              </v-col>
                 <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="NIT o CI "
                  v-model="objCliente.nit_ci"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Apellido Paterno "
                  v-model="objCliente.apellido_pat"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Apellido Materno "
                  v-model="objCliente.apellido_mat"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Correo"
                  v-model="objCliente.correo"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Telefono "
                  v-model="objCliente.telefono"
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
                  label="Direccion"
                  v-model="objCliente.direccion"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-data-table
      dense
      :headers="header_cliente"
      :items="items_cliente"
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
          <td class="pa-2 font-weight-light caption">{{item.nit_ci}}</td>
          <td class="pa-2 font-weight-light caption">{{item.apellido_pat}}</td>
          <td class="pa-2 font-weight-light caption">{{item.apellido_mat}}</td>
          <td class="pa-2 font-weight-light caption">{{item.correo}}</td>
          <td class="pa-2 font-weight-light caption">{{item.telefono}}</td>
          <td class="pa-2 font-weight-light caption">{{item.direccion}}</td>
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
      header_cliente: [
        { text: "Nombre", value: "nombre" },
        { text: "NIT o CI", value: "nit_ci" },
        { text: "Apellido Paterno ", value: "apellido_pat" },
        { text: "Apellido Materno ", value: "apellido_mat" },
        { text: "Correo ", value: "correo" },
        { text: "Teléfono ", value: "telefono" },
        { text: "Dirección ", value: "direccion" },
        { text: "Fecha Registro ", value: "fecha_registro" },
        { text: "Acciones ", value: "" }
      ],
      items_cliente: [],
      objCliente: {}
    };
  },

  mounted() {
    this.obtenerClientes();
  },
  methods: {
    obtenerClientes() {
      this.axios.get(`cliente/obtener-todos`).then(r => {
        this.items_cliente = r.data.clientes;
      });
    },
    eliminar(item) {
      this.axios.delete(`cliente/eliminar/${item.cliente_id}`).then(r => {
        this.obtenerClientes();
      });
    },
    editar(item) {
      this.objCliente = item;
      this.dialogo = true;
    },
    nuevo() {
      this.dialogo = true;
      this.objCliente = {};
    },
    registrarOactualizar() {
      if (this.objCliente.cliente_id > 0) {
        this.axios
          .put(
            `cliente/actualizar/${this.objCliente.cliente_id}`,
            this.objCliente
          )
          .then(r => {
            this.obtenerClientes();
          });
      } else {
        this.axios.post(`cliente/registrar`, this.objCliente).then(r => {
          this.obtenerClientes();
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

<template>
  <v-card class="ma-2">
    <v-dialog scrollable v-model="dialogo" max-width="500px">
      <v-card>
        <v-card-title class="indigo pa-2">
          <span dark class="font-weight-light white--text">PRODUCTOS</span>
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
                  v-model="objProducto.nombre"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Descripcióm "
                  v-model="objProducto.descripcion"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Precio "
                  v-model="objProducto.precio"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Stock Almacen"
                  v-model="objProducto.stock_almacen"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="caption"
                  dense
                  hide-details
                  outlined
                  label="Stock Venta"
                  v-model="objProducto.stock"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  class="caption"
                  hide-details
                  outlined
                  v-model="objProducto.categoria_id"
                  :items="items_categoria"
                  dense
                  chips
                  small-chips
                  label="Categoria"
                  item-text="nombre"
                  item-value="categoria_id"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-data-table
      dense
      :headers="header_producto"
      :items="items_producto"
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
          <td class="pa-2 font-weight-light caption">{{item.precio}}</td>
          <td class="pa-2 font-weight-light caption">{{item.stock}}</td>
          <td class="pa-2 font-weight-light caption">{{item.stock_almacen}}</td>
          <td class="pa-2 font-weight-light caption">{{(item.categoria)?item.categoria.nombre:''}}</td>
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
import typesUtils from "@/modulos/ventas_inventario/store/types/utils";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      dialogo: false,
      search: "",
      header_producto: [
        { text: "Nombre", value: "nombre" },
        { text: "Descripcion ", value: "descripcion" },
        { text: "Precio ", value: "precio" },
        { text: "Stock Venta", value: "stock" },
        { text: "Stock Almacen", value: "stock_almacen" },
        { text: "categoria ", value: "categoria.nombre" },
        { text: "Fecha Registro ", value: "fecha_registro" },
        { text: "Acciones ", value: "" }
      ],
      items_producto: [],
      items_categoria: [],
      objProducto: {}
    };
  },

  mounted() {
    this.obtenerProductos();
    this.obtenerCategorias();
  },
  methods: {
    ...mapMutations({
      setdialogProgress: typesUtils.mutations.setdialogProgress
    }),
    obtenerCategorias() {
      this.axios.get(`categoria/obtener-todos`).then(r => {
        this.items_categoria = r.data.categorias;
      });
    },
    obtenerProductos() {
      this.axios.get(`producto/obtener-todos`).then(r => {
        this.items_producto = r.data.productos;
      });
    },
    eliminar(item) {
      this.setdialogProgress(true);
      this.axios
        .delete(`producto/eliminar/${item.producto_id}`)
        .then(r => {
          this.obtenerProductos();
          this.setdialogProgress(false);
        })
        .catch(error => {
          this.$notify({
            type: "error",
            group: "notificacion",
            title: "Error",
            text:
              "No se pudo eliminar, Verificar si este registro no esta usado"
          });
          this.setdialogProgress(false);
        });
    },
    editar(item) {
      this.objProducto = item;
      this.dialogo = true;
    },
    nuevo() {
      this.dialogo = true;
      this.objProducto = {};
    },
    registrarOactualizar() {
      if (!this.objProducto.nombre || !this.objProducto.descripcion) {
        alert("Debe registrar nombre y descripción como mínimo");
        return;
      }
      this.setdialogProgress(true);
      if (this.objProducto.producto_id > 0) {
        this.axios
          .put(
            `producto/actualizar/${this.objProducto.producto_id}`,
            this.objProducto
          )
          .then(r => {
            this.obtenerProductos();
            this.setdialogProgress(false);
          });
      } else {
        this.axios.post(`producto/registrar`, this.objProducto).then(r => {
          this.obtenerProductos();
          this.setdialogProgress(false);
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

<template>
  <v-card class="ma-2">
    <v-dialog scrollable v-model="dialogo" max-width="500px">
      <v-card>
        <v-card-title class="indigo pa-2">
          <span dark class="font-weight-light white--text">Agregar a Carrito</span>
          <v-spacer></v-spacer>
          <v-icon dark medium @click="agregarCarrito()">mdi-plus</v-icon>
        </v-card-title>
        <v-card-text>
          <v-container class="altura_contenido">
            <h4>Nombre del Producto:</h4>
            {{objCarrito.nombre}}
            <v-divider></v-divider>
            <br />
            <v-text-field
              label="Cantidad"
              class="indigo--text display-1"
              outlined
              v-model="objCarrito.cantidad"
            ></v-text-field>
            <v-text-field
              outlined
              class="indigo--text display-1"
              label="Precio"
              prefix="Bs "
              v-model="objCarrito.precio"
            ></v-text-field>
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
          <td class="pa-2 font-weight-light caption">{{item.categoria?item.categoria.nombre:''}}</td>
          <td
            class="pa-2 font-weight-light caption"
          >{{ $fechas.FormatearFechaParaLocal(item.fecha_registro)}}</td>
          <td>
            <v-btn v-if="item.stock!=null & item.stock>0" depressed small color="indigo" dark @click="vender(item)">vender</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import typesUtils from "@/modulos/ventas_inventario/store/types/utils";

import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogo: false,
      search: "",
      header_producto: [
        { text: "Nombre", value: "nombre" },
        { text: "Descripcion ", value: "descripcion" },
        { text: "Precio ", value: "precio" },
        { text: "Stock ", value: "stock" },
        { text: "categoria ", value: "categoria.nombre" },
        { text: "Fecha Registro ", value: "fecha_registro" },
        { text: "Acciones ", value: "" }
      ],
      items_producto: [],
      objCarrito: {}
    };
  },

  mounted() {
    this.obtenerProductos();
  },
  computed: {
    ...mapGetters({
      getCarrito: typesUtils.getters.getCarrito
    })
  },
  methods: {
    ...mapMutations({
      addCarrito: typesUtils.mutations.addCarrito
    }),
    obtenerProductos() {
      this.axios.get(`producto/obtener-todos`).then(r => {
        this.items_producto = r.data.productos;
      });
    },
    vender(item) {
      this.dialogo = true;
      this.objCarrito = item;
    },
    agregarCarrito() {
      if (!this.objCarrito.cantidad || this.objCarrito.cantidad <= 0) {
        this.$mensaje.Mensaje("error", "Cantidad Incorrecta");
        return;
      }
      if (!this.objCarrito.precio || this.objCarrito.precio <= 0) {
        this.$mensaje.Mensaje("error", "Precio Incorrecto");
        return;
      }
      if (this.objCarrito.cantidad > this.objCarrito.stock) {
        this.$mensaje.Mensaje(
          "error",
          "Cantidad disponible: " + this.objCarrito.stock
        );
        return;
      }
      if (
        this.getCarrito.filter(
          x => x.producto_id === this.objCarrito.producto_id
        ).length > 0
      ) {
        let cantidadTotalComprado = this.getCarrito.reduce(function(
          total,
          currentValue
        ) {
          return total + parseInt(currentValue.cantidad);
        },
        0);

        if (cantidadTotalComprado >= this.objCarrito.stock) {
          this.$mensaje.Mensaje(
            "error",
            "Anteriormente ya Agrego a Carrito : " + cantidadTotalComprado
          );
          return;
        }
      }

      let carrito = {
        producto_id: this.objCarrito.producto_id,
        nombre: this.objCarrito.nombre,
        precio: this.objCarrito.precio,
        cantidad: this.objCarrito.cantidad
      };
      this.addCarrito(carrito);
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

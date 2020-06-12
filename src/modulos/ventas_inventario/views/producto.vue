<template>
  <v-card class="ma-2">
    <v-dialog scrollable v-model="dialogoPasar" max-width="500px">
      <v-card>
        <v-card-title class="indigo pa-2">
          <span dark class="font-weight-light white--text">PASAR PRODUCTO DE ALMACEN A VENTA</span>
          <v-spacer></v-spacer>
          <v-icon dark medium @click="actualizarStock()">mdi-content-save</v-icon>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container class="altura_contenido">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    class="caption"
                    readonly
                    dense
                    outlined
                    label="Cantidad Almacen "
                    v-model="objPasar.stock_almacen"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    class="caption"
                    
                    dense
                    outlined
                    label="Cantidad Venta "
                    v-model="objPasar.stock_aux"
                    :rules=" [
                      v => !!v || 'Campo  Requerido',
                      v => !v || (!isNaN(v)) || 'debe registrar valor de tipo numero'
                    ]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog scrollable v-model="dialogo" max-width="500px">
      <v-card>
        <v-card-title class="indigo pa-2">
          <span dark class="font-weight-light white--text">PRODUCTOS</span>
          <v-spacer></v-spacer>
          <v-icon dark medium @click="registrarOactualizar()">mdi-content-save</v-icon>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container class="altura_contenido">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    class="caption"
                    dense
                    outlined
                    label="Nombre "
                    v-model="objProducto.nombre"
                    :rules=" [
                      v => !!v || 'Campo  Requerido',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    class="caption"
                    dense
                    outlined
                    label="Descripcióm "
                    v-model="objProducto.descripcion"
                    :rules=" [
                      v => !!v || 'Campo  Requerido',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    class="caption"
                    dense
                    outlined
                    label="Precio "
                    v-model="objProducto.precio"
                    :rules=" [
                      v => !!v || 'Campo  Requerido',
                      v => !v || (!isNaN(v)) || 'debe registrar valor de tipo numero'
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    class="caption"
                    dense
                    outlined
                    label="Stock Almacen"
                    v-model="objProducto.stock_almacen"
                    :rules=" [
                      v => !!v || 'Campo  Requerido',
                      v => !v || (!isNaN(v)) || 'debe registrar valor de tipo numero'
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    class="caption"
                    dense
                    outlined
                    label="Stock Venta"
                    v-model="objProducto.stock"
                    :rules=" [
                      v => !!v || 'Campo  Requerido',
                      v => !v || (!isNaN(v)) || 'debe registrar valor de tipo numero'
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    class="caption"
                    outlined
                    v-model="objProducto.categoria_id"
                    :items="items_categoria"
                    dense
                    chips
                    small-chips
                    label="Categoria"
                    item-text="nombre"
                    item-value="categoria_id"
                    :rules=" [
                      v => !!v || 'Campo  Requerido',
                    ]"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
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
          <td class="pa-2 font-weight-light caption">
            {{item.stock_almacen}}
            <a
              v-if="item.stock_almacen>0"
              @click="abrirPasar(item)"
            >pasar a venta</a>
          </td>
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
      dialogoPasar: false,
      objPasar: {},
      valid: true,
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
    abrirPasar(item) {
      this.dialogoPasar = true;
      this.objPasar = item;
    },
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
    actualizarStock() {
      if(parseInt(this.objPasar.stock_aux) > (this.objPasar.stock_almacen)){
          this.$mensaje.Mensaje(
            "error",
            "Stock a registrar no debe ser superior al stock Almacen"
          );
        return;
      }
      this.setdialogProgress(true);
      this.objPasar.stock = parseInt(this.objPasar.stock) + parseInt(this.objPasar.stock_aux);
      this.objPasar.stock_almacen = parseInt(this.objPasar.stock_almacen) - parseInt(this.objPasar.stock_aux);
      this.axios
        .put(`producto/actualizar/${this.objPasar.producto_id}`, this.objPasar)
        .then(r => {
          this.obtenerProductos();
          this.setdialogProgress(false);
        });

        this.dialogoPasar = false;
        this.objPasar={};
    },
    registrarOactualizar() {
      if (this.$refs.form.validate()) {
        if (!this.objProducto.nombre || !this.objProducto.descripcion) {
          this.$mensaje.Mensaje(
            "error",
            "Debe registrar nombre y descripción como mínimo"
          );
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

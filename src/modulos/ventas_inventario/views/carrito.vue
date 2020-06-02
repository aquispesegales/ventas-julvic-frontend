<template>
  <v-card class="ma-2">
    <v-row>
      <v-col cols="6">
        <v-col cols="12">
          <h4>PRODUCTOS</h4>
          <datosCarritoComponent></datosCarritoComponent>
        </v-col>
      </v-col>
      <v-col cols="6">
        <h4>DATOS DEL CLIENTE</h4>
        <v-col cols="12">
          <v-text-field
            class="caption"
            dense
            hide-details
            outlined
            label="CI o NIT "
            append-outer-icon="mdi-table-search"
            @click:append-outer="buscarClienteByNitCi()"
            v-model="objCliente.nit_ci"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            class="caption"
            dense
            hide-details
            outlined
            label="Nombre Completo de Cliente "
            v-model="objCliente.nombre"
          ></v-text-field>
        </v-col>
          <v-col cols="12">
                <v-switch v-model="es_factura" :label="`Es con factura?`"></v-switch>
              </v-col>
        <v-col cols="12">
          <v-btn depressed small color="indigo" dark @click="guardarCarrito()">guardar venta</v-btn>

          <!--br />
          DATOS DE CLIENTE:
          {{objCliente}}
          <br />DATOS DE PROCUDTOS
          <br />
          {{getCarrito}}-->

        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import typesUtils from "@/modulos/ventas_inventario/store/types/utils";
import datosCarritoComponent from "@/modulos/ventas_inventario/components/datosCarrito";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    datosCarritoComponent
  },
  data() {
    return {
      objCliente: {},
      es_factura:false
    };
  },
  computed: {
    ...mapGetters({
      getCarrito: typesUtils.getters.getCarrito
    })
  },

  methods: {
    ...mapMutations({
      setCarrito:typesUtils.mutations.setCarrito,
          setdialogProgress: typesUtils.mutations.setdialogProgress
    }),

    buscarClienteByNitCi() {
      
      this.setdialogProgress(true);
      this.axios
        .get(`cliente/buscar-cliente-por-nitci/${this.objCliente.nit_ci}`)
        .then(r => {
           this.objCliente = {};
          if (r.data.code == 200) {
            this.objCliente = r.data.cliente;
            console.log("respuesta");
            console.log(r.cliente);
          }else{
            alert("Cliente no Encontrado")
          }
          this.setdialogProgress(false);
        });
    },
    guardarCarrito() {
      if (Object.keys(this.objCliente).length === 0) {
        alert("Debe registrar Cliente");
        return;
      }
      if (this.getCarrito.length <= 0) {
        alert("Debe Registrar Productos");
        return;
      }
      //arma cabeceera
      let cabe = {
        nit_ci: this.objCliente.nit_ci,
        cliente_id: this.objCliente.cliente_id,
        con_factura : this.es_factura
      };

      let id_cabecera = 0;
      this.setdialogProgress(true);
      this.axios.post("venta-cab/registrar", cabe).then(r => {
        if (r.data.code == 200) {
          id_cabecera = r.data.venta_cab.id;
          let lstDetalle = [];
          if (id_cabecera > 0) {
            this.getCarrito.forEach(item => {
              let objDetalle = {
                producto_id: item.producto_id,
                cantidad : item.cantidad,
                venta_cab_id: id_cabecera
              };
              lstDetalle.push(objDetalle);
            });
          }
          //guarcar detalle
          if (lstDetalle.length > 0) {
                this.axios.post("venta-det/registrar", lstDetalle).then(rr => {
                   if (rr.data.code == 200) {
                      this.objCliente={};
                      this.setCarrito([]);
                      alert("Venta Realizada")
                      this.$router.push('/vender');
                   }else{
                     alert("Erro al relizar la venta, favor comunicarse con sistemas")
                   }
                   this.setdialogProgress(false);
                });
          }
        }
      });
    }
  }
};
</script>
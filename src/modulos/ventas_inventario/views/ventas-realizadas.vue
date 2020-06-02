<template>
  <v-card class="ma-2">
    <v-data-table
      dense
      :headers="header_ventas_realizadas"
      :items="items_ventas_realizadas"
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
          <td class="pa-2 font-weight-light caption">{{item.venta_cab_id}}</td>
          <td class="pa-2 font-weight-light caption">{{item.nit_ci}}</td>
          <td class="pa-2 font-weight-light caption">{{item.cliente.nombre}}</td>
          <td class="pa-2 font-weight-light caption">23</td>
          <td
            class="pa-2 font-weight-light caption"
          >{{$fechas.FormatearFechaParaLocal(item.fecha_registro)}}</td>
          <td class="pa-2 font-weight-light caption">
            {{item.con_factura?'SI':'NO'}}
          </td>
          <td class="pa-2 font-weight-light caption">
           

            <v-menu :close-on-content-click="false" offset-y>
              <template v-slot:activator="{ on }">
                 <v-btn v-on="on" depressed small color="indigo" dark @click="verProducto(item)">ver productos</v-btn>
              </template>
              <v-card>
                  <div v-for="obj in productItem" :key="obj" class="caption">
                    <div style="border-style:solid; margin:2px;">
                        Producto: {{obj.producto.nombre}}<br>
                        Precio: {{obj.producto.precio}}<br>
                        Cantidad: {{obj.cantidad}}
                    </div>
                  </div>
              </v-card>
            </v-menu>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: "",

      header_ventas_realizadas: [
        { text: "Nro de Venta", value: "venta_cab_id" },
        { text: "Nombre Cliente", value: "nit_ci" },
        { text: "Nombre Cliente", value: "cliente.nombre" },
        { text: "Total Bs", value: "nombre" },
        { text: "Fecha Registro", value: "fecha_registro" },
        { text: "Con Factura", value: "con_factura" },
        { text: "", value: "" }
      ],
      items_ventas_realizadas: [],
      productItem:[]
    };
  },
  mounted() {
    this.obtenerVentasRelizadas();
  },
  methods: {
    obtenerVentasRelizadas() {
      this.axios.get(`venta-cab/ventas-realizadas`).then(r => {
        this.items_ventas_realizadas = r.data.ventas_cab;
      });
    },
    verProducto(item){
        this.productItem = item.ventas_det
    }
  }
};
</script>
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22c8a0"],{f451:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-card",{staticClass:"ma-2"},[e("v-data-table",{attrs:{dense:"",headers:t.header_ventas_realizadas,items:t.items_ventas_realizadas,"hide-default-header":!0,search:t.search},scopedSlots:t._u([{key:"header",fn:function(a){var n=a.props.headers;return[e("thead",[e("tr",t._l(n,(function(a){return e("th",{key:a.categoria_id,staticClass:"subtitle-2"},[e("spam",{staticClass:"indigo--text"},[t._v(t._s(a.text.toUpperCase()))])],1)})),0)])]}},{key:"item",fn:function(a){var n=a.item;return[e("tr",[e("td",{staticClass:"pa-2 font-weight-light caption"},[t._v(t._s(n.venta_cab_id))]),e("td",{staticClass:"pa-2 font-weight-light caption"},[t._v(t._s(n.nit_ci))]),e("td",{staticClass:"pa-2 font-weight-light caption"},[t._v(t._s(n.cliente.nombre))]),e("td",{staticClass:"pa-2 font-weight-light caption"},[t._v("23")]),e("td",{staticClass:"pa-2 font-weight-light caption"},[t._v(t._s(t.$fechas.FormatearFechaParaLocal(n.fecha_registro)))]),e("td",{staticClass:"pa-2 font-weight-light caption"},[t._v(" "+t._s(n.con_factura?"SI":"NO")+" ")]),e("td",{staticClass:"pa-2 font-weight-light caption"},[e("v-menu",{attrs:{"close-on-content-click":!1,"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(a){var s=a.on;return[e("v-btn",t._g({attrs:{depressed:"",small:"",color:"indigo",dark:""},on:{click:function(a){return t.verProducto(n)}}},s),[t._v("ver productos")])]}}],null,!0)},[e("v-card",t._l(t.productItem,(function(a){return e("div",{key:a,staticClass:"caption"},[e("div",{staticStyle:{"border-style":"solid",margin:"2px"}},[t._v(" Producto: "+t._s(a.producto.nombre)),e("br"),t._v(" Precio: "+t._s(a.producto.precio)),e("br"),t._v(" Cantidad: "+t._s(a.cantidad)+" ")])])})),0)],1)],1)])]}}])})],1)},s=[],i={data:function(){return{search:"",header_ventas_realizadas:[{text:"Nro de Venta",value:"venta_cab_id"},{text:"Nombre Cliente",value:"nit_ci"},{text:"Nombre Cliente",value:"cliente.nombre"},{text:"Total Bs",value:"nombre"},{text:"Fecha Registro",value:"fecha_registro"},{text:"Con Factura",value:"con_factura"},{text:"",value:""}],items_ventas_realizadas:[],productItem:[]}},mounted:function(){this.obtenerVentasRelizadas()},methods:{obtenerVentasRelizadas:function(){var t=this;this.axios.get("venta-cab/ventas-realizadas").then((function(a){t.items_ventas_realizadas=a.data.ventas_cab}))},verProducto:function(t){this.productItem=t.ventas_det}}},r=i,o=e("2877"),c=e("6544"),l=e.n(c),d=e("8336"),u=e("b0af"),_=e("8fea"),v=e("e449"),h=Object(o["a"])(r,n,s,!1,null,null,null);a["default"]=h.exports;l()(h,{VBtn:d["a"],VCard:u["a"],VDataTable:_["a"],VMenu:v["a"]})}}]);
//# sourceMappingURL=chunk-2d22c8a0.94e6890a.js.map
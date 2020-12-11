(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01519d94"],{"5e41":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"ma-2"},[r("v-dialog",{attrs:{scrollable:"","max-width":"500px"},model:{value:t.dialogo,callback:function(e){t.dialogo=e},expression:"dialogo"}},[r("v-card",[r("v-card-title",{staticClass:"indigo pa-2"},[r("span",{staticClass:"font-weight-light white--text",attrs:{dark:""}},[t._v("Agregar a Carrito")]),r("v-spacer"),r("v-icon",{attrs:{dark:"",medium:""},on:{click:function(e){return t.agregarCarrito()}}},[t._v("mdi-plus")])],1),r("v-card-text",[r("v-container",{staticClass:"altura_contenido"},[r("h4",[t._v("Nombre del Producto:")]),t._v(" "+t._s(t.objCarrito.nombre)+" "),r("v-divider"),r("br"),r("v-text-field",{staticClass:"indigo--text display-1",attrs:{label:"Cantidad",outlined:""},model:{value:t.objCarrito.cantidad,callback:function(e){t.$set(t.objCarrito,"cantidad",e)},expression:"objCarrito.cantidad"}}),r("v-text-field",{staticClass:"indigo--text display-1",attrs:{outlined:"",label:"Precio",prefix:"Bs "},model:{value:t.objCarrito.precio,callback:function(e){t.$set(t.objCarrito,"precio",e)},expression:"objCarrito.precio"}})],1)],1)],1)],1),r("v-data-table",{attrs:{dense:"",headers:t.header_producto,items:t.items_producto,"hide-default-header":!0,search:t.search},scopedSlots:t._u([{key:"header",fn:function(e){var a=e.props.headers;return[r("thead",[r("tr",t._l(a,(function(e){return r("th",{key:e.categoria_id,staticClass:"subtitle-2"},[r("spam",{staticClass:"indigo--text"},[t._v(t._s(e.text.toUpperCase()))])],1)})),0)])]}},{key:"item",fn:function(e){var a=e.item;return[r("tr",[r("td",{staticClass:"pa-2 font-weight-light caption"},[t._v(t._s(a.nombre))]),r("td",{staticClass:"pa-2 font-weight-light caption"},[t._v(t._s(a.descripcion))]),r("td",{staticClass:"pa-2 font-weight-light caption"},[t._v(t._s(a.precio))]),r("td",{staticClass:"pa-2 font-weight-light caption"},[t._v(t._s(a.stock))]),r("td",{staticClass:"pa-2 font-weight-light caption"},[t._v(t._s(a.categoria?a.categoria.nombre:""))]),r("td",{staticClass:"pa-2 font-weight-light caption"},[t._v(t._s(t.$fechas.FormatearFechaParaLocal(a.fecha_registro)))]),r("td",[null!=a.stock&a.stock>0?r("v-btn",{attrs:{depressed:"",small:"",color:"indigo",dark:""},on:{click:function(e){return t.vender(a)}}},[t._v("vender")]):t._e()],1)])]}}])})],1)},o=[],i=(r("a4d3"),r("4de4"),r("e439"),r("dbb4"),r("b64b"),r("e25e"),r("159b"),r("ade3")),s=r("4801"),n=r("2f62");function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function d(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){Object(i["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var l={data:function(){return{dialogo:!1,search:"",header_producto:[{text:"Nombre",value:"nombre"},{text:"Descripcion ",value:"descripcion"},{text:"Precio ",value:"precio"},{text:"Stock ",value:"stock"},{text:"categoria ",value:"categoria.nombre"},{text:"Fecha Registro ",value:"fecha_registro"},{text:"Acciones ",value:""}],items_producto:[],objCarrito:{}}},mounted:function(){this.obtenerProductos()},computed:d({},Object(n["b"])({getCarrito:s["a"].getters.getCarrito})),methods:d({},Object(n["c"])({addCarrito:s["a"].mutations.addCarrito}),{obtenerProductos:function(){var t=this;this.axios.get("producto/obtener-todos").then((function(e){t.items_producto=e.data.productos}))},vender:function(t){this.dialogo=!0,this.objCarrito=t},agregarCarrito:function(){var t=this;if(!this.objCarrito.cantidad||this.objCarrito.cantidad<=0)this.$mensaje.Mensaje("error","Cantidad Incorrecta");else if(!this.objCarrito.precio||this.objCarrito.precio<=0)this.$mensaje.Mensaje("error","Precio Incorrecto");else if(this.objCarrito.cantidad>this.objCarrito.stock)this.$mensaje.Mensaje("error","Cantidad disponible: "+this.objCarrito.stock);else{if(this.getCarrito.filter((function(e){return e.producto_id===t.objCarrito.producto_id})).length>0){var e=this.getCarrito.reduce((function(t,e){return t+parseInt(e.cantidad)}),0);if(e>=this.objCarrito.stock)return void this.$mensaje.Mensaje("error","Anteriormente ya Agrego a Carrito : "+e)}var r={producto_id:this.objCarrito.producto_id,nombre:this.objCarrito.nombre,precio:this.objCarrito.precio,cantidad:this.objCarrito.cantidad};this.addCarrito(r),this.dialogo=!1}}})},u=l,p=(r("95d7"),r("2877")),b=r("6544"),h=r.n(b),f=r("8336"),g=r("b0af"),v=r("99d9"),C=r("a523"),j=r("8fea"),m=r("169a"),_=r("ce7e"),x=r("132d"),k=r("2fa4"),w=r("8654"),O=Object(p["a"])(u,a,o,!1,null,null,null);e["default"]=O.exports;h()(O,{VBtn:f["a"],VCard:g["a"],VCardText:v["b"],VCardTitle:v["c"],VContainer:C["a"],VDataTable:j["a"],VDialog:m["a"],VDivider:_["a"],VIcon:x["a"],VSpacer:k["a"],VTextField:w["a"]})},"760b":function(t,e,r){},"95d7":function(t,e,r){"use strict";var a=r("760b"),o=r.n(a);o.a}}]);
//# sourceMappingURL=chunk-01519d94.60f251df.js.map
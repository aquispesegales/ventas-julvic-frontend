import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import clientes from '@/modulos/ventas_inventario/store/modules/clientes.module.js';
import categorias from '@/modulos/ventas_inventario/store/modules/categorias.module.js';

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules:{
        clientes,categorias,
    }
  })
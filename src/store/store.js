import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import utils from '@/modulos/ventas_inventario/store/modules/utils.module.js';


export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules:{
        utils
    }
  })
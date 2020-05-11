import types from "@/modulos/ventas_inventario/store/types/utils";
import Vue from 'vue'
const state = {
    carrito:[],
    tituloNav:''
};

const getters = {
    [types.getters.getCarrito]: state => {
        return state.carrito;
    },

}
const actions = {

}
const mutations = {
    [types.mutations.addCarrito]: (state, objCarrito) => {
        state.carrito.push(objCarrito);
    },
    [types.mutations.setCarrito]: (state, lstCarrito) => {
        state.carrito = lstCarrito;
    },


    

    
}

export default {
    state,
    actions,
    getters,
    mutations
  };
  
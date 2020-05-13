import types from "@/modulos/ventas_inventario/store/types/utils";
import Vue from 'vue'
const state = {
    carrito:[],
    tituloNav:'',
    dialogProgress:false
};

const getters = {
    [types.getters.getdialogProgress]: state => {
        return state.dialogProgress;
    },
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
    [types.mutations.setdialogProgress]: (state, dialogProgress) => {
        state.dialogProgress = dialogProgress;
    },


    

    
}

export default {
    state,
    actions,
    getters,
    mutations
  };
  
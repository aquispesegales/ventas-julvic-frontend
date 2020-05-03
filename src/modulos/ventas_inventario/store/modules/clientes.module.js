import types from "@/modulos/ventas_inventario/store/types/clientes";
import Vue from 'vue'
const state = {
    clientes:[],
    cliente:{}
};

const getters = {
    [types.getters.getClientes]: state => {
        return state.clientes;
    },
    [types.getters.getCliente]: state => {
        return state.cliente;
    }
}
const actions = {
    [types.actions.obtenerClientes]:({commit})=>{
        return new Promise ((resolve,reject)=>{
            Vue.axios.get(`obtenerClientes`).then(r=>{
                commit(types.mutations.setClientes, r.data.clientes);
                resolve(r);
            })
        })
    },
    [types.actions.obtenerClientesById]:({commit},id_cliente)=>{
        return new Promise ((resolve,reject)=>{
            Vue.axios.get(`/obtenerCliente/${id_cliente}`).then(r=>{
                commit(types.mutations.setCliente, r.data.cliente);
                resolve(r);
            })
        })
    },

    
}
const mutations = {
    [types.mutations.setClientes]: (state, lstClientes) => {
        state.clientes = lstClientes;
    },
    [types.mutations.setCliente]: (state, objCliente) => {
        state.cliente = objCliente;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
  };
  
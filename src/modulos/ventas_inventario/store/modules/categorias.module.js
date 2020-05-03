import types from "@/modulos/ventas_inventario/store/types/categorias";
import Vue from 'vue';
const state = {
    categorias:[],
};

const getters = {
    [types.getters.getCategorias]: state => {
        return state.categorias;
    }
}
const actions = {
    [types.actions.obtenerCategorias]:({commit})=>{
        return new Promise ((resolve,reject)=>{
            Vue.axios.get(`categoria/obtener-todos`).then(r=>{
                commit(types.mutations.setCategorias, r.data.categorias);
                resolve(r);
            })
        })
    }
}
const mutations = {
    [types.mutations.setCategorias]: (state, lstCategorias) => {
        state.categorias = lstCategorias;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
  };
  
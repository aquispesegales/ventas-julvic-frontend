import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
const instance = axios.create({
        baseURL: process.env.VUE_APP_API_VENTAS
    });

Vue.use(VueAxios, instance)
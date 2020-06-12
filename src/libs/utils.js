export default {
  install(Vue) {
    const mensaje = {
      Mensaje(icon,mensaje) {
        Vue.prototype.$swal({
            icon: icon,
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
          });
      }
    }
    Vue.prototype.$mensaje = mensaje;
  }
}
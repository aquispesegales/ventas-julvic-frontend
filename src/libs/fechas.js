import moment from 'moment';
export default {
  install(Vue) {
    const fechas = {
      FormatearFechaParaLocal(pFecha) {
        if (pFecha != null && pFecha != '')
          return moment(pFecha, 'YYYY-MM-DDTHH:mm:ssZ').format('DD/MM/YYYY HH:mm');
        return ''
      },
      FormatearFechaParaRest(pFecha) {
        if (pFecha != null && pFecha != '')
          return moment(pFecha, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm:ssZ');
        return ''
        
      },
      FormatearDDMMYYYY(pFecha) {
        if (pFecha != null && pFecha != '')
          return moment(pFecha, 'YYYY-MM-DDTHH:mm:ssZ').format('DD/MM/YYYY');
        return ''
      }

    }
    Vue.prototype.$fechas = fechas;
  }
}
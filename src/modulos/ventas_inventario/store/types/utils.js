import namespace from '@/store/namespace'
export default namespace('utils',{
    getters:[
        'getCarrito',
        'getdialogProgress',
        'getObjDatosUsuario'
    ],
    actions:[
    ],
    mutations:[
        'addCarrito',
        'setCarrito',
        'setdialogProgress',
        'setObjDatosUsuario'
    ]
})
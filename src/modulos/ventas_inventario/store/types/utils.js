import namespace from '@/store/namespace'
export default namespace('utils',{
    getters:[
        'getCarrito',
        'getdialogProgress'
    ],
    actions:[
    ],
    mutations:[
        'addCarrito',
        'setCarrito',
        'setdialogProgress'
    ]
})
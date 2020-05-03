import namespace from '@/store/namespace'
export default namespace('categorias',{
    getters:[
        'getCategorias'
    ],
    actions:[
        'obtenerCategorias',
    ],
    mutations:[
        'setCategorias'
    ]
})
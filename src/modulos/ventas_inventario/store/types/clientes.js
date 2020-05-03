import namespace from '@/store/namespace'
export default namespace('clientes',{
    getters:[
        'getClientes',
        'getCliente'
    ],
    actions:[
        'obtenerClientes',
        'obtenerClientesById'
    ],
    mutations:[
        'setClientes',
        'setCliente'
    ]
})
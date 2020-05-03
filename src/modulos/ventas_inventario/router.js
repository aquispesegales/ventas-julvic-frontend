export default [
    {
        path: '/categoria',
        name:'Categorias',
        component: () => import('@/modulos/ventas_inventario/views/categoria.vue')
    },
    {
        path: '/cliente',
        name:'Clientes',
        component: () => import('@/modulos/ventas_inventario/views/cliente.vue')
    },
    {
        path: '/producto',
        name:'Productos',
        component: () => import('@/modulos/ventas_inventario/views/producto.vue')
    }
  ]
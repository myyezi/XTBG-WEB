const index = [
    {
        path: '/adm/admstock',
        name: 'admstock',
        component: () => import('@/views/adm/admstock/list'),
        meta: {icon: 'auth3', title: '库存管理'},
    },
    {
        path: '/adm/admstock/add',
        name: 'admstockAdd',
        hidden: true,
        component: () => import('@/views/adm/admstock/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admstock/edit',
        name: 'admstockEdit',
        hidden: true,
        component: () => import('@/views/adm/admstock/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admstock/detail/:id',
        name: 'admstockDetail',
        hidden: true,
        component: () => import('@/views/adm/admstock/detail'),
        meta: {title: '查看'}
    }
];

export default index

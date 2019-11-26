const index = [
    {
        path: '/adm/admstockout',
        name: 'admstockout',
        component: () => import('@/views/adm/admstockout/list'),
        meta: {icon: 'auth3', title: '出库管理'},
    },
    {
        path: '/adm/admstockout/add',
        name: 'admstockoutAdd',
        hidden: true,
        component: () => import('@/views/adm/admstockout/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admstockout/edit',
        name: 'admstockoutEdit',
        hidden: true,
        component: () => import('@/views/adm/admstockout/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admstockout/detail/:id',
        name: 'admstockoutDetail',
        hidden: true,
        component: () => import('@/views/adm/admstockout/detail'),
        meta: {title: '查看'}
    }
];

export default index

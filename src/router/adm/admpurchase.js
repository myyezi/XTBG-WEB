const index = [
    {
        path: '/adm/admpurchase',
        name: 'admpurchase',
        component: () => import('@/views/adm/admpurchase/list'),
        meta: {icon: 'auth3', title: '采购管理'},
    },
    {
        path: '/adm/admpurchase/add',
        name: 'admpurchaseAdd',
        hidden: true,
        component: () => import('@/views/adm/admpurchase/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admpurchase/edit',
        name: 'admpurchaseEdit',
        hidden: true,
        component: () => import('@/views/adm/admpurchase/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admpurchase/detail/:id',
        name: 'admpurchaseDetail',
        hidden: true,
        component: () => import('@/views/adm/admpurchase/detail'),
        meta: {title: '查看'}
    }
];

export default index

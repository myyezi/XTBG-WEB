const index = [
    {
        path: '/adm/admsupplier',
        name: 'admsupplier',
        component: () => import('@/views/adm/admsupplier/list'),
        meta: {icon: 'auth3', title: '供应商管理'},
    },
    {
        path: '/adm/admsupplier/add',
        name: 'admsupplierAdd',
        hidden: true,
        component: () => import('@/views/adm/admsupplier/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admsupplier/edit',
        name: 'admsupplierEdit',
        hidden: true,
        component: () => import('@/views/adm/admsupplier/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admsupplier/detail/:id',
        name: 'admsupplierDetail',
        hidden: true,
        component: () => import('@/views/adm/admsupplier/detail'),
        meta: {title: '查看'}
    }
];

export default index

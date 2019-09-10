const index = [
    {
        path: '/finance/financeinvoice',
        name: 'financeinvoice',
        component: () => import('@/views/finance/financeinvoice/list'),
        meta: {icon: 'auth3', title: '发票管理'},
    },
    {
        path: '/finance/financeinvoice/add',
        name: 'financeinvoiceAdd',
        hidden: true,
        component: () => import('@/views/finance/financeinvoice/add'),
        meta: {title: '添加'},
    },
    {
        path: '/finance/financeinvoice/edit',
        name: 'financeinvoiceEdit',
        hidden: true,
        component: () => import('@/views/finance/financeinvoice/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/finance/financeinvoice/detail/:id',
        name: 'financeinvoiceDetail',
        hidden: true,
        component: () => import('@/views/finance/financeinvoice/detail'),
        meta: {title: '查看'}
    }
];

export default index

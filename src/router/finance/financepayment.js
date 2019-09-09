const index = [
    {
        path: '/finance/financepayment',
        name: 'financepayment',
        component: () => import('@/views/finance/financepayment/list'),
        meta: {icon: 'auth3', title: '付款申请'},
    },
    {
        path: '/finance/financepayment/add',
        name: 'financepaymentAdd',
        hidden: true,
        component: () => import('@/views/finance/financepayment/add'),
        meta: {title: '添加'},
    },
    {
        path: '/finance/financepayment/edit',
        name: 'financepaymentEdit',
        hidden: true,
        component: () => import('@/views/finance/financepayment/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/finance/financepayment/detail/:id',
        name: 'financepaymentDetail',
        hidden: true,
        component: () => import('@/views/finance/financepayment/detail'),
        meta: {title: '查看'}
    }
];

export default index

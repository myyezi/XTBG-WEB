const index = [
    {
        path: '/finance/financetravel',
        name: 'financetravel',
        component: () => import('@/views/finance/financetravel/list'),
        meta: {icon: 'auth3', title: '差旅费'},
    },
    {
        path: '/finance/financetravel/add',
        name: 'financetravelAdd',
        hidden: true,
        component: () => import('@/views/finance/financetravel/add'),
        meta: {title: '添加'},
    },
    {
        path: '/finance/financetravel/edit',
        name: 'financetravelEdit',
        hidden: true,
        component: () => import('@/views/finance/financetravel/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/finance/financetravel/detail/:id',
        name: 'financetravelDetail',
        hidden: true,
        component: () => import('@/views/finance/financetravel/detail'),
        meta: {title: '查看'}
    }
];

export default index

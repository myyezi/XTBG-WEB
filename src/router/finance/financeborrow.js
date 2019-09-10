const index = [
    {
        path: '/finance/financeborrow',
        name: 'financeborrow',
        component: () => import('@/views/finance/financeborrow/list'),
        meta: {icon: 'auth3', title: '借支申请'},
    },
    {
        path: '/finance/financeborrow/add',
        name: 'financeborrowAdd',
        hidden: true,
        component: () => import('@/views/finance/financeborrow/add'),
        meta: {title: '添加'},
    },
    {
        path: '/finance/financeborrow/edit',
        name: 'financeborrowEdit',
        hidden: true,
        component: () => import('@/views/finance/financeborrow/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/finance/financeborrow/detail/:id',
        name: 'financeborrowDetail',
        hidden: true,
        component: () => import('@/views/finance/financeborrow/detail'),
        meta: {title: '查看'}
    }
];

export default index

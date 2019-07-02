const index = [
    {
        path: '/safe/risk',
        name: 'risk',
        component: () => import('@/views/qsm/safe/risk/list'),
        meta: {icon: 'auth3', title: '安全风险库'},
    },
    {
        path: '/safe/risk/add',
        name: 'riskAdd',
        hidden: true,
        component: () => import('@/views/qsm/safe/risk/add'),
        meta: {title: '添加'},
    },
    {
        path: '/safe/risk/edit',
        name: 'riskEdit',
        hidden: true,
        component: () => import('@/views/qsm/safe/risk/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/safe/risk/detail/:id',
        name: 'riskDetail',
        hidden: true,
        component: () => import('@/views/qsm/safe/risk/detail'),
        meta: {title: '查看'}
    }
];

export default index

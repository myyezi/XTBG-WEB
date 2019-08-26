const index = [
    {
        path: '/safe/warn',
        name: 'warn',
        component: () => import('@/views/qsm/safe/warn/list'),
        meta: {icon: 'auth3', title: '安全风险预警通知单'},
    },
    {
        path: '/safe/warn/add',
        name: 'warnAdd',
        hidden: true,
        component: () => import('@/views/qsm/safe/warn/add'),
        meta: {title: '添加'},
    },
    {
        path: '/safe/warn/edit',
        name: 'warnEdit',
        hidden: true,
        component: () => import('@/views/qsm/safe/warn/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/safe/warn/detail/:id',
        name: 'warnDetail',
        hidden: true,
        component: () => import('@/views/qsm/safe/warn/detail'),
        meta: {title: '查看'}
    }
];

export default index

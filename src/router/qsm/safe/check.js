const index = [
    {
        path: '/safe/check',
        name: 'check',
        component: () => import('@/views/qsm/safe/check/list'),
        meta: {icon: 'auth3', title: '安全检查问题通知单'},
    },
    {
        path: '/safe/check/add',
        name: 'checkAdd',
        hidden: true,
        component: () => import('@/views/qsm/safe/check/add'),
        meta: {title: '添加'},
    },
    {
        path: '/safe/check/edit',
        name: 'checkEdit',
        hidden: true,
        component: () => import('@/views/qsm/safe/check/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/safe/check/detail/:id',
        name: 'checkDetail',
        hidden: true,
        component: () => import('@/views/qsm/safe/check/detail'),
        meta: {title: '查看'}
    }
];

export default index

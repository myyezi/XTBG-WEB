const index = [
    {
        path: '/quality/check',
        name: 'check',
        component: () => import('@/views/qsm/quality/check/list'),
        meta: {icon: 'auth3', title: '质量检查问题通知单'},
    },
    {
        path: '/quality/check/add',
        name: 'checkAdd',
        hidden: true,
        component: () => import('@/views/qsm/quality/check/add'),
        meta: {title: '添加'},
    },
    {
        path: '/quality/check/edit',
        name: 'checkEdit',
        hidden: true,
        component: () => import('@/views/qsm/quality/check/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/quality/check/detail/:id',
        name: 'checkDetail',
        hidden: true,
        component: () => import('@/views/qsm/quality/check/detail'),
        meta: {title: '查看'}
    }
];

export default index

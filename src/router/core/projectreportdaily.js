const index = [
    {
        path: '/core/projectreportdaily',
        name: 'projectreportdaily',
        component: () => import('@/views/core/projectreportdaily/list'),
        meta: {icon: 'auth3', title: '项目工程日报'},
    },
    {
        path: '/core/projectreportdaily/add',
        name: 'projectreportdailyAdd',
        hidden: true,
        component: () => import('@/views/core/projectreportdaily/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectreportdaily/edit',
        name: 'projectreportdailyEdit',
        hidden: true,
        component: () => import('@/views/core/projectreportdaily/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectreportdaily/detail/:id',
        name: 'projectreportdailyDetail',
        hidden: true,
        component: () => import('@/views/core/projectreportdaily/detail'),
        meta: {title: '查看'}
    }
];

export default index

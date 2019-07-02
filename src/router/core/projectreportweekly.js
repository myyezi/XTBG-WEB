const index = [
    {
        path: '/core/projectreportweekly',
        name: 'projectreportweekly',
        component: () => import('@/views/core/projectreportweekly/list'),
        meta: {icon: 'auth3', title: '项目工程周报'},
    },
    {
        path: '/core/projectreportweekly/add',
        name: 'projectreportweeklyAdd',
        hidden: true,
        component: () => import('@/views/core/projectreportweekly/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectreportweekly/edit',
        name: 'projectreportweeklyEdit',
        hidden: true,
        component: () => import('@/views/core/projectreportweekly/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectreportweekly/detail/:id',
        name: 'projectreportweeklyDetail',
        hidden: true,
        component: () => import('@/views/core/projectreportweekly/detail'),
        meta: {title: '查看'}
    }
];

export default index

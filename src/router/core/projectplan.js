const index = [
    {
        path: '/core/projectplan',
        name: 'projectplan',
        component: () => import('@/views/core/projectplan/list'),
        meta: {icon: 'auth3', title: '项目计划'},
    },
    {
        path: '/core/projectplan/add',
        name: 'projectplanAdd',
        hidden: true,
        component: () => import('@/views/core/projectplan/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectplan/edit',
        name: 'projectplanEdit',
        hidden: true,
        component: () => import('@/views/core/projectplan/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectplan/detail/:id',
        name: 'projectplanDetail',
        hidden: true,
        component: () => import('@/views/core/projectplan/detail'),
        meta: {title: '查看'}
    }
];

export default index

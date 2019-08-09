const index = [
    {
        path: '/power/powerprojecttask',
        name: 'powerprojecttask',
        component: () => import('@/views/power/powerprojecttask/list'),
        meta: {icon: 'auth3', title: '项目任务书'},
    },
    {
        path: '/power/powerprojecttask/add',
        name: 'powerprojecttaskAdd',
        hidden: true,
        component: () => import('@/views/power/powerprojecttask/add'),
        meta: {title: '添加'},
    },
    {
        path: '/power/powerprojecttask/edit',
        name: 'powerprojecttaskEdit',
        hidden: true,
        component: () => import('@/views/power/powerprojecttask/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/power/powerprojecttask/detail/:id',
        name: 'powerprojecttaskDetail',
        hidden: true,
        component: () => import('@/views/power/powerprojecttask/detail'),
        meta: {title: '查看'}
    }
];

export default index

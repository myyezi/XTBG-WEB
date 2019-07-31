const index = [
    {
        path: '/project/powerprojecttask',
        name: 'powerprojecttask',
        component: () => import('@/views/project/powerprojecttask/list'),
        meta: {icon: 'auth3', title: '项目任务书'},
    },
    {
        path: '/project/powerprojecttask/add',
        name: 'powerprojecttaskAdd',
        hidden: true,
        component: () => import('@/views/project/powerprojecttask/add'),
        meta: {title: '添加'},
    },
    {
        path: '/project/powerprojecttask/edit',
        name: 'powerprojecttaskEdit',
        hidden: true,
        component: () => import('@/views/project/powerprojecttask/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/project/powerprojecttask/detail/:id',
        name: 'powerprojecttaskDetail',
        hidden: true,
        component: () => import('@/views/project/powerprojecttask/detail'),
        meta: {title: '查看'}
    }
];

export default index

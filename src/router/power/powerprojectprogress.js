const index = [
    {
        path: '/power/powerprojectprogress',
        name: 'powerprojectplan',
        component: () => import('@/views/power/powerprojectprogress/list'),
        meta: {icon: 'auth3', title: '项目执行'},
    },
    {
        path: '/power/powerprojectprogress/add',
        name: 'powerprojectprogressAdd',
        hidden: true,
        component: () => import('@/views/power/powerprojectprogress/add'),
        meta: {title: '添加'},
    },
    {
        path: '/power/powerprojectprogress/edit',
        name: 'powerprojectprogressEdit',
        hidden: true,
        component: () => import('@/views/power/powerprojectprogress/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/power/powerprojectprogress/detail/:id',
        name: 'powerprojectprogressDetail',
        hidden: true,
        component: () => import('@/views/power/powerprojectprogress/detail'),
        meta: {title: '查看'}
    }
];

export default index

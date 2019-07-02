const index = [
    {
        path: '/core/project',
        name: 'project',
        component: () => import('@/views/core/project/list'),
        meta: {icon: 'auth3', title: '项目信息表'},
    },
    {
        path: '/core/project/add',
        name: 'projectAdd',
        hidden: true,
        component: () => import('@/views/core/project/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/project/edit',
        name: 'projectEdit',
        hidden: true,
        component: () => import('@/views/core/project/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/project/detail/:id',
        name: 'projectDetail',
        hidden: true,
        component: () => import('@/views/core/project/detail'),
        meta: {title: '查看'}
    }
];

export default index

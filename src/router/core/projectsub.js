const index = [
    {
        path: '/core/projectsub',
        name: 'projectsub',
        component: () => import('@/views/core/projectsub/list'),
        meta: {icon: 'auth3', title: '项目子表'},
    },
    {
        path: '/core/projectsub/add',
        name: 'projectsubAdd',
        hidden: true,
        component: () => import('@/views/core/projectsub/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectsub/edit',
        name: 'projectsubEdit',
        hidden: true,
        component: () => import('@/views/core/projectsub/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectsub/detail/:id',
        name: 'projectsubDetail',
        hidden: true,
        component: () => import('@/views/core/projectsub/detail'),
        meta: {title: '查看'}
    }
];

export default index

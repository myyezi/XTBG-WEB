const index = [
    {
        path: '/archive/project',
        name: 'project',
        component: () => import('@/views/archive/project/list'),
        meta: {icon: 'auth3', title: '评价管理'},
    },
    {
        path: '/archive/project/add',
        name: 'projectAdd',
        hidden: true,
        component: () => import('@/views/archive/project/add'),
        meta: {title: '添加'},
    },
    {
        path: '/archive/project/edit',
        name: 'projectEdit',
        hidden: true,
        component: () => import('@/views/archive/project/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/archive/project/detail/:id',
        name: 'projectDetail',
        hidden: true,
        component: () => import('@/views/archive/project/detail'),
        meta: {title: '查看'}
    }
];

export default index

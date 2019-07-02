const index = [
    {
        path: '/core/projectbigevent',
        name: 'projectbigevent',
        component: () => import('@/views/core/projectbigevent/list'),
        meta: {icon: 'auth3', title: '大事记'},
    },
    {
        path: '/core/projectbigevent/add',
        name: 'projectbigeventAdd',
        hidden: true,
        component: () => import('@/views/core/projectbigevent/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectbigevent/edit',
        name: 'projectbigeventEdit',
        hidden: true,
        component: () => import('@/views/core/projectbigevent/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectbigevent/detail/:id',
        name: 'projectbigeventDetail',
        hidden: true,
        component: () => import('@/views/core/projectbigevent/detail'),
        meta: {title: '查看'}
    }
];

export default index

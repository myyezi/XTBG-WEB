const index = [
    {
        path: '/core/projectcompany',
        name: 'projectcompany',
        component: () => import('@/views/core/projectcompany/list'),
        meta: {icon: 'auth3', title: '项目参建单位表'},
    },
    {
        path: '/core/projectcompany/add',
        name: 'projectcompanyAdd',
        hidden: true,
        component: () => import('@/views/core/projectcompany/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectcompany/edit',
        name: 'projectcompanyEdit',
        hidden: true,
        component: () => import('@/views/core/projectcompany/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectcompany/detail/:id',
        name: 'projectcompanyDetail',
        hidden: true,
        component: () => import('@/views/core/projectcompany/detail'),
        meta: {title: '查看'}
    }
];

export default index

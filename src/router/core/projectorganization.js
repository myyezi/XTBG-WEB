const index = [
    {
        path: '/core/projectorganization',
        name: 'projectorganization',
        component: () => import('@/views/core/projectorganization/list'),
        meta: {icon: 'auth3', title: '项目参建单位表'},
    },
    {
        path: '/core/projectorganization/add',
        name: 'projectorganizationAdd',
        hidden: true,
        component: () => import('@/views/core/projectorganization/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectorganization/edit',
        name: 'projectorganizationEdit',
        hidden: true,
        component: () => import('@/views/core/projectorganization/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectorganization/detail/:id',
        name: 'projectorganizationDetail',
        hidden: true,
        component: () => import('@/views/core/projectorganization/detail'),
        meta: {title: '查看'}
    }
];

export default index

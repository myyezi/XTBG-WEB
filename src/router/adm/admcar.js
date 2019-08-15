const index = [
    {
        path: '/adm/admcar',
        name: 'admcar',
        component: () => import('@/views/adm/admcar/list'),
        meta: {icon: 'auth3', title: '用车管理'},
    },
    {
        path: '/adm/admcar/add',
        name: 'admcarAdd',
        hidden: true,
        component: () => import('@/views/adm/admcar/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admcar/edit',
        name: 'admcarEdit',
        hidden: true,
        component: () => import('@/views/adm/admcar/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admcar/detail/:id',
        name: 'admcarDetail',
        hidden: true,
        component: () => import('@/views/adm/admcar/detail'),
        meta: {title: '查看'}
    }
];

export default index

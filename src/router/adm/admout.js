const index = [
    {
        path: '/adm/admout',
        name: 'admout',
        component: () => import('@/views/adm/admout/list'),
        meta: {icon: 'auth3', title: '外出管理'},
    },
    {
        path: '/adm/admout/add',
        name: 'admoutAdd',
        hidden: true,
        component: () => import('@/views/adm/admout/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admout/edit',
        name: 'admoutEdit',
        hidden: true,
        component: () => import('@/views/adm/admout/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admout/detail/:id',
        name: 'admoutDetail',
        hidden: true,
        component: () => import('@/views/adm/admout/detail'),
        meta: {title: '查看'}
    }
];

export default index

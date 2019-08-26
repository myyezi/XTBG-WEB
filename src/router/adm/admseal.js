const index = [
    {
        path: '/adm/admseal',
        name: 'admseal',
        component: () => import('@/views/adm/admseal/list'),
        meta: {icon: 'auth3', title: '用印管理'},
    },
    {
        path: '/adm/admseal/add',
        name: 'admsealAdd',
        hidden: true,
        component: () => import('@/views/adm/admseal/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admseal/edit',
        name: 'admsealEdit',
        hidden: true,
        component: () => import('@/views/adm/admseal/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admseal/detail/:id',
        name: 'admsealDetail',
        hidden: true,
        component: () => import('@/views/adm/admseal/detail'),
        meta: {title: '查看'}
    }
];

export default index

const index = [
    {
        path: '/adm/admleave',
        name: 'admleave',
        component: () => import('@/views/adm/admleave/list'),
        meta: {icon: 'auth3', title: '请假管理'},
    },
    {
        path: '/adm/admleave/add',
        name: 'admleaveAdd',
        hidden: true,
        component: () => import('@/views/adm/admleave/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admleave/edit',
        name: 'admleaveEdit',
        hidden: true,
        component: () => import('@/views/adm/admleave/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admleave/detail/:id',
        name: 'admleaveDetail',
        hidden: true,
        component: () => import('@/views/adm/admleave/detail'),
        meta: {title: '查看'}
    }
];

export default index

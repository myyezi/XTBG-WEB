const index = [
    {
        path: '/adm/admstockin',
        name: 'admstockin',
        component: () => import('@/views/adm/admstockin/list'),
        meta: {icon: 'auth3', title: '入库管理'},
    },
    {
        path: '/adm/admstockin/add',
        name: 'admstockinAdd',
        hidden: true,
        component: () => import('@/views/adm/admstockin/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admstockin/edit',
        name: 'admstockinEdit',
        hidden: true,
        component: () => import('@/views/adm/admstockin/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admstockin/detail/:id',
        name: 'admstockinDetail',
        hidden: true,
        component: () => import('@/views/adm/admstockin/detail'),
        meta: {title: '查看'}
    }
];

export default index

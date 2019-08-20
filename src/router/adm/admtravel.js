const index = [
    {
        path: '/adm/admtravel',
        name: 'admtravel',
        component: () => import('@/views/adm/admtravel/list'),
        meta: {icon: 'auth3', title: '出差管理'},
    },
    {
        path: '/adm/admtravel/add',
        name: 'admtravelAdd',
        hidden: true,
        component: () => import('@/views/adm/admtravel/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admtravel/edit',
        name: 'admtravelEdit',
        hidden: true,
        component: () => import('@/views/adm/admtravel/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admtravel/detail/:id',
        name: 'admtravelDetail',
        hidden: true,
        component: () => import('@/views/adm/admtravel/detail'),
        meta: {title: '查看'}
    }
];

export default index

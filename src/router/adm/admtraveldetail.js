const index = [
    {
        path: '/adm/admtraveldetail',
        name: 'admtraveldetail',
        component: () => import('@/views/adm/admtraveldetail/list'),
        meta: {icon: 'auth3', title: '出差明细'},
    },
    {
        path: '/adm/admtraveldetail/add',
        name: 'admtraveldetailAdd',
        hidden: true,
        component: () => import('@/views/adm/admtraveldetail/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admtraveldetail/edit',
        name: 'admtraveldetailEdit',
        hidden: true,
        component: () => import('@/views/adm/admtraveldetail/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admtraveldetail/detail/:id',
        name: 'admtraveldetailDetail',
        hidden: true,
        component: () => import('@/views/adm/admtraveldetail/detail'),
        meta: {title: '查看'}
    }
];

export default index

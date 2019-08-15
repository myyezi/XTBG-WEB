const index = [
    {
        path: '/adm/admsealdetail',
        name: 'admsealdetail',
        component: () => import('@/views/adm/admsealdetail/list'),
        meta: {icon: 'auth3', title: '用印明细'},
    },
    {
        path: '/adm/admsealdetail/add',
        name: 'admsealdetailAdd',
        hidden: true,
        component: () => import('@/views/adm/admsealdetail/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admsealdetail/edit',
        name: 'admsealdetailEdit',
        hidden: true,
        component: () => import('@/views/adm/admsealdetail/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admsealdetail/detail/:id',
        name: 'admsealdetailDetail',
        hidden: true,
        component: () => import('@/views/adm/admsealdetail/detail'),
        meta: {title: '查看'}
    }
];

export default index

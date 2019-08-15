const index = [
    {
        path: '/adm/admcontract',
        name: 'admcontract',
        component: () => import('@/views/adm/admcontract/list'),
        meta: {icon: 'auth3', title: '合同管理'},
    },
    {
        path: '/adm/admcontract/add',
        name: 'admcontractAdd',
        hidden: true,
        component: () => import('@/views/adm/admcontract/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admcontract/edit',
        name: 'admcontractEdit',
        hidden: true,
        component: () => import('@/views/adm/admcontract/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admcontract/detail/:id',
        name: 'admcontractDetail',
        hidden: true,
        component: () => import('@/views/adm/admcontract/detail'),
        meta: {title: '查看'}
    }
];

export default index

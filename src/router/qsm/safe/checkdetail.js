const index = [
    {
        path: '/qsm/checkdetail',
        name: 'checkdetail',
        component: () => import('@/views/qsm/checkdetail/list'),
        meta: {icon: 'auth3', title: '安全检查问题明细'},
    },
    {
        path: '/qsm/checkdetail/add',
        name: 'checkdetailAdd',
        hidden: true,
        component: () => import('@/views/qsm/checkdetail/add'),
        meta: {title: '添加'},
    },
    {
        path: '/qsm/checkdetail/edit',
        name: 'checkdetailEdit',
        hidden: true,
        component: () => import('@/views/qsm/checkdetail/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/qsm/checkdetail/detail/:id',
        name: 'checkdetailDetail',
        hidden: true,
        component: () => import('@/views/qsm/checkdetail/detail'),
        meta: {title: '查看'}
    }
];

export default index

const index = [
    {
        path: '/qsm/checkrectifydetail',
        name: 'checkrectifydetail',
        component: () => import('@/views/qsm/checkrectifydetail/list'),
        meta: {icon: 'auth3', title: '安全检查整改单明细'},
    },
    {
        path: '/qsm/checkrectifydetail/add',
        name: 'checkrectifydetailAdd',
        hidden: true,
        component: () => import('@/views/qsm/checkrectifydetail/add'),
        meta: {title: '添加'},
    },
    {
        path: '/qsm/checkrectifydetail/edit',
        name: 'checkrectifydetailEdit',
        hidden: true,
        component: () => import('@/views/qsm/checkrectifydetail/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/qsm/checkrectifydetail/detail/:id',
        name: 'checkrectifydetailDetail',
        hidden: true,
        component: () => import('@/views/qsm/checkrectifydetail/detail'),
        meta: {title: '查看'}
    }
];

export default index

const index = [
    {
        path: '/generator/coreprojectevaluatedetail/:type',
        name: 'coreprojectevaluatedetail',
        component: () => import('@/views/generator/coreprojectevaluatedetail/list'),
        meta: {icon: 'auth3', title: '项目部综合评价明细'},
    },
    {
        path: '/generator/coreprojectevaluatedetail/add',
        name: 'coreprojectevaluatedetailAdd',
        hidden: true,
        component: () => import('@/views/generator/coreprojectevaluatedetail/add'),
        meta: {title: '添加'},
    },
    {
        path: '/generator/coreprojectevaluatedetail/edit',
        name: 'coreprojectevaluatedetailEdit',
        hidden: true,
        component: () => import('@/views/generator/coreprojectevaluatedetail/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/generator/coreprojectevaluatedetail/detail/:id',
        name: 'coreprojectevaluatedetailDetail',
        hidden: true,
        component: () => import('@/views/generator/coreprojectevaluatedetail/detail'),
        meta: {title: '查看'}
    }
];

export default index

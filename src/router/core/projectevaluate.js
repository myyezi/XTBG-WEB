const index = [
    {
        path: '/core/projectevaluatePro',
        name: 'projectevaluatePro',
        component: () => import('@/views/core/projectevaluate/list'),
        meta: {icon: 'auth3', title: '业主部综合评价'},
    },
    {
        path: '/core/projectevaluateSup',
        name: 'projectevaluateSup',
        component: () => import('@/views/core/projectevaluate/list'),
        meta: {icon: 'auth3', title: '监理部综合评价'},
    },
    {
        path: '/core/projectevaluateCon',
        name: 'projectevaluateCon',
        component: () => import('@/views/core/projectevaluate/list'),
        meta: {icon: 'auth3', title: '施工部综合评价'},
    },
    {
        path: '/core/projectevaluate/add',
        name: 'projectevaluateAdd',
        hidden: true,
        component: () => import('@/views/core/projectevaluate/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectevaluatePro/edit',
        name: 'projectevaluateEditPro',
        hidden: true,
        component: () => import('@/views/core/projectevaluate/edit'),
        meta: {title: '业主部综合评价编辑'}
    },
    {
        path: '/core/projectevaluateCon/edit',
        name: 'projectevaluateEditCon',
        hidden: true,
        component: () => import('@/views/core/projectevaluate/edit'),
        meta: {title: '施工部综合评价编辑'}
    },
    {
        path: '/core/projectevaluateSup/edit',
        name: 'projectevaluateEditSup',
        hidden: true,
        component: () => import('@/views/core/projectevaluate/edit'),
        meta: {title: '监理部综合评价编辑'}
    },
    {
        path: '/core/projectevaluate/detail/:id',
        name: 'projectevaluateDetail',
        hidden: true,
        component: () => import('@/views/core/projectevaluate/detail'),
        meta: {title: '查看'}
    }
];

export default index

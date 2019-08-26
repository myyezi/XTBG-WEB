const index = [
    {
        path: '/core/projectevaluatetemplate',
        name: 'projectevaluatetemplate',
        component: () => import('@/views/core/projectevaluatetemplate/list'),
        meta: {icon: 'auth3', title: '项目评价管理模板'},
    },
    {
        path: '/core/projectevaluatetemplate/editTemplent/add',
        name: 'projectevaluatetemplateAdd',
        hidden: true,
        component: () => import('@/views/core/projectevaluatetemplate/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectevaluatetemplate/editTemplent/edit',
        name: 'projectevaluatetemplateEdit',
        hidden: true,
        component: () => import('@/views/core/projectevaluatetemplate/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectevaluatetemplate/detail/:id',
        name: 'projectevaluatetemplateDetail',
        hidden: true,
        component: () => import('@/views/core/projectevaluatetemplate/detail'),
        meta: {title: '查看'}
    },
    {
        path: '/core/projectevaluatetemplate/editTemplent',
        name: 'projectevaluatetemplateEditTemplent',
        hidden: true,
        component: () => import('@/views/core/projectevaluatetemplate/editTemplent'),
        meta: {title: '编辑模板'}
    }
];

export default index

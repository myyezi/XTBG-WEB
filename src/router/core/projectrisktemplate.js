const index = [
    {
        path: '/core/projectrisktemplate',
        name: 'projectrisktemplate',
        component: () => import('@/views/core/projectrisktemplate/list'),
        meta: {icon: 'auth3', title: '项目计划风险清册模板'},
    },
    {
        path: '/core/projectrisktemplate/add',
        name: 'projectrisktemplateAdd',
        hidden: true,
        component: () => import('@/views/core/projectrisktemplate/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectrisktemplate/edit',
        name: 'projectrisktemplateEdit',
        hidden: true,
        component: () => import('@/views/core/projectrisktemplate/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectrisktemplate/detail/:id',
        name: 'projectrisktemplateDetail',
        hidden: true,
        component: () => import('@/views/core/projectrisktemplate/detail'),
        meta: {title: '查看'}
    }
];

export default index

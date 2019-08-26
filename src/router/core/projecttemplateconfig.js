const index = [
    {
        path: '/core/projecttemplateconfig',
        name: 'projecttemplateconfig',
        component: () => import('@/views/core/projecttemplateconfig/list'),
        meta: {icon: 'auth3', title: '项目计划模板设置'},
    },
    {
        path: '/core/projecttemplateconfig/add',
        name: 'projecttemplateconfigAdd',
        hidden: true,
        component: () => import('@/views/core/projecttemplateconfig/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projecttemplateconfig/edit',
        name: 'projecttemplateconfigEdit',
        hidden: true,
        component: () => import('@/views/core/projecttemplateconfig/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projecttemplateconfig/detail/:id',
        name: 'projecttemplateconfigDetail',
        hidden: true,
        component: () => import('@/views/core/projecttemplateconfig/detail'),
        meta: {title: '查看'}
    }
];

export default index

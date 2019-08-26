const index = [
    {
        path: '/power/powerprojecttemplate',
        name: 'powerprojecttemplate',
        component: () => import('@/views/power/powerprojecttemplate/list'),
        meta: {icon: 'auth3', title: '项目计划模板'},
    },
    {
        path: '/power/powerprojecttemplateconfig/add',
        name: 'powerprojecttemplateconfigAdd',
        hidden: true,
        component: () => import('@/views/power/powerprojecttemplateconfig/add'),
        meta: {title: '添加'},
    },
    {
        path: '/power/powerprojecttemplateconfig/edit',
        name: 'powerprojecttemplateconfigEdit',
        hidden: true,
        component: () => import('@/views/power/powerprojecttemplateconfig/edit'),
        meta: {title: '编辑模板'}
    },
    {
        path: '/power/powerprojecttemplate/detail/:id',
        name: 'powerprojecttemplateDetail',
        hidden: true,
        component: () => import('@/views/power/powerprojecttemplate/detail'),
        meta: {title: '查看'}
    }
];

export default index

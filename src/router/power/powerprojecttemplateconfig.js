const index = [
    {
        path: '/power/powerprojecttemplateconfig',
        name: 'powerprojecttemplateconfig',
        component: () => import('@/views/power/powerprojecttemplateconfig/list'),
        meta: {icon: 'auth3', title: '项目计划模板设置'},
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
        meta: {title: '编辑'}
    },
    {
        path: '/power/powerprojecttemplateconfig/detail/:id',
        name: 'powerprojecttemplateconfigDetail',
        hidden: true,
        component: () => import('@/views/power/powerprojecttemplateconfig/detail'),
        meta: {title: '查看'}
    },
    {
        path: '/power/powerprojecttemplate',
        name: 'powerprojecttemplate',
        component: () => import('@/views/power/powerprojecttemplate/list'),
        meta: {icon: 'auth3', title: '项目计划模板'},
    },
];

export default index

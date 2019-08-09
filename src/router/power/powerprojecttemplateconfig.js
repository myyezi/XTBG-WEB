const index = [
    {
        path: '/project/powerprojecttemplateconfig',
        name: 'powerprojecttemplateconfig',
        component: () => import('@/views/project/powerprojecttemplateconfig/list'),
        meta: {icon: 'auth3', title: '项目计划模板设置'},
    },
    {
        path: '/project/powerprojecttemplateconfig/add',
        name: 'powerprojecttemplateconfigAdd',
        hidden: true,
        component: () => import('@/views/project/powerprojecttemplateconfig/add'),
        meta: {title: '添加'},
    },
    {
        path: '/project/powerprojecttemplateconfig/edit',
        name: 'powerprojecttemplateconfigEdit',
        hidden: true,
        component: () => import('@/views/project/powerprojecttemplateconfig/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/project/powerprojecttemplateconfig/detail/:id',
        name: 'powerprojecttemplateconfigDetail',
        hidden: true,
        component: () => import('@/views/project/powerprojecttemplateconfig/detail'),
        meta: {title: '查看'}
    }
];

export default index

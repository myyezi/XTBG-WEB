const index = [
    {
        path: '/project/powerprojecttemplate',
        name: 'powerprojecttemplate',
        component: () => import('@/views/project/powerprojecttemplate/list'),
        meta: {icon: 'auth3', title: '项目计划模板'},
    },
    {
        path: '/project/powerprojecttemplate/add',
        name: 'powerprojecttemplateAdd',
        hidden: true,
        component: () => import('@/views/project/powerprojecttemplate/add'),
        meta: {title: '添加'},
    },
    {
        path: '/project/powerprojecttemplate/edit',
        name: 'powerprojecttemplateEdit',
        hidden: true,
        component: () => import('@/views/project/powerprojecttemplate/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/project/powerprojecttemplate/detail/:id',
        name: 'powerprojecttemplateDetail',
        hidden: true,
        component: () => import('@/views/project/powerprojecttemplate/detail'),
        meta: {title: '查看'}
    }
];

export default index

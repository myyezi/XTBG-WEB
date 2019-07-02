const index = [
    {
        path: '/archive/projecttemplate',
        name: 'archiveprojecttemplate',
        component: () => import('@/views/archive/projecttemplate/list'),
        meta: {icon: 'auth3', title: '项目文档模板'},
    },
    {
        path: '/archive/projecttemplate/add',
        name: 'archiveprojecttemplateAdd',
        hidden: true,
        component: () => import('@/views/archive/projecttemplate/add'),
        meta: {title: '添加'},
    },
    {
        path: '/archive/projecttemplate/edit',
        name: 'archiveprojecttemplateEdit',
        hidden: true,
        component: () => import('@/views/archive/projecttemplate/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/archive/projecttemplate/detail/:id',
        name: 'archiveprojecttemplateDetail',
        hidden: true,
        component: () => import('@/views/archive/projecttemplate/detail'),
        meta: {title: '查看'}
    }
];

export default index

const index = [
    {
        path: '/project/powerprojectextension',
        name: 'powerprojectextension',
        component: () => import('@/views/project/powerprojectextension/list'),
        meta: {icon: 'auth3', title: '项目延期'},
    },
    {
        path: '/project/powerprojectextension/add',
        name: 'powerprojectextensionAdd',
        hidden: true,
        component: () => import('@/views/project/powerprojectextension/add'),
        meta: {title: '添加'},
    },
    {
        path: '/project/powerprojectextension/edit',
        name: 'powerprojectextensionEdit',
        hidden: true,
        component: () => import('@/views/project/powerprojectextension/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/project/powerprojectextension/detail/:id',
        name: 'powerprojectextensionDetail',
        hidden: true,
        component: () => import('@/views/project/powerprojectextension/detail'),
        meta: {title: '查看'}
    }
];

export default index

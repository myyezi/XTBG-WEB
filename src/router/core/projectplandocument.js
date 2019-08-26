const index = [
    {
        path: '/core/projectplandocument',
        name: 'projectplandocument',
        component: () => import('@/views/core/projectplandocument/list'),
        meta: {icon: 'auth3', title: '项目计划文档结构'},
    },
    {
        path: '/core/projectplandocument/add',
        name: 'projectplandocumentAdd',
        hidden: true,
        component: () => import('@/views/core/projectplandocument/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectplandocument/edit',
        name: 'projectplandocumentEdit',
        hidden: true,
        component: () => import('@/views/core/projectplandocument/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectplandocument/detail/:id',
        name: 'projectplandocumentDetail',
        hidden: true,
        component: () => import('@/views/core/projectplandocument/detail'),
        meta: {title: '查看'}
    }
];

export default index

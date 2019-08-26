const index = [
    {
        path: '/core/projectarchivetemplate',
        name: 'projectarchivetemplate',
        component: () => import('@/views/core/projectarchivetemplate/list'),
        meta: {icon: 'auth3', title: '项目计划模板文档结构'},
    },
    {
        path: '/core/projectarchivetemplate/add',
        name: 'projectarchivetemplateAdd',
        hidden: true,
        component: () => import('@/views/core/projectarchivetemplate/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectarchivetemplate/edit',
        name: 'projectarchivetemplateEdit',
        hidden: true,
        component: () => import('@/views/core/projectarchivetemplate/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectarchivetemplate/detail/:id',
        name: 'projectarchivetemplateDetail',
        hidden: true,
        component: () => import('@/views/core/projectarchivetemplate/detail'),
        meta: {title: '查看'}
    }
];

export default index

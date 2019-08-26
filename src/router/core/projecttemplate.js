const index = [
    {
        path: '/core/projecttemplate',
        name: 'projecttemplate',
        component: () => import('@/views/core/projecttemplate/list'),
        meta: {icon: 'auth3', title: '项目计划模板'},
    },
    {
        path: '/core/projecttemplate/add',
        name: 'projecttemplateAdd',
        hidden: true,
        component: () => import('@/views/core/projecttemplate/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projecttemplate/edit',
        name: 'projecttemplateEdit',
        hidden: true,
        component: () => import('@/views/core/projecttemplate/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projecttemplate/detail/:id',
        name: 'projecttemplateDetail',
        hidden: true,
        component: () => import('@/views/core/projecttemplate/detail'),
        meta: {title: '查看'}
    },
    {
        path: '/core/projecttemplateconfig/list',
        name: 'projecttemplateconfigList',
        hidden: true,
        component: () => import('@/views/core/projecttemplateconfig/list'),
        meta: {title: '项目计划模板设置'}
    },

];

export default index

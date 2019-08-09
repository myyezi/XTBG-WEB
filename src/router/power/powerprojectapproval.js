const index = [
    {
        path: '/project/powerprojectapproval',
        name: 'powerprojectapproval',
        component: () => import('@/views/project/powerprojectapproval/list'),
        meta: {icon: 'auth3', title: '项目审批'},
    },
    {
        path: '/project/powerprojectapproval/add',
        name: 'powerprojectapprovalAdd',
        hidden: true,
        component: () => import('@/views/project/powerprojectapproval/add'),
        meta: {title: '添加'},
    },
    {
        path: '/project/powerprojectapproval/edit',
        name: 'powerprojectapprovalEdit',
        hidden: true,
        component: () => import('@/views/project/powerprojectapproval/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/project/powerprojectapproval/detail/:id',
        name: 'powerprojectapprovalDetail',
        hidden: true,
        component: () => import('@/views/project/powerprojectapproval/detail'),
        meta: {title: '查看'}
    }
];

export default index

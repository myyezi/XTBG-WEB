const index = [
    {
        path: '/workflow/workflowbusiness',
        name: 'workflowbusiness',
        component: () => import('@/views/workflow/workflowbusiness/list'),
        meta: {icon: 'auth3', title: '审批设置'},
    },
    {
        path: '/workflow/workflowbusiness/add',
        name: 'workflowbusinessAdd',
        hidden: true,
        component: () => import('@/views/workflow/workflowbusiness/add'),
        meta: {title: '添加'},
    },
    {
        path: '/workflow/workflowbusiness/edit',
        name: 'workflowbusinessEdit',
        hidden: true,
        component: () => import('@/views/workflow/workflowbusiness/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/workflow/workflowbusiness/detail/:id',
        name: 'workflowbusinessDetail',
        hidden: true,
        component: () => import('@/views/workflow/workflowbusiness/detail'),
        meta: {title: '查看'}
    }
];

export default index

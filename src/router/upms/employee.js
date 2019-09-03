const index = [
    {
        path: '/upms/employee',
        name: 'user',
        component: () => import('@/views/upms/employee/list'),
        meta: {icon: 'auth1', title: '员工管理'},
    },
    {
        path: '/upms/employee/add',
        name: 'userAdd',
        hidden: true,
        component: () => import('@/views/upms/employee/add'),
        meta: {title: '新增'},
    },
    {
        path: '/upms/employee/edit',
        name: 'userEdit',
        hidden: true,
        component: () => import('@/views/upms/employee/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/upms/employee/detail/:id',
        name: 'userDetail',
        hidden: true,
        component: () => import('@/views/upms/employee/detail'),
        meta: {title: '查看'}
    }
];

export default index

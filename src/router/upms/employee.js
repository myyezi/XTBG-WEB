const index = [
    {
        path: '/upms/employee',
        name: 'employee',
        component: () => import('@/views/upms/employee/list'),
        meta: {icon: 'auth1', title: '员工管理'},
    },
    {
        path: '/upms/employee/add',
        name: 'employeeAdd',
        hidden: true,
        component: () => import('@/views/upms/employee/add'),
        meta: {title: '新增'},
    },
    {
        path: '/upms/employee/edit',
        name: 'employeeEdit',
        hidden: true,
        component: () => import('@/views/upms/employee/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/upms/employee/detail/:id',
        name: 'employeeDetail',
        hidden: true,
        component: () => import('@/views/upms/employee/detail'),
        meta: {title: '查看'}
    }
];

export default index

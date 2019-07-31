const index = [
    {
        path: '/personnel/personnelattendancereport',
        name: 'personnelattendancereport',
        component: () => import('@/views/personnel/personnelattendancereport/list'),
        meta: {icon: 'auth3', title: '考勤统计'},
    },
    {
        path: '/personnel/personnelattendancereport/add',
        name: 'personnelattendancereportAdd',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendancereport/add'),
        meta: {title: '添加'},
    },
    {
        path: '/personnel/personnelattendancereport/edit',
        name: 'personnelattendancereportEdit',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendancereport/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/personnel/personnelattendancereport/detail/:id',
        name: 'personnelattendancereportDetail',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendancereport/detail'),
        meta: {title: '查看'}
    }
];

export default index

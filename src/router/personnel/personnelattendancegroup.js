const index = [
    {
        path: '/personnel/personnelattendancegroup',
        name: 'personnelattendancegroup',
        component: () => import('@/views/personnel/personnelattendancegroup/list'),
        meta: {icon: 'auth3', title: '考勤组'},
    },
    {
        path: '/personnel/personnelattendancegroup/add',
        name: 'personnelattendancegroupAdd',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendancegroup/add'),
        meta: {title: '添加'},
    },
    {
        path: '/personnel/personnelattendancegroup/edit',
        name: 'personnelattendancegroupEdit',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendancegroup/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/personnel/personnelattendancegroup/detail/:id',
        name: 'personnelattendancegroupDetail',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendancegroup/detail'),
        meta: {title: '查看'}
    }
];

export default index

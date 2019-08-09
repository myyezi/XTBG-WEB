const index = [
    {
        path: '/personnel/personnelattendance',
    name: 'personnelattendance',
        component: () => import('@/views/personnel/personnelattendance/list'),
        meta: {icon: 'auth3', title: '考勤'},
    },
    {
        path: '/personnel/personnelattendance/add',
        name: 'personnelattendanceAdd',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendance/add'),
        meta: {title: '添加'},
    },
    {
        path: '/personnel/personnelattendance/edit',
        name: 'personnelattendanceEdit',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendance/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/personnel/personnelattendance/detail/:id',
        name: 'personnelattendanceDetail',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendance/detail'),
        meta: {title: '查看'}
    }
];

export default index

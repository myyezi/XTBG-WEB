const index = [
    {
        path: '/personnel/personnelattendancegroupuser',
        name: 'personnelattendancegroupuser',
        component: () => import('@/views/personnel/personnelattendancegroupuser/list'),
        meta: {icon: 'auth3', title: '考勤组-人员'},
    },
    {
        path: '/personnel/personnelattendancegroupuser/add',
        name: 'personnelattendancegroupuserAdd',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendancegroupuser/add'),
        meta: {title: '添加'},
    },
    {
        path: '/personnel/personnelattendancegroupuser/edit',
        name: 'personnelattendancegroupuserEdit',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendancegroupuser/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/personnel/personnelattendancegroupuser/detail/:id',
        name: 'personnelattendancegroupuserDetail',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendancegroupuser/detail'),
        meta: {title: '查看'}
    }
];

export default index

const index = [
    {
        path: '/personnel/personnelattendancegrouporganization',
        name: 'personnelattendancegrouporganization',
        component: () => import('@/views/personnel/personnelattendancegrouporganization/list'),
        meta: {icon: 'auth3', title: '考勤组-部门'},
    },
    {
        path: '/personnel/personnelattendancegrouporganization/add',
        name: 'personnelattendancegrouporganizationAdd',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendancegrouporganization/add'),
        meta: {title: '添加'},
    },
    {
        path: '/personnel/personnelattendancegrouporganization/edit',
        name: 'personnelattendancegrouporganizationEdit',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendancegrouporganization/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/personnel/personnelattendancegrouporganization/detail/:id',
        name: 'personnelattendancegrouporganizationDetail',
        hidden: true,
        component: () => import('@/views/personnel/personnelattendancegrouporganization/detail'),
        meta: {title: '查看'}
    }
];

export default index

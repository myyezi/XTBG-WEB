const index = [
    {
        path: '/core/projectplanrisk',
        name: 'projectplanrisk',
        component: () => import('@/views/core/projectplanrisk/list'),
        meta: {icon: 'auth3', title: '项目计划模板风险清册'},
    },
    {
        path: '/core/projectplanrisk/add',
        name: 'projectplanriskAdd',
        hidden: true,
        component: () => import('@/views/core/projectplanrisk/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectplanrisk/edit',
        name: 'projectplanriskEdit',
        hidden: true,
        component: () => import('@/views/core/projectplanrisk/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectplanrisk/detail/:id',
        name: 'projectplanriskDetail',
        hidden: true,
        component: () => import('@/views/core/projectplanrisk/detail'),
        meta: {title: '查看'}
    }
];

export default index

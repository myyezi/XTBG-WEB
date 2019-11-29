const index = [
    {
        path: '/adm/admappraise',
        name: 'admappraise',
        component: () => import('@/views/adm/admappraise/list'),
        meta: {icon: 'auth3', title: '考核管理'},
    },
    {
        path: '/adm/admappraise/add',
        name: 'admappraiseAdd',
        hidden: true,
        component: () => import('@/views/adm/admappraise/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admappraise/edit',
        name: 'admappraiseEdit',
        hidden: true,
        component: () => import('@/views/adm/admappraise/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admappraise/detail/:id',
        name: 'admappraiseDetail',
        hidden: true,
        component: () => import('@/views/adm/admappraise/detail'),
        meta: {title: '查看'}
    }
];

export default index

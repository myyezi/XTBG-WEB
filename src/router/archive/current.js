const index = [
    {
        path: '/archive/current',
        name: 'current',
        component: () => import('@/views/archive/current/list'),
        meta: {icon: 'auth3', title: '现行文件资料库'},
    },
    {
        path: '/archive/current/add',
        name: 'currentAdd',
        hidden: true,
        component: () => import('@/views/archive/current/add'),
        meta: {title: '添加'},
    },
    {
        path: '/archive/current/edit',
        name: 'currentEdit',
        hidden: true,
        component: () => import('@/views/archive/current/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/archive/current/detail/:id',
        name: 'currentDetail',
        hidden: true,
        component: () => import('@/views/archive/current/detail'),
        meta: {title: '查看'}
    }
];

export default index

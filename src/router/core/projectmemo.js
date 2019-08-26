const index = [
    {
        path: '/core/projectmemo',
        name: 'projectmemo',
        component: () => import('@/views/core/projectmemo/list'),
        meta: {icon: 'auth3', title: '备忘录'},
    },
    {
        path: '/core/projectmemo/add',
        name: 'projectmemoAdd',
        hidden: true,
        component: () => import('@/views/core/projectmemo/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectmemo/edit',
        name: 'projectmemoEdit',
        hidden: true,
        component: () => import('@/views/core/projectmemo/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectmemo/detail/:id',
        name: 'projectmemoDetail',
        hidden: true,
        component: () => import('@/views/core/projectmemo/detail'),
        meta: {title: '查看'}
    }
];

export default index

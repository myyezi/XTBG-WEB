const index = [
    {
        path: '/archive/person',
        name: 'person',
        component: () => import('@/views/archive/person/list'),
        meta: {icon: 'auth3', title: '个人文件柜'},
    },
    {
        path: '/archive/person/add',
        name: 'personAdd',
        hidden: true,
        component: () => import('@/views/archive/person/add'),
        meta: {title: '添加'},
    },
    {
        path: '/archive/person/edit',
        name: 'personEdit',
        hidden: true,
        component: () => import('@/views/archive/person/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/archive/person/detail/:id',
        name: 'personDetail',
        hidden: true,
        component: () => import('@/views/archive/person/detail'),
        meta: {title: '查看'}
    }
];

export default index

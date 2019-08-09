const index = [
    {
        path: '/project/powerproprietorcontact',
        name: 'powerproprietorcontact',
        component: () => import('@/views/project/powerproprietorcontact/list'),
        meta: {icon: 'auth3', title: '业主-联系人'},
    },
    {
        path: '/project/powerproprietorcontact/add',
        name: 'powerproprietorcontactAdd',
        hidden: true,
        component: () => import('@/views/project/powerproprietorcontact/add'),
        meta: {title: '添加'},
    },
    {
        path: '/project/powerproprietorcontact/edit',
        name: 'powerproprietorcontactEdit',
        hidden: true,
        component: () => import('@/views/project/powerproprietorcontact/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/project/powerproprietorcontact/detail/:id',
        name: 'powerproprietorcontactDetail',
        hidden: true,
        component: () => import('@/views/project/powerproprietorcontact/detail'),
        meta: {title: '查看'}
    }
];

export default index

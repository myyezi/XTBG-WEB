const index = [
    {
        path: '/project/powerproprietor',
        name: 'powerproprietor',
        component: () => import('@/views/project/powerproprietor/list'),
        meta: {icon: 'auth3', title: '业主'},
    },
    {
        path: '/project/powerproprietor/add',
        name: 'powerproprietorAdd',
        hidden: true,
        component: () => import('@/views/project/powerproprietor/add'),
        meta: {title: '添加'},
    },
    {
        path: '/project/powerproprietor/edit',
        name: 'powerproprietorEdit',
        hidden: true,
        component: () => import('@/views/project/powerproprietor/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/project/powerproprietor/detail/:id',
        name: 'powerproprietorDetail',
        hidden: true,
        component: () => import('@/views/project/powerproprietor/detail'),
        meta: {title: '查看'}
    }
];

export default index

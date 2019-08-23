const index = [
    {
        path: '/upms/powerproprietor',
        name: 'powerproprietor',
        component: () => import('@/views/upms/powerproprietor/list'),
        meta: {icon: 'auth3', title: '业主管理'},
    },
    {
        path: '/upms/powerproprietor/add',
        name: 'powerproprietorAdd',
        hidden: true,
        component: () => import('@/views/upms/powerproprietor/add'),
        meta: {title: '添加'},
    },
    {
        path: '/upms/powerproprietor/edit',
        name: 'powerproprietorEdit',
        hidden: true,
        component: () => import('@/views/upms/powerproprietor/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/upms/powerproprietor/detail/:id',
        name: 'powerproprietorDetail',
        hidden: true,
        component: () => import('@/views/upms/powerproprietor/detail'),
        meta: {title: '查看'}
    }
];

export default index

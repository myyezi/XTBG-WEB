const index = [
    {
        path: '/adm/admcourse',
        name: 'admcourse',
        component: () => import('@/views/adm/admcourse/list'),
        meta: {icon: 'auth3', title: '课程管理'},
    },
    {
        path: '/adm/admcourse/add',
        name: 'admcourseAdd',
        hidden: true,
        component: () => import('@/views/adm/admcourse/add'),
        meta: {title: '添加'},
    },
    {
        path: '/adm/admcourse/edit',
        name: 'admcourseEdit',
        hidden: true,
        component: () => import('@/views/adm/admcourse/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/adm/admcourse/detail/:id',
        name: 'admcourseDetail',
        hidden: true,
        component: () => import('@/views/adm/admcourse/detail'),
        meta: {title: '查看'}
    }
];

export default index

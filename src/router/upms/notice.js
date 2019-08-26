const index = [
    {
        path: '/upms/notice',
        name: 'notice',
        component: () => import('@/views/upms/notice/list'),
        meta: {icon: 'auth3', title: '通知管理'},
    },
    {
        path: '/upms/notice/add',
        name: 'noticeAdd',
        hidden: true,
        component: () => import('@/views/upms/notice/add'),
        meta: {title: '添加'},
    },
    {
        path: '/upms/notice/edit',
        name: 'noticeEdit',
        hidden: true,
        component: () => import('@/views/upms/notice/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/upms/notice/detail/:id',
        name: 'noticeDetail',
        hidden: true,
        component: () => import('@/views/upms/notice/detail'),
        meta: {title: '查看'}
    }
];

export default index

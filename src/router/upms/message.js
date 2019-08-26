const index = [
    {
        path: '/upms/message',
        name: 'message',
        component: () => import('@/views/upms/message/list'),
        meta: {icon: 'auth3', title: '消息中心'},
    },
    {
        path: '/upms/message/edit',
        name: 'SysMessageEdit',
        hidden: true,
        component: () => import('@/views/upms/message/edit'),
        meta: {title: '编辑'}
    },
];

export default index

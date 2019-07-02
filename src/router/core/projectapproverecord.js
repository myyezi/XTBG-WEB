const index = [
    {
        path: '/core/projectapproverecord',
        name: 'projectapproverecord',
        component: () => import('@/views/core/projectapproverecord/list'),
        meta: {icon: 'auth3', title: '项目周报审批记录表'},
    },
    {
        path: '/core/projectapproverecord/add',
        name: 'projectapproverecordAdd',
        hidden: true,
        component: () => import('@/views/core/projectapproverecord/add'),
        meta: {title: '添加'},
    },
    {
        path: '/core/projectapproverecord/edit',
        name: 'projectapproverecordEdit',
        hidden: true,
        component: () => import('@/views/core/projectapproverecord/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/core/projectapproverecord/detail/:id',
        name: 'projectapproverecordDetail',
        hidden: true,
        component: () => import('@/views/core/projectapproverecord/detail'),
        meta: {title: '查看'}
    }
];

export default index

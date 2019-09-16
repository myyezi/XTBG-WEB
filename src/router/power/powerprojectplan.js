const index = [
    {
        path: '/power/powerprojectplan',
        name: 'powerprojectplan',
        component: () => import('@/views/power/powerprojectplan/list'),
        meta: {icon: 'auth3', title: '项目计划'},
    },
    {
        path: '/power/powerprojectplan/add',
        name: 'powerprojectplanAdd',
        hidden: true,
        component: () => import('@/views/power/powerprojectplan/add'),
        meta: {title: '添加'},
    },
    {
        path: '/power/powerprojectplan/edit',
        name: 'powerprojectplanEdit',
        hidden: true,
        component: () => import('@/views/power/powerprojectplan/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/power/powerprojectplan/detail/:id',
        name: 'powerprojectplanDetail',
        hidden: true,
        component: () => import('@/views/power/powerprojectplan/detail'),
        meta: {title: '查看'}
    },
    {
        path: '/power/powerprojectplan/changedetail',
        name: 'powerprojectplanChangedetail',
        hidden: true,
        component: () => import('@/views/power/powerprojectplan/changedetail'),
        meta: {title: '变更记录'}
    },
];

export default index

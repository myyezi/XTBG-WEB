const index = [
    {
        path: '/project/powerprojectplan',
        name: 'powerprojectplan',
        component: () => import('@/views/project/powerprojectplan/list'),
        meta: {icon: 'auth3', title: '项目计划'},
    },
    {
        path: '/project/powerprojectplan/add',
        name: 'powerprojectplanAdd',
        hidden: true,
        component: () => import('@/views/project/powerprojectplan/add'),
        meta: {title: '添加'},
    },
    {
        path: '/project/powerprojectplan/edit',
        name: 'powerprojectplanEdit',
        hidden: true,
        component: () => import('@/views/project/powerprojectplan/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/project/powerprojectplan/detail/:id',
        name: 'powerprojectplanDetail',
        hidden: true,
        component: () => import('@/views/project/powerprojectplan/detail'),
        meta: {title: '查看'}
    }
];

export default index

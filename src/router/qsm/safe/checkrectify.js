const index = [
    {
        path: '/safe/checkrectify',
        name: 'checkrectify',
        component: () => import('@/views/qsm/safe/checkrectify/list'),
        meta: {icon: 'auth3', title: '安全检查问题整改单'},
    },
    {
        path: '/safe/checkrectify/add',
        name: 'checkrectifyAdd',
        hidden: true,
        component: () => import('@/views/qsm/safe/checkrectify/add'),
        meta: {title: '添加'},
    },
    {
        path: '/safe/checkrectify/edit',
        name: 'checkrectifyEdit',
        hidden: true,
        component: () => import('@/views/qsm/safe/checkrectify/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/safe/checkrectify/detail/:id',
        name: 'checkrectifyDetail',
        hidden: true,
        component: () => import('@/views/qsm/safe/checkrectify/detail'),
        meta: {title: '查看'}
    }
];

export default index

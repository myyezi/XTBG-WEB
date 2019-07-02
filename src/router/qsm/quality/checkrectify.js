const index = [
    {
        path: '/quality/checkrectify',
        name: 'checkrectify',
        component: () => import('@/views/qsm/quality/checkrectify/list'),
        meta: {icon: 'auth3', title: '质量检查问题整改单'},
    },
    {
        path: '/quality/checkrectify/add',
        name: 'checkrectifyAdd',
        hidden: true,
        component: () => import('@/views/qsm/quality/checkrectify/add'),
        meta: {title: '添加'},
    },
    {
        path: '/quality/checkrectify/edit',
        name: 'checkrectifyEdit',
        hidden: true,
        component: () => import('@/views/qsm/quality/checkrectify/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/quality/checkrectify/detail/:id',
        name: 'checkrectifyDetail',
        hidden: true,
        component: () => import('@/views/qsm/quality/checkrectify/detail'),
        meta: {title: '查看'}
    }
];

export default index

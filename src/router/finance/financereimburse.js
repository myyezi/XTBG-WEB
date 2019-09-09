const index = [
    {
        path: '/finance/financereimburse',
        name: 'financereimburse',
        component: () => import('@/views/finance/financereimburse/list'),
        meta: {icon: 'auth3', title: '费用报销'},
    },
    {
        path: '/finance/financereimburse/add',
        name: 'financereimburseAdd',
        hidden: true,
        component: () => import('@/views/finance/financereimburse/add'),
        meta: {title: '添加'},
    },
    {
        path: '/finance/financereimburse/edit',
        name: 'financereimburseEdit',
        hidden: true,
        component: () => import('@/views/finance/financereimburse/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/finance/financereimburse/detail/:id',
        name: 'financereimburseDetail',
        hidden: true,
        component: () => import('@/views/finance/financereimburse/detail'),
        meta: {title: '查看'}
    }
];

export default index

const index = [
    {
        path: '/project/powerproject',
        name: 'powerproject',
        component: () => import('@/views/project/powerproject/list'),
        meta: {icon: 'auth3', title: '项目'},
    },
    {
        path: '/project/powerproject/add',
        name: 'powerprojectAdd',
        hidden: true,
        component: () => import('@/views/project/powerproject/add'),
        meta: {title: '添加'},
    },
    {
        path: '/project/powerproject/edit',
        name: 'powerprojectEdit',
        hidden: true,
        component: () => import('@/views/project/powerproject/edit'),
        meta: {title: '编辑'}
    },
    {
        path: '/project/powerproject/detail/:id',
        name: 'powerprojectDetail',
        hidden: true,
        component: () => import('@/views/project/powerproject/detail'),
        meta: {title: '查看'}
    }
];

export default index

const index = [
    {
        path: '/power/powerprojectstatistics',
        name: 'powerprojectstatistics',
        component: () => import('@/views/power/powerprojectstatistics/index'),
        meta: {icon: 'auth3', title: '项目统计'},
    },
    {
        path: '/power/powerprojectstatistics/detail',
        name: 'powerprojectstatisticsDetail',
        hidden: true,
        component: () => import('@/views/power/powerprojectstatistics/detail'),
        meta: {title: '查看'}
    }
];

export default index
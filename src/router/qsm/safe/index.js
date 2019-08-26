import Layout from '@/views/common/layout/Layout'
import safeCheck from '@/router/qsm/safe/check'
import safeWarn from '@/router/qsm/safe/warn'
import safeCheckrectify from '@/router/qsm/safe/checkrectify'
import safeRisk from '@/router/qsm/safe/risk'

const index = {
    path: '/',
    component: Layout,
    alwaysShow: true,
    name: '安全管理',
    redirect: 'noredirect',
    meta: {title: '安全管理'},
    children: [
        ...safeCheck,
        ...safeWarn,
        ...safeCheckrectify,
        ...safeRisk,
    ]
}
export default index

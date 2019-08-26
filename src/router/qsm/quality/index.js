import Layout from '@/views/common/layout/Layout'
import qualityCheck from '@/router/qsm/quality/check'
import qualityCheckrectify from '@/router/qsm/quality/checkrectify'

const index = {
    path: '/',
    component: Layout,
    alwaysShow: true,
    name: '安全管理',
    redirect: 'noredirect',
    meta: {title: '安全管理'},
    children: [
        ...qualityCheck,
        ...qualityCheckrectify,
    ]
}
export default index

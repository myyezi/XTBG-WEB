import Layout from '@/views/common/layout/Layout'
import workflowbusiness from '@/router/workflow/workflowbusiness/'
const index = {
    path: '/',
    component: Layout,
    alwaysShow: true,
    name: '审批管理',
    redirect: 'noredirect',
    meta: {title: '审批管理'},
    children: [
        ...workflowbusiness,
    ]
}
export default index

import Layout from '@/views/common/layout/Layout'
import user from '@/router/upms/user/'
import organization from '@/router/upms/organization/'
import organizationType from '@/router/upms/organizationType/'
import position from '@/router/upms/position/'
import role from '@/router/upms/role/'
import codegen from "@/router/upms/codegen";
import notice from "./notice";
import employee from "./employee";
import powerproprietor from "./powerproprietor";
import frontend from "@/router/upms/frontend";

const index = {
    path: '/',
    component: Layout,
    alwaysShow: true,
    name: '权限管理',
    redirect: 'noredirect',
    meta: {title: '权限管理'},
    children: [
        ...user,
        ...position,
        ...organization,
        ...organizationType,
        ...role,
        ...codegen,
        ...notice,
        ...frontend,
        ...powerproprietor,
        ...employee
    ]
}
export default index

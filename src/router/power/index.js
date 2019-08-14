import Layout from '@/views/common/layout/Layout'
import powerprojecttask from "@/router/power/powerprojecttask";
import powerprojecttemplate from "@/router/power/powerprojecttemplate";

const index = {
    path: '/',
    component: Layout,
    alwaysShow: true,
    name: '项目管理',
    redirect: 'noredirect',
    meta: {title: '项目管理'},
    children: [
        ...powerprojecttask,
        ...powerprojecttemplate
    ]
}
export default index

import Layout from '@/views/common/layout/Layout'
import powerprojecttask from "@/router/power/powerprojecttask";
import powerprojecttemplate from "@/router/power/powerprojecttemplate";
import powerprojecttemplateconfig from "@/router/power/powerprojecttemplateconfig";
import powerprojectplan from "@/router/power/powerprojectplan";
import powerprojectprogress from "@/router/power/powerprojectprogress";
import powerprojectstatistics from "@/router/power/powerprojectstatistics";

const index = {
    path: '/',
    component: Layout,
    alwaysShow: true,
    name: '项目管理',
    redirect: 'noredirect',
    meta: {title: '项目管理'},
    children: [
        ...powerprojecttask,
        ...powerprojecttemplate,
        ...powerprojecttemplateconfig,
        ...powerprojectplan,
        ...powerprojectprogress,
        ...powerprojectstatistics
    ]
}
export default index

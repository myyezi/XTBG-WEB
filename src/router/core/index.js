import Layout from '@/views/common/layout/Layout'
import project from "@/router/core/project";
import projecttemplate from "@/router/core/projecttemplate";
import projectreportdaily from "@/router/core/projectreportdaily";
import projectmemo from "@/router/core/projectmemo";
import projectbigevent from "@/router/core/projectbigevent";
import projectreportweekly from "@/router/core/projectreportweekly";
import projectevaluatetemplate from "@/router/core/projectevaluatetemplate";
import projectevaluate from "@/router/core/projectevaluate";
const index = {
    path: '/',
    component: Layout,
    alwaysShow: true,
    name: '项目管理',
    redirect: 'noredirect',
    meta: {title: '项目管理'},
    children: [
        ...project,
        ...projecttemplate,
        ...projectreportdaily,
        ...projectreportweekly,
        ...projectmemo,
        ...projectbigevent,
        ...projectevaluatetemplate,
        ...projectevaluate
    ]
}
export default index

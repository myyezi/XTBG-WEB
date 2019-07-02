import Layout from '@/views/common/layout/Layout'
import person from "@/router/archive/person";
import current from "@/router/archive/current";
import project from "@/router/archive/project";
import projecttemplate from "@/router/archive/projecttemplate";
const index = {
    path: '/',
    component: Layout,
    alwaysShow: true,
    name: '文件管理',
    redirect: 'noredirect',
    meta: {title: '文件管理'},
    children: [
        ...person,
        ...current,
        ...project,
        ...projecttemplate,
    ]
}
export default index

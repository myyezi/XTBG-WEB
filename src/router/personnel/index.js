import Layout from '@/views/common/layout/Layout'
import personnelattendancegroup from "@/router/personnel/personnelattendancegroup";
import personnelattendancereport from "@/router/personnel/personnelattendancereport";
import personnelattendance from "@/router/personnel/personnelattendance";

const index = {
    path: '/',
    component: Layout,
    alwaysShow: true,
    name: '人事管理',
    redirect: 'noredirect',
    meta: {title: '人事管理'},
    children: [
        ...personnelattendancegroup,
        ...personnelattendancereport,
        ...personnelattendance,
    ]
}
export default index

import Layout from '@/views/common/layout/Layout'
import admcar from "@/router/adm/admcar";
import admcontract from "@/router/adm/admcontract";
import admleave from "@/router/adm/admleave";
import admout from "@/router/adm/admout";
import admseal from "@/router/adm/admseal";
import admtravel from "@/router/adm/admtravel";
import admcourse from "@/router/adm/admcourse";
import admappraise from "@/router/adm/admappraise";
import admpurchase from "@/router/adm/admpurchase";
import admstock from "@/router/adm/admstock";
import admstockin from "@/router/adm/admstockin";
import admstockout from "@/router/adm/admstockout";
import admsupplier from "@/router/adm/admsupplier";


const index = {
    path: '/',
    component: Layout,
    alwaysShow: true,
    name: '行政管理',
    redirect: 'noredirect',
    meta: {title: '行政管理'},
    children: [
        ...admcar,
        ...admcontract,
        ...admleave,
        ...admout,
        ...admseal,
        ...admtravel,
        ...admcourse,
        ...admappraise,
        ...admpurchase,
        ...admstock,
        ...admstockin,
        ...admstockout,
        ...admsupplier,
    ]
}
export default index

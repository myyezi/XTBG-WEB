import Layout from '@/views/common/layout/Layout'
import financeborrow from "@/router/finance/financeborrow";
import financeinvoice from "@/router/finance/financeinvoice";
import financepayment from "@/router/finance/financepayment";
import financereimburse from "@/router/finance/financereimburse";
import financetravel from "@/router/finance/financetravel";


const index = {
    path: '/',
    component: Layout,
    alwaysShow: true,
    name: '财务管理',
    redirect: 'noredirect',
    meta: {title: '财务管理'},
    children: [
        ...financeborrow,
        ...financeinvoice,
        ...financepayment,
        ...financereimburse,
        ...financetravel,
    ]
}
export default index

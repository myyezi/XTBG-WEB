import {getToken} from '@/utils/cookie'

const getters = {
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    user: state => state.user.user,
    authRouters: state => state.auth.authRouters,
    menu: state => state.auth.menu,
    auth: state => state.auth.auth,
    roles: state => state.user.roles
}
export default getters

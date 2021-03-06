import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {Message} from 'element-ui'
import {getToken} from '@/utils/cookie' // 验权

const whiteList = ['/login','/forget','/register'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/'})
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            if (!store.getters.menu || !store.getters.menu.length) {
                try {
                    // store.dispatch('getAuth');
                    store.dispatch('GetInfo').then(() => {
                        store.dispatch('getAuth').then(_=>{
                            store.commit('setCurrentUser', store.getters.user);
                            store.dispatch('getMenu').then(res =>{
                                if (!store.state.im.websocket.clientId) {
                                    store.dispatch('getWebsocket', {
                                        ip: process.env.BASE_IP,
                                        port: process.env.BASE_HOST,
                                        token: getToken(),
                                        username: store.state.user.user.userId
                                    })
                                }
                                console.log(store.getters.authRouters);
                                router.addRoutes(store.getters.authRouters)
                                if(res.data&&res.data.length>0) {
                                    store.commit('SET_NOMENU', false)
                                    if (to.path === '/default'){
                                        next({path: '/'})
                                    } else {
                                        if (localStorage.getItem("isReload")){
                                            localStorage.setItem("isReload", false);
                                            next({path: '/'})
                                        } else {
                                            next({...to, replace: true});
                                        }
                                    }
                                } else {
                                    store.commit('SET_MENU', [{
                                        path: "/default/index",
                                        hidden:true
                                    }])
                                    store.commit('SET_NOMENU', true)
                                    next({path: '/default'})
                                }
                            });
                        });
                    });
                }catch(err){
                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || 'Verification failed, please login again')
                        next({path: '/'})
                    })
                }

            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})

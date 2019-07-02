import ajax from '@/utils/request'
import {constantRouterMap, authRouterMap} from '@/router'


function authCheck(routerMap, auth) {
    for (let i = 0; i < routerMap.length; i++) {
        let bean = routerMap[i];
        if(bean.path==='*') {
            continue
        }
        if (bean.children && bean.children.length) {
            authCheck(bean.children, auth)
        } else if (auth.indexOf(bean.path) === -1 && bean.hidden !== true) {
            routerMap.splice(i, 1);
            i--;
        }
    }

}

function getMenu(data){
    if(data){
        let out = [];
        data.forEach(bean =>{
            let item = Object.assign({},bean);
            if(!item.hidden){
                if(item.children && item.children.length) {
                    item.children = getMenu(item.children);
                }
                if(item.path === "/" && (!item.children || item.children.length==0)) {
                    return;
                }
                out.push(item);
            }
        });
        return out;
    } else {
        return [];
    }
}

console.log(constantRouterMap);
const auth = {
    state: {
        auth: [],
        authRouters: constantRouterMap,
        menu: [],
    },

    mutations: {
        SET_AUTH: (state, data) => {
            state.auth = data
        },
        SET_MENU: (state, data) => {
            state.menu = data
        },
        SET_ROUTERS: (state, routers) => {
            state.authRouters = constantRouterMap.concat(routers);
        }
    },

    actions: {
        getAuth({commit, state}) {
            return new Promise((resolve, reject) => {
                ajax.get('upms/user/getCurrentUserAuthority').then(response => {
                    const data = response.data

                    commit('SET_AUTH', data.btnStr.split(";"))
                    authCheck(authRouterMap, data.menuStr.split(";"))
                    commit('SET_ROUTERS', authRouterMap)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getMenu({commit, state}) {
            return new Promise((resolve, reject) => {
                ajax.get('/upms/menu/tree').then(response => {
                    if(typeof response === "string"){
                        response = JSON.stringify(response);
                    }
                    console.log(response);
                    const data = response.data
                    commit('SET_MENU', data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }

    }
}

export default auth

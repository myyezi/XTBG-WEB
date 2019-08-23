import ajax from '@/utils/request'
import {getToken, setToken, removeToken, removeAuth} from '@/utils/cookie'

const user = {
    state: {
        avatar: "",
        token: getToken(),
        user: {}
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        },
    },

    actions: {
        // 登录
        Login({commit}, data) {
            return new Promise((resolve, reject) => {
                ajax({
                    url: 'auth/oauth/token',
                    method: 'post',
                    headers:{'Authorization':'Basic dGVzdDp0ZXN0','Content-Type':'application/x-www-form-urlencoded'},
                    params: {
                        username: data.account,
                        password: data.password,
                        grant_type: 'password'
                    }
                }).then(data => {
                    setToken(data.access_token)
                    commit('SET_TOKEN', data.access_token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                ajax.get('upms/user/vUserInfo').then(response => {
                    const data = response.data
                    console.log("################################################################"+data)
                    console.log(data)
                    commit('SET_USER', data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                ajax.get('upms/user/logout').then(() => {
                    commit('SET_TOKEN', '');
                    removeToken();
                    sessionStorage.clear();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user

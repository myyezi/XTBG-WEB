<template>
    <div class="login-container">
        <div class="loading-box hide">
            <i class="el-icon-loading"></i>
        </div>
        <div id="app" v-cloak class="signin">
            <div class="middle-div">
                <div class="middle-count-div clearfix">
                    <div class="left-div">
                        <div class="logo">
                            <el-carousel trigger="click" height="100vh" arrow="never" indicator-position="none" class="product_swiper">
                                <el-carousel-item v-for="(item,index) in productImg" :key="index" class="clearfix">
                                    <div class="productImg"><img :src="item.url"/></div>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <div class="right-div">
                        <div class="right-div-form">
                            <div id="frmLogin">
                                    <div class="title_sm">
                                        协同办公系统登录
                                    </div>
                                    <el-input v-model="account" auto-complete="off"
                                        type="text" class="form-control nborder icon-input user" maxlength="20"
                                        placeholder="请输入账号" clearable prefix-icon="el-icon-user"/>
                                    <el-input v-model="password" auto-complete="off" @keyup.enter="login"
                                        type="password" class="form-control nborder icon-input pwd" maxlength="30"
                                        placeholder="请输入密码" clearable prefix-icon="el-icon-lock"/>
                                    <div class="login-info">
                                        <el-checkbox v-model="savePwd">记住密码</el-checkbox>
                                        <span class="forget_password" @click="toPath('/forget')">忘记密码</span>
                                    </div>
                                    <label class="form-group error-text" style="color:red;" v-html="message"
                                        v-show="message"></label>
                                    <el-button id="btnSubmit" type="button" :disabled="disabled()" :loading="loading"
                                            class="btn btn-primary block" @click="login">立刻登录
                                    </el-button>
                                    <div class="login_register">
                                        <span  @click="toPath('/register')">注册</span>
                                    </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import '@/styles/login.scss'
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    import {getToken} from '@/utils/cookie' // 验权

    export default {
        name: 'login',
        data() {
            return {
                savePwd: localStorage.getItem("tgpt_account") ? true : false,
                account: localStorage.getItem("tgpt_account") || "",
                password: localStorage.getItem("tgpt_password") || "",
                message: "",
                loading: false,
                companyId: "",
                productImg:[
                    {url:require('@/styles/img/banner.png')},
                ],
            }
        },
        watch: {
            account: function (val) {
                this.message = "";
            },
            password: function (val) {
                this.message = "";
            }
        },
        methods: {
            toPath(path) {
                this.$router.push({path: path})
            },
            disabled: function () {
                if (this.account == '' || this.password == '') {
                    return true;
                }
                else {
                    return false;
                }
            },
            login: function () {
                if (this.disabled() || this.loading) {
                    return;
                }
                this.loading = true;
                var data = {
                    account: this.account,
                    password: this.password,
                    platform: 1,
                    loginType: 1
                };
                this.$store.dispatch('Login', data).then(() => {
                    this.loading = false;
                    if (this.savePwd) {
                        localStorage.setItem("tgpt_account", data.account);
                        localStorage.setItem("tgpt_password", data.password);
                    } else {
                        localStorage.removeItem("tgpt_account");
                        localStorage.removeItem("tgpt_password");
                    }
                    this.message = "登录成功，正在进入系统";
                    ajax.get('upms/user/getCurrentUserAuthority').then(response => {
                        const data = response.data.menuStr;
                        console.log(data);
                        console.log(data.indexOf("/common/index") != -1);
                        console.log(data.indexOf("/common/storeIndex") != -1);
                        if (data.indexOf("/common/index") != -1) {
                            this.$router.push({path: '/'})
                        }
                        else if (data.indexOf("/common/storeIndex") != -1) {
                            this.$router.push({path: '/index'})
                        }
                        else {
                            this.$router.push({path: '/'})
                        }
                    })

                }).catch(res => {
                    this.message = res.message;
                    this.loading = false;
                });
            }
        }
    }

    // css rem 设置
    // !function (n) {
    //     var e = n.document,
    //         t = e.documentElement,
    //         i = 1920,// 设计稿宽度
    //         d = i / 100,// 比例
    //         o = "orientationchange" in n ? "orientationchange" : "resize",
    //         a = function () {
    //             var n = t.clientWidth || 320;
    //             n > 1920 && (n = 1920);
    //             t.style.fontSize = n / d + "px"
    //         };
    //     window.setTimeout(a, 1);
    //     e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener("DOMContentLoaded", a, !1))
    // }(window);
</script>

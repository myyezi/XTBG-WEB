<template>
    <div class="login-container">
        <div class="loading-box hide">
            <i class="el-icon-loading"></i>
        </div>
        <div id="app" v-cloak class="signin">
            <div class="top-div"></div>
            <div class="middle-div">
                <div class="middle-count-div clearfix">
                    <div class="left-div">
                        <div class="logo"></div>
                    </div>
                    <div class="right-div">
                        <div class="right-div-form">
                            <div id="frmLogin">
                                <div class="title">用户登录</div>
                                <div class="title_sm clearfix">
                                    <div class="title_hx_left title_float">
                                    </div>
                                    <div class="title_float title_count">欢迎登录综合能源服务应用平台</div>
                                    <div class="title_hx_right title_float">
                                    </div>
                                </div>
                                <input v-model="account" auto-complete="off"
                                       type="text" class="form-control nborder icon-input user" maxlength="20"
                                       placeholder="请输入账号"/>
                                <input v-model="password" auto-complete="off" @keyup.enter="login"
                                       type="password" class="form-control nborder icon-input pwd" maxlength="30"
                                       placeholder="请输入密码"/>
                                <div class="login-info">
                                    <el-checkbox v-model="savePwd">记住密码</el-checkbox>
                                    <span>忘记密码？请联系管理员</span>
                                </div>
                                <label class="form-group error-text" style="color:red;" v-html="message"
                                       v-show="message"></label>
                                <el-button id="btnSubmit" type="button" :disabled="disabled()" :loading="loading"
                                           class="btn btn-primary block" @click="login">登录
                                </el-button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="footer">Copyright © 2019 湖北中大恒润科技有限公司 鄂ICP备19003003号</div>
        </div>

    </div>
</template>

<script>
    import '@/styles/login.scss'
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'

    export default {
        name: 'login',
        data() {
            return {
                savePwd: localStorage.getItem("tgpt_account") ? true : false,
                account: localStorage.getItem("tgpt_account") || "",
                password: localStorage.getItem("tgpt_password") || "",
                message: "",
                loading: false
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
            },
        }
    }

    // css rem 设置
    !function (n) {
        var e = n.document,
            t = e.documentElement,
            i = 1920,// 设计稿宽度
            d = i / 100,// 比例
            o = "orientationchange" in n ? "orientationchange" : "resize",
            a = function () {
                var n = t.clientWidth || 320;
                n > 1920 && (n = 1920);
                t.style.fontSize = n / d + "px"
            };
        window.setTimeout(a, 1);
        e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener("DOMContentLoaded", a, !1))
    }(window);
</script>

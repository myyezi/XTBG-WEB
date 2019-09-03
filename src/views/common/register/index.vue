<template>
    <div class="forget-container" v-loading="loading">
        <common-header></common-header>
        <div class="register clearfix">
            <ul>
                <li class="clearfix" :class="{'step_active':item.active}" v-for="(item,index) in stepList" :key="index">
                    <i></i>
                    <span>{{item.index}}</span>
                    <i></i>
                </li>
            </ul>
        </div>
        <div class="forget_form">
            <step-one v-show="step === 1" @get-form-data="getFormData"></step-one>
            <step-two v-show="step === 2" @get-form-data="getFormData"></step-two>
            <step-three v-show="step === 3" @get-form-data="getFormData"></step-three>
        </div>
    </div>
</template>

<script>
    import commonHeader from '@/views/common/header/index'
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    import stepOne from './compent/step1'
    import stepTwo from './compent/step2'
    import stepThree from './compent/step3'
    export default {
        name: 'forget',
        data() {
            return {
                loading: false,
                formData:{
                    type:1
                },
                step:1,
                stepList:[{
                    index:1,
                    active:true
                },{
                    index:2,
                    active:false
                },{
                    index:3,
                    active:false
                }]
            }
        },
        components: { commonHeader,stepOne,stepTwo,stepThree},
        watch: {
            
        },
        methods: {
            getFormData(obj) {
                if(obj.step !== 3) {
                    this.$nextTick(()=> {
                        this.stepList.forEach(items => {
                            this.$set(items,'active',false);
                        });
                        this.$set(this.stepList[obj.step],'active',true);
                    });
                    this.step = obj.step+1
                }
                if(!obj.isLastStep) {
                    if(obj.step === 1) {
                        this.formData.account = obj.phone
                        this.formData.password = obj.pass
                    } else if(obj.step === 2) {
                        this.formData.name = obj.name
                        this.formData.gender = obj.gender
                        this.formData.birthday = obj.birthday
                    } else if(obj.step === 3) {
                        this.formData.education = obj.education
                        this.formData.qualification = obj.qualification
                        this.registerUser()
                    }
                    console.log(this.formData)
                }
            },
            registerUser() {
                this.loading = false;
                ajax.post("upms/user/registerUser",this.formData).then(rs => {
                    if(rs.status === 0) {
                        let data = {
                            account: this.formData.account,
                            password: this.formData.password,
                            platform: 1,
                            loginType: 1
                        };
                        this.$store.dispatch('Login', data).then(() => {
                            ajax.get('upms/user/getCurrentUserAuthority').then(response => {
                                this.loading = false;
                                const data = response.data.menuStr;
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
                            this.loading = false;
                            this.$router.push({path: '/login'})
                        });
                    } else if(rs.status === 1) {
                        this.$message.error(rs.msg)
                        this.$router.push({path: '/login'})
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .forget-container {
        height:100%;
        .register {
            margin-top:75px;
            padding:0 185px;
            ul {
                li {
                    float:left;
                    span {
                        float:left;
                        width: 30px;
                        height: 30px;
                        background: #ccc;
                        font-size: 20px;
                        border-radius: 50%;
                        line-height: 30px;
                        text-align: center;
                        color: #fff;
                    }
                    i {
                        float:left;
                        width: calc((100vw - 460px)/6);
                        height: 10px;
                        background: #ccc;
                        margin-top:10px;
                    }
                }
                .step_active {
                    span {
                        background: #0aa0a9;
                        color: #fff;
                    }
                    i {
                        background: #0aa0a9;
                    }
                }
            }
        }
        .forget_form {
            width:500px;
            margin: 100px auto 0;
        }
    }
</style>


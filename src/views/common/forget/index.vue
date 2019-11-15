<template>
    <div class="forget-container">
        <common-header></common-header>
        <div class="forget_form">
            <el-form :model="ruleFormOne" status-icon :rules="rulesOne" ref="ruleFormOne" label-width="100px">
                <el-form-item label="手机号：" prop="phone">
                    <el-input v-model="ruleFormOne.phone" autocomplete="new-password" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="code">
                    <el-input v-model="ruleFormOne.code" style="width:270px" autocomplete="new-password" placeholder="请输入验证码"></el-input>
                    <span class="get_code" @click="getCode" :class="[{display:msgKey}]">{{msgText}}</span>
                </el-form-item>
                <el-form-item label="密码：" prop="pass" >
                    <el-input type="password" v-model="ruleFormOne.pass" autocomplete="new-password" placeholder="请输入验密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="checkPass">
                    <el-input type="password" v-model="ruleFormOne.checkPass" autocomplete="new-password" placeholder="请输入确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF;background:#0aa0a9;width: 400px;" @click="submitForm('ruleFormOne')">确定</el-button>
                </el-form-item>
            </el-form>
            <!-- <el-form :model="ruleFormTwo" status-icon :rules="rulesTwo" ref="ruleFormTwo" label-width="100px" v-show="!checkCode">
                <el-form-item label="密码" prop="pass" >
                    <el-input type="password" v-model="ruleFormTwo.pass"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleFormTwo.checkPass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="updateForm('ruleFormTwo')" style="background:#0aa0a9;width: 400px;">修改</el-button>
                </el-form-item>
            </el-form> -->
        </div>
    </div>
</template>

<script>
    const MSGINIT = "获取验证码",
    MSGSCUCCESS = "${time}秒后重发",
    MSGTIME = 60;
    import commonHeader from '@/views/common/header/index'
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'

    export default {
        name: 'forget',
        data() {
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    let reg = /^((1[3-9][0-9])+\d{8})$/;
                    if(reg.test(value)) {
                        return callback();
                    }else {
                        return callback(new Error('请输入11位正确手机号码'));
                    }
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleFormOne.checkPass !== '') {
                        this.$refs.ruleFormOne.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.ruleFormOne.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleFormOne: {
                    phone:'',
                    code:'',
                    pass: '',
                    checkPass: '',
                },
                ruleFormTwo: {
                    pass: '',
                    checkPass: '',
                },
                rulesOne: {
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                    pass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, message: '请输入确认密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                rulesTwo: {
                    pass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, message: '请输入确认密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                checkCode:true,
                msgText:MSGINIT,
                msgTime: MSGTIME,
                msgKey: false,
            }
        },
        components: { commonHeader},
        watch: {

        },
        methods: {
            getCode() {
                if (this.ruleFormOne.phone === '') {
                    this.$message.error("请先输入手机号")
                    return
                } else {
                    let reg = /^((1[3-9][0-9])+\d{8})$/;
                    if(reg.test(this.ruleFormOne.phone)) {
                        if (this.msgKey) return;
                        this.msgText = MSGSCUCCESS.replace("${time}", this.msgTime);
                        this.msgKey = true;
                        ajax.get("upms/user/getSmsCode",{
                            mobile:this.ruleFormOne.phone,
                            type:2
                        }).then(rs => {
                            if(rs.status === 0) {
                            } else {
                                this.$message.error(rs.msg)
                            }
                        });

                        const time = setInterval(() => {
                            this.msgTime--;
                            this.msgText = MSGSCUCCESS.replace("${time}", this.msgTime);
                            if (this.msgTime == 0) {
                                this.msgTime = MSGTIME;
                                this.msgText = MSGINIT;
                                this.msgKey = false;
                                clearInterval(time);
                            }
                        }, 1000);
                    }else {
                        // this.$message.error("请输入11位正确手机号码")
                        return
                    }
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = {
                            account:this.ruleFormOne.phone,
                            smsCode:this.ruleFormOne.code,
                            password:this.ruleFormOne.pass,
                            type:2
                        }
                        ajax.get("upms/user/verifySmsCode",{
                            mobile:this.ruleFormOne.phone,
                            smsCode:this.ruleFormOne.code,
                            type:2
                        }).then(rs => {
                            if(rs.status === 0) {
                                ajax.post("upms/user/registerUser",obj).then(rs => {
                                    if(rs.status === 0) {
                                        this.$message.success("密码修改成功")
                                        this.$router.push({path: '/login'})
                                    } else {
                                        this.$message.error("密码修改失败")
                                    }
                                });
                            } else {
                                this.$message.error(rs.msg)
                            }
                        });
                    }
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    .forget-container {
        height:100%;
        .forget_form {
            width:500px;
            margin: 200px auto 0;
            .get_code {
                width: 100px;
                display: inline-block;
                margin-left: 20px;
                background: #0aa0a9;
                text-align: center;
                color: #fff;
                border-radius: 5px;
                cursor: pointer;
            }
            .display {
                background: #ccc;
            }
        }
    }
</style>


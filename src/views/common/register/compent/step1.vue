<template>
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
            <el-button type="primary" @click="submitForm('ruleFormOne')" style="background:#0aa0a9;width: 400px;">下一步</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    const MSGINIT = "获取验证码",
    MSGSCUCCESS = "${time}秒后重发",
    MSGTIME = 60;
    import ajax from '@/utils/request'
    export default {
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
                checkCode:true,
                msgText:MSGINIT,
                msgTime: MSGTIME,
                msgKey: false,
            }
        },
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
                            type:1
                        }).then(rs => {
                            if(rs.status === 1) {
                                this.$message.error(rs.msg)
                                this.$router.push({path: '/login'})
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
                        ajax.get("upms/user/verifySmsCode",{
                            mobile:this.ruleFormOne.phone,
                            smsCode:this.ruleFormOne.code,
                            type:1
                        }).then(rs => {
                            if(rs.status === 0) {
                                let obj = {
                                    phone:this.ruleFormOne.phone,
                                    code:this.ruleFormOne.code,
                                    pass:this.ruleFormOne.pass,
                                    step:1,
                                    isLastStep:false
                                }
                                this.$emit("get-form-data",obj)
                            } else if(rs.status === 1) {
                                this.$message.error(rs.msg)
                                this.$router.push({path: '/login'})
                            }
                        });
                    } 
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
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
</style>


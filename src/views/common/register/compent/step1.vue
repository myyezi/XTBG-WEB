<template>
    <el-form :model="ruleFormOne" status-icon :rules="rulesOne" ref="ruleFormOne" label-width="100px" class="register_step_one">
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
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="submitForm('ruleFormOne')" class="selete_button" :class="{'seleted_button':seletedProtocol}">下一步</el-button>
        </el-form-item>
        <div class="protocol clearfix">
            <i class="selete_protocol" :class="{'seleted_protocol':seletedProtocol}" @click="seletedProtocol=!seletedProtocol"></i><span class="rotocol_text">我已阅读并同意相关服务条款和隐私政策</span>
        </div>
    </el-form>
</template>

<script>
    const MSGINIT = "获取验证码",
    MSGSCUCCESS = "${time}秒后重发",
    MSGTIME = 60;
    import ajax from '@/utils/request'
import { setTimeout } from 'timers';
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
                seletedProtocol:false
            }
        },
        watch: {

        },
        methods: {
            clickRadio() {
                let radio = this.radio
                if(radio) {
                    this.radio = ''
                } else {
                    this.radio = '1'
                }
            },
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
                                this.$message.error("该手机号已经被注册过！")
                                setTimeout(()=> {
                                    this.$router.push({path: '/login'})
                                },2000)
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
                if(this.seletedProtocol) {
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
                                    this.$message.error("该手机号已经被注册过！")
                                    setTimeout(()=> {
                                        this.$router.push({path: '/login'})
                                    },2000)
                                } else {
                                    this.$message.error(rs.msg)
                                }
                            });
                        }
                    });
                } else {
                    this.$message.warning("请先勾选我已阅读并同意相关服务条款和隐私政策")
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
.register_step_one {
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
    .selete_button {
        background: #ccc;
        border:1px solid #ccc;
        width: 400px;
    }
    .seleted_button {
        background: #0aa0a9;
        border:1px solid #0aa0a9;
    }
    .protocol {
        padding-left:100px;
        .selete_protocol {
            float:left;
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY0N0FBMzFGQ0QyNDExRTk4RTc1QzlFOTI2NTMzNkE5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY0N0FBMzIwQ0QyNDExRTk4RTc1QzlFOTI2NTMzNkE5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjQ3QUEzMURDRDI0MTFFOThFNzVDOUU5MjY1MzM2QTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjQ3QUEzMUVDRDI0MTFFOThFNzVDOUU5MjY1MzM2QTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7DtHuhAAAA7ElEQVR42pSTzQ2CQBSEF2rA0IRe5OIFEu0GPFgKHgS60QS9mLBcsAmCPeCMeWtIFGRf8gXCvhn2Z9bp+14NS2sd4RGDECxAB66gCIKgHPY6RgzREo8ErEAmgk4MaLQHDchh8viIIVzj/Q4OGMjVSKGP5kewQV/tyndOM54SsmQ8kX6lqqoKwY0zmAv7QeSKS6bs6kQdxTtwthRz199/9rGW1lL8BB7FLXbRtxR7NKD4AraWYgappLiQANgU+wtXItdg6rMMpK+hzoSER5VKgtSfhKXmaKeyXZpdlTX+zvbIrYrMrorR1616CTAAS22KZ84XgmAAAAAASUVORK5CYII=");
            width:15px;
            height:15px;
            cursor: pointer;
        }
        .seleted_protocol {
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVCQkZBQkIzQ0QyNDExRTlBRDExOTI4Q0U4QkM3QjE5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVCQkZBQkI0Q0QyNDExRTlBRDExOTI4Q0U4QkM3QjE5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUJCRkFCQjFDRDI0MTFFOUFEMTE5MjhDRThCQzdCMTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUJCRkFCQjJDRDI0MTFFOUFEMTE5MjhDRThCQzdCMTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5YK2p7AAABNElEQVR42oyTMU4CURCGF0Jni+EEFgQtsLJhEz2D2dBZWYCFNyAaD6AFsA2NpXoHTdbKRgs1Fp6AYEuBFuv3J/PMBH3qSz7e2zf/P5kdZitlWSZ+rZxfpmw96MAqzOAW8vleVnhtJZgxrbP1YQNGZphZAiU6gEcYk+Tpy4xxk/MdHBIYJ5GFTsnPYAvdfc3ue8YEQfLLUuJ30+5XEaukJpkmTpSBSlvYnoWA6ZrqTc2yjJxxFy7cc8s9h7KG8lX52YFrJz6KlDxwZ3U9lblBKVMXWIuY/f0b1GWeUn/DBV4jZn9fVwKZb2DbBY4j5hN31iAVMuc2AGFdQRde4MP27lITpc/DkOj/e17qemzJ2KJP/TAkMj1A+Y8JO4X2X7NdhK7aO/4825GvKg1dtUTfvqpPAQYAJk1zzbwFuNEAAAAASUVORK5CYII=');
        }
        .rotocol_text {
            float:left;
            color:#999;
            margin-left:10px;
            font-size:14px;
        }
    }
}
</style>


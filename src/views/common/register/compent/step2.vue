<template>
    <el-form :model="ruleFormTwo" status-icon :rules="rulesTwo" ref="ruleFormTwo" label-width="100px"> 
        <el-form-item label="姓名：" prop="name" >
            <el-input v-model="ruleFormTwo.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
            <el-select v-model="ruleFormTwo.gender" placeholder="请选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="生日：" prop="birthday">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="ruleFormTwo.birthday" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button @click="lastStep()" style="float:left;width: 195px;">上一步</el-button>
            <el-button type="primary" @click="submitForm('ruleFormTwo')" style="float:left;background:#0aa0a9;width: 195px;">下一步</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import commonHeader from '@/views/common/header/index'
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'

    export default {
        name: 'forget',
        data() {
            return {
                ruleFormTwo: {
                    name: '',
                    gender: '',
                    birthday:''
                },
                rulesTwo: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    birthday: [
                        { required: true, message: '请输入日期', trigger: 'blur' },
                    ],
                },
            }
        },
        watch: {
            
        },
        methods: {
            lastStep() {
                let obj = {
                    step:0,
                    isLastStep:true
                }
                this.$emit("get-form-data",obj)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = {
                            name:this.ruleFormTwo.name,
                            gender: this.ruleFormTwo.gender,
                            birthday:this.ruleFormTwo.birthday,
                            step:2,
                            isLastStep:false
                        }
                        this.$emit("get-form-data",obj)
                    } 
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
</style>


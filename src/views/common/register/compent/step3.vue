<template>
    <el-form :model="ruleFormThree" status-icon ref="ruleFormThree" label-width="100px">
        <el-form-item label="学历：" prop="education">
            <el-select v-model="ruleFormThree.education" placeholder="请选择学历">
                <el-option :label="item.text" :value="item.value" v-for="(item,index) in educationList" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="职称：" prop="qualification">
            <el-select v-model="ruleFormThree.qualification" placeholder="请选择职称">
                <el-option :label="item.text" :value="item.value" v-for="(item,index) in titleList" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="lastStep()" style="float:left;width: 125px;">上一步</el-button>
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF;float:left;background:#0aa0a9;width: 130px;" @click="submitForm('ruleFormThree')">完成</el-button>
            <el-button @click="nextStep()" style="float:left;width: 125px;">跳过</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import ajax from '@/utils/request'
    export default {
        data() {
            return {
                ruleFormThree: {
                    education: '',
                    qualification: '',
                },
                educationList:[],
                titleList:[]
            }
        },
        watch: {

        },
        created() {
            this.getDict()
        },
        methods: {
            // 获取字典
            getDict() {
                let r = 'XL,ZC';
                ajax.get("upms/dict/allType/"+r).then(rs => {
                    this.educationList = rs.XL;
                    this.titleList = rs.ZC
                });
            },
            lastStep() {
                let obj = {
                    step:1,
                    isLastStep:true
                }
                this.$emit("get-form-data",obj)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = {
                            education:this.ruleFormThree.education,
                            qualification: this.ruleFormThree.qualification,
                            step:3,
                            isLastStep:false
                        }
                        this.$emit("get-form-data",obj)
                    }
                });
            },
            nextStep() {
                let obj = {
                    education:'',
                    qualification: '',
                    step:3,
                    isLastStep:false
                }
                this.$emit("get-form-data",obj)
            },
        }
    }
</script>
<style lang="scss" scoped>
</style>


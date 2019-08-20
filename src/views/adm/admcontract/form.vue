<template>
    <div class="form-panel">
        <el-form :model="admcontractForm" :rules="rules" ref="admcontractForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="合同管理" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admcontractForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
                            <el-input v-model="admcontractForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="合同名称" prop="name">
                            <el-input v-model="admcontractForm.name" placeholder="请输入合同名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="项目任务书ID" prop="projectTaskId">
                            <el-input v-model="admcontractForm.projectTaskId" placeholder="请输入项目任务书ID" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="金额" prop="amount">
                            <el-input v-model="admcontractForm.amount" placeholder="请输入金额" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="签订人(用户id)" prop="signer">
                            <el-input v-model="admcontractForm.signer" placeholder="请输入签订人(用户id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="签订时间" prop="signTime">
                            <el-input v-model="admcontractForm.signTime" placeholder="请输入签订时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="收款进度" prop="progress">
                            <el-input v-model="admcontractForm.progress" placeholder="请输入收款进度" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admcontractForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请人" prop="creater">
                            <el-input v-model="admcontractForm.creater" placeholder="请输入申请人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="admcontractForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="admcontractForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="admcontractForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admcontractForm')">保存</el-button>
                <el-button @click="close">返回</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'

    export default {
        mixins: [tool, ruleTool],
        components: {},
        data() {
            return {
                    admcontractForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          companyId: [
                        {required: true, message: '请输入所属管理公司(组织表管理公司id)', trigger: ['blur']}
                    ],
                                          name: [
                        {required: true, message: '请输入合同名称', trigger: ['blur']}
                    ],
                                          projectTaskId: [
                        {required: true, message: '请输入项目任务书ID', trigger: ['blur']}
                    ],
                                          amount: [
                        {required: true, message: '请输入金额', trigger: ['blur']}
                    ],
                                          signer: [
                        {required: true, message: '请输入签订人(用户id)', trigger: ['blur']}
                    ],
                                          signTime: [
                        {required: true, message: '请输入签订时间', trigger: ['blur']}
                    ],
                                          progress: [
                        {required: true, message: '请输入收款进度', trigger: ['blur']}
                    ],
                                          status: [
                        {required: true, message: '请输入数据状态(0-删除，1-正常)', trigger: ['blur']}
                    ],
                                          creater: [
                        {required: true, message: '请输入申请人', trigger: ['blur']}
                    ],
                                          updater: [
                        {required: true, message: '请输入修改人', trigger: ['blur']}
                    ],
                                          createTime: [
                        {required: true, message: '请输入申请时间', trigger: ['blur']}
                    ],
                                          updateTime: [
                        {required: true, message: '请输入修改时间', trigger: ['blur']}
                    ],
                                    }
            }
        },
        mounted() {
            this.open();
        },
        methods: {

            //进入编辑页调用 bean为列表页传入数据
            open() {
                if (this.$route.query.id) {
                    ajax.get('adm/admcontract/' + this.$route.query.id).then(rs => {
                        this.admcontractForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admcontractForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admcontract', data).then(rs => {
                        if (rs.status == 0) {
                            this.$message
                                .success(rs.msg);
                            this.close();
                        } else {
                            this.$message
                                .error(rs.msg);
                        }
                    });
                });
            },

        },
    }
</script>

<template>
    <div class="form-panel">
        <el-form :model="financetravelForm" :rules="rules" ref="financetravelForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="差旅费" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="financetravelForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
                            <el-input v-model="financetravelForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="项目任务书id" prop="projectTaskId">
                            <el-input v-model="financetravelForm.projectTaskId" placeholder="请输入项目任务书id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="总金额" prop="amount">
                            <el-input v-model="financetravelForm.amount" placeholder="请输入总金额" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="出差事由" prop="reason">
                            <el-input v-model="financetravelForm.reason" placeholder="请输入出差事由" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="住宿费" prop="accFee">
                            <el-input v-model="financetravelForm.accFee" placeholder="请输入住宿费" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="订票费" prop="bookingFee">
                            <el-input v-model="financetravelForm.bookingFee" placeholder="请输入订票费" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="保险费" prop="insuranceFee">
                            <el-input v-model="financetravelForm.insuranceFee" placeholder="请输入保险费" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="出差补贴" prop="subsidy">
                            <el-input v-model="financetravelForm.subsidy" placeholder="请输入出差补贴" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="状态(1-审批中，2-已通过  3-已驳回 4-已作废)" prop="approvalStatus">
                            <el-input v-model="financetravelForm.approvalStatus" placeholder="请输入状态(1-审批中，2-已通过  3-已驳回 4-已作废)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="financetravelForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请人" prop="creater">
                            <el-input v-model="financetravelForm.creater" placeholder="请输入申请人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="financetravelForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="financetravelForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="financetravelForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('financetravelForm')">保存</el-button>
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
                    financetravelForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          companyId: [
                        {required: true, message: '请输入所属管理公司(组织表管理公司id)', trigger: ['blur']}
                    ],
                                          projectTaskId: [
                        {required: true, message: '请输入项目任务书id', trigger: ['blur']}
                    ],
                                          amount: [
                        {required: true, message: '请输入总金额', trigger: ['blur']}
                    ],
                                          reason: [
                        {required: true, message: '请输入出差事由', trigger: ['blur']}
                    ],
                                          accFee: [
                        {required: true, message: '请输入住宿费', trigger: ['blur']}
                    ],
                                          bookingFee: [
                        {required: true, message: '请输入订票费', trigger: ['blur']}
                    ],
                                          insuranceFee: [
                        {required: true, message: '请输入保险费', trigger: ['blur']}
                    ],
                                          subsidy: [
                        {required: true, message: '请输入出差补贴', trigger: ['blur']}
                    ],
                                          approvalStatus: [
                        {required: true, message: '请输入状态(1-审批中，2-已通过  3-已驳回 4-已作废)', trigger: ['blur']}
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
                    ajax.get('finance/financetravel/' + this.$route.query.id).then(rs => {
                        this.financetravelForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.financetravelForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('finance/financetravel', data).then(rs => {
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

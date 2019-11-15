<template>
    <div class="form-panel">
        <el-form :model="financepaymentForm" :rules="rules" ref="financepaymentForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="付款申请" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="financepaymentForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
                            <el-input v-model="financepaymentForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="项目任务书id" prop="projectTaskId">
                            <el-input v-model="financepaymentForm.projectTaskId" placeholder="请输入项目任务书id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="金额" prop="amount">
                            <el-input v-model="financepaymentForm.amount" placeholder="请输入金额" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="开户银行" prop="bank">
                            <el-input v-model="financepaymentForm.bank" placeholder="请输入开户银行" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="开户账户" prop="account">
                            <el-input v-model="financepaymentForm.account" placeholder="请输入开户账户" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="收款单位" prop="payee">
                            <el-input v-model="financepaymentForm.payee" placeholder="请输入收款单位" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="付款事由" prop="reason">
                            <el-input v-model="financepaymentForm.reason" placeholder="请输入付款事由" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="状态(1-审批中，2-已通过  3-已驳回 4-已作废)" prop="approvalStatus">
                            <el-input v-model="financepaymentForm.approvalStatus" placeholder="请输入状态(1-审批中，2-已通过  3-已驳回 4-已作废)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="financepaymentForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请人" prop="creater">
                            <el-input v-model="financepaymentForm.creater" placeholder="请输入申请人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="financepaymentForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="financepaymentForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="financepaymentForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="submitForm('financepaymentForm')">保存</el-button>
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
                    financepaymentForm: {},
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
                        {required: true, message: '请输入金额', trigger: ['blur']}
                    ],
                                          bank: [
                        {required: true, message: '请输入开户银行', trigger: ['blur']}
                    ],
                                          account: [
                        {required: true, message: '请输入开户账户', trigger: ['blur']}
                    ],
                                          payee: [
                        {required: true, message: '请输入收款单位', trigger: ['blur']}
                    ],
                                          reason: [
                        {required: true, message: '请输入付款事由', trigger: ['blur']}
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
                    ajax.get('finance/financepayment/' + this.$route.query.id).then(rs => {
                        this.financepaymentForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.financepaymentForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('finance/financepayment', data).then(rs => {
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

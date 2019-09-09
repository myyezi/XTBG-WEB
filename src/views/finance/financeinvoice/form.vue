<template>
    <div class="form-panel">
        <el-form :model="financeinvoiceForm" :rules="rules" ref="financeinvoiceForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="发票管理" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="financeinvoiceForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
                            <el-input v-model="financeinvoiceForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="发票编号" prop="code">
                            <el-input v-model="financeinvoiceForm.code" placeholder="请输入发票编号" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="项目任务书id" prop="projectTaskId">
                            <el-input v-model="financeinvoiceForm.projectTaskId" placeholder="请输入项目任务书id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="发票类型(1-专票  2-普票)" prop="type">
                            <el-input v-model="financeinvoiceForm.type" placeholder="请输入发票类型(1-专票  2-普票)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="金额" prop="amount">
                            <el-input v-model="financeinvoiceForm.amount" placeholder="请输入金额" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="开票名称" prop="name">
                            <el-input v-model="financeinvoiceForm.name" placeholder="请输入开票名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="纳税人识别号" prop="tin">
                            <el-input v-model="financeinvoiceForm.tin" placeholder="请输入纳税人识别号" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="开户行" prop="bank">
                            <el-input v-model="financeinvoiceForm.bank" placeholder="请输入开户行" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="银行账号" prop="account">
                            <el-input v-model="financeinvoiceForm.account" placeholder="请输入银行账号" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="开票说明" prop="remark">
                            <el-input v-model="financeinvoiceForm.remark" placeholder="请输入开票说明" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="状态(1-审批中，2-已通过  3-已驳回 4-已作废)" prop="approvalStatus">
                            <el-input v-model="financeinvoiceForm.approvalStatus" placeholder="请输入状态(1-审批中，2-已通过  3-已驳回 4-已作废)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="开票人" prop="operator">
                            <el-input v-model="financeinvoiceForm.operator" placeholder="请输入开票人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="开票时间" prop="operateTime">
                            <el-input v-model="financeinvoiceForm.operateTime" placeholder="请输入开票时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="financeinvoiceForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请人" prop="creater">
                            <el-input v-model="financeinvoiceForm.creater" placeholder="请输入申请人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="financeinvoiceForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="financeinvoiceForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="financeinvoiceForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('financeinvoiceForm')">保存</el-button>
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
                    financeinvoiceForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          companyId: [
                        {required: true, message: '请输入所属管理公司(组织表管理公司id)', trigger: ['blur']}
                    ],
                                          code: [
                        {required: true, message: '请输入发票编号', trigger: ['blur']}
                    ],
                                          projectTaskId: [
                        {required: true, message: '请输入项目任务书id', trigger: ['blur']}
                    ],
                                          type: [
                        {required: true, message: '请输入发票类型(1-专票  2-普票)', trigger: ['blur']}
                    ],
                                          amount: [
                        {required: true, message: '请输入金额', trigger: ['blur']}
                    ],
                                          name: [
                        {required: true, message: '请输入开票名称', trigger: ['blur']}
                    ],
                                          tin: [
                        {required: true, message: '请输入纳税人识别号', trigger: ['blur']}
                    ],
                                          bank: [
                        {required: true, message: '请输入开户行', trigger: ['blur']}
                    ],
                                          account: [
                        {required: true, message: '请输入银行账号', trigger: ['blur']}
                    ],
                                          remark: [
                        {required: true, message: '请输入开票说明', trigger: ['blur']}
                    ],
                                          approvalStatus: [
                        {required: true, message: '请输入状态(1-审批中，2-已通过  3-已驳回 4-已作废)', trigger: ['blur']}
                    ],
                                          operator: [
                        {required: true, message: '请输入开票人', trigger: ['blur']}
                    ],
                                          operateTime: [
                        {required: true, message: '请输入开票时间', trigger: ['blur']}
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
                    ajax.get('finance/financeinvoice/' + this.$route.query.id).then(rs => {
                        this.financeinvoiceForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.financeinvoiceForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('finance/financeinvoice', data).then(rs => {
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

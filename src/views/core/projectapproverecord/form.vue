<template>
    <div class="form-panel">
        <el-form :model="projectapproverecordForm" :rules="rules" ref="projectapproverecordForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目周报审批记录表" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键id" prop="guidePrice">
                            <el-input v-model="projectapproverecordForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="周报id" prop="guidePrice">
                            <el-input v-model="projectapproverecordForm.reportId" placeholder="请输入周报id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="审批状态(2-一级审批人审批通过，3-一级审批人驳回，4-二级审批人审批通过，5-二级审批人驳回)" prop="guidePrice">
                            <el-input v-model="projectapproverecordForm.approveStatus" placeholder="请输入审批状态(2-一级审批人审批通过，3-一级审批人驳回，4-二级审批人审批通过，5-二级审批人驳回)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="审批人" prop="guidePrice">
                            <el-input v-model="projectapproverecordForm.approver" placeholder="请输入审批人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="审批时间" prop="guidePrice">
                            <el-input v-model="projectapproverecordForm.approveTime" placeholder="请输入审批时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="guidePrice">
                            <el-input v-model="projectapproverecordForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('projectapproverecordForm')">保存</el-button>
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
                    projectapproverecordForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键id', trigger: ['blur']}
                    ],
                                          reportId: [
                        {required: true, message: '请输入周报id', trigger: ['blur']}
                    ],
                                          approveStatus: [
                        {required: true, message: '请输入审批状态(2-一级审批人审批通过，3-一级审批人驳回，4-二级审批人审批通过，5-二级审批人驳回)', trigger: ['blur']}
                    ],
                                          approver: [
                        {required: true, message: '请输入审批人', trigger: ['blur']}
                    ],
                                          approveTime: [
                        {required: true, message: '请输入审批时间', trigger: ['blur']}
                    ],
                                          status: [
                        {required: true, message: '请输入数据状态(0-删除，1-正常)', trigger: ['blur']}
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
                    ajax.get('core/projectapproverecord/' + this.$route.query.id).then(rs => {
                        this.projectapproverecordForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.projectapproverecordForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/projectapproverecord', data).then(rs => {
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

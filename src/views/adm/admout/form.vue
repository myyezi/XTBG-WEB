<template>
    <div class="form-panel">
        <el-form :model="admoutForm" :rules="rules" ref="admoutForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="外出管理" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admoutForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
                            <el-input v-model="admoutForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="地址" prop="address">
                            <el-input v-model="admoutForm.address" placeholder="请输入地址" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="开始时间" prop="startTime">
                            <el-input v-model="admoutForm.startTime" placeholder="请输入开始时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="结束时间" prop="endTime">
                            <el-input v-model="admoutForm.endTime" placeholder="请输入结束时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="外出时长（天）" prop="outTime">
                            <el-input v-model="admoutForm.outTime" placeholder="请输入外出时长（天）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="出行方式(1-公共交通 2-出租车 3-自驾  4-公司车辆)" prop="type">
                            <el-input v-model="admoutForm.type" placeholder="请输入出行方式(1-公共交通 2-出租车 3-自驾  4-公司车辆)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="事由" prop="reason">
                            <el-input v-model="admoutForm.reason" placeholder="请输入事由" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="状态(1-审批中，2-已通过  3-已驳回 4-已作废)" prop="approvalStatus">
                            <el-input v-model="admoutForm.approvalStatus" placeholder="请输入状态(1-审批中，2-已通过  3-已驳回 4-已作废)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admoutForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请人" prop="creater">
                            <el-input v-model="admoutForm.creater" placeholder="请输入申请人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="admoutForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="admoutForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="admoutForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admoutForm')">保存</el-button>
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
                    admoutForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          companyId: [
                        {required: true, message: '请输入所属管理公司(组织表管理公司id)', trigger: ['blur']}
                    ],
                                          address: [
                        {required: true, message: '请输入地址', trigger: ['blur']}
                    ],
                                          startTime: [
                        {required: true, message: '请输入开始时间', trigger: ['blur']}
                    ],
                                          endTime: [
                        {required: true, message: '请输入结束时间', trigger: ['blur']}
                    ],
                                          outTime: [
                        {required: true, message: '请输入外出时长（天）', trigger: ['blur']}
                    ],
                                          type: [
                        {required: true, message: '请输入出行方式(1-公共交通 2-出租车 3-自驾  4-公司车辆)', trigger: ['blur']}
                    ],
                                          reason: [
                        {required: true, message: '请输入事由', trigger: ['blur']}
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
                    ajax.get('adm/admout/' + this.$route.query.id).then(rs => {
                        this.admoutForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admoutForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admout', data).then(rs => {
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

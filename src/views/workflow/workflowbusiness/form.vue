<template>
    <div class="form-panel">
        <el-form :model="workflowbusinessForm" :rules="rules" ref="workflowbusinessForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="流程业务表" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键ID" prop="id">
                            <el-input v-model="workflowbusinessForm.id" placeholder="请输入主键ID" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="类型（1-请假  2-外出 3-出差  4-用车 5-用印  6-开票  7-宴请  8-费用报销 9-借支  10-差旅 11-付款）" prop="type">
                            <el-input v-model="workflowbusinessForm.type" placeholder="请输入类型（1-请假  2-外出 3-出差  4-用车 5-用印  6-开票  7-宴请  8-费用报销 9-借支  10-差旅 11-付款）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="名称" prop="name">
                            <el-input v-model="workflowbusinessForm.name" placeholder="请输入名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="流程实例key" prop="processKey">
                            <el-input v-model="workflowbusinessForm.processKey" placeholder="请输入流程实例key" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态（0-删除，1-正常）" prop="status">
                            <el-input v-model="workflowbusinessForm.status" placeholder="请输入数据状态（0-删除，1-正常）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="creater">
                            <el-input v-model="workflowbusinessForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="createTime">
                            <el-input v-model="workflowbusinessForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="workflowbusinessForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="workflowbusinessForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="submitForm('workflowbusinessForm')">保存</el-button>
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
                    workflowbusinessForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键ID', trigger: ['blur']}
                    ],
                                          type: [
                        {required: true, message: '请输入类型（1-请假  2-外出 3-出差  4-用车 5-用印  6-开票  7-宴请  8-费用报销 9-借支  10-差旅 11-付款）', trigger: ['blur']}
                    ],
                                          name: [
                        {required: true, message: '请输入名称', trigger: ['blur']}
                    ],
                                          processKey: [
                        {required: true, message: '请输入流程实例key', trigger: ['blur']}
                    ],
                                          status: [
                        {required: true, message: '请输入数据状态（0-删除，1-正常）', trigger: ['blur']}
                    ],
                                          creater: [
                        {required: true, message: '请输入创建人', trigger: ['blur']}
                    ],
                                          createTime: [
                        {required: true, message: '请输入创建时间', trigger: ['blur']}
                    ],
                                          updater: [
                        {required: true, message: '请输入修改人', trigger: ['blur']}
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
                    ajax.get('workflow/workflowbusiness/' + this.$route.query.id).then(rs => {
                        this.workflowbusinessForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.workflowbusinessForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('workflow/workflowbusiness', data).then(rs => {
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

<template>
    <div class="form-panel">
        <el-form :model="projectsubForm" :rules="rules" ref="projectsubForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目子表" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键id" prop="guidePrice">
                            <el-input v-model="projectsubForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="项目id" prop="guidePrice">
                            <el-input v-model="projectsubForm.projectId" placeholder="请输入项目id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="编号" prop="guidePrice">
                            <el-input v-model="projectsubForm.code" placeholder="请输入编号" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="名称" prop="guidePrice">
                            <el-input v-model="projectsubForm.name" placeholder="请输入名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="类型（1-输电线路工程，2-变电站工程）" prop="guidePrice">
                            <el-input v-model="projectsubForm.type" placeholder="请输入类型（1-输电线路工程，2-变电站工程）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="计划开始日期" prop="guidePrice">
                            <el-input v-model="projectsubForm.startDate" placeholder="请输入计划开始日期" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="计划结束日期" prop="guidePrice">
                            <el-input v-model="projectsubForm.endDate" placeholder="请输入计划结束日期" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="guidePrice">
                            <el-input v-model="projectsubForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="guidePrice">
                            <el-input v-model="projectsubForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="guidePrice">
                            <el-input v-model="projectsubForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="guidePrice">
                            <el-input v-model="projectsubForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="guidePrice">
                            <el-input v-model="projectsubForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('projectsubForm')">保存</el-button>
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
                    projectsubForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键id', trigger: ['blur']}
                    ],
                                          projectId: [
                        {required: true, message: '请输入项目id', trigger: ['blur']}
                    ],
                                          code: [
                        {required: true, message: '请输入编号', trigger: ['blur']}
                    ],
                                          name: [
                        {required: true, message: '请输入名称', trigger: ['blur']}
                    ],
                                          type: [
                        {required: true, message: '请输入类型（1-输电线路工程，2-变电站工程）', trigger: ['blur']}
                    ],
                                          startDate: [
                        {required: true, message: '请输入计划开始日期', trigger: ['blur']}
                    ],
                                          endDate: [
                        {required: true, message: '请输入计划结束日期', trigger: ['blur']}
                    ],
                                          status: [
                        {required: true, message: '请输入数据状态(0-删除，1-正常)', trigger: ['blur']}
                    ],
                                          creater: [
                        {required: true, message: '请输入创建人', trigger: ['blur']}
                    ],
                                          updater: [
                        {required: true, message: '请输入修改人', trigger: ['blur']}
                    ],
                                          createTime: [
                        {required: true, message: '请输入创建时间', trigger: ['blur']}
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
                    ajax.get('core/projectsub/' + this.$route.query.id).then(rs => {
                        this.projectsubForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.projectsubForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/projectsub', data).then(rs => {
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

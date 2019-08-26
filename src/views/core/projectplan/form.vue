<template>
    <div class="form-panel">
        <el-form :model="projectplanForm" :rules="rules" ref="projectplanForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目计划" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键id" prop="guidePrice">
                            <el-input v-model="projectplanForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="项目id" prop="guidePrice">
                            <el-input v-model="projectplanForm.projectId" placeholder="请输入项目id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="节点名称" prop="guidePrice">
                            <el-input v-model="projectplanForm.name" placeholder="请输入节点名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="节点级别（1- 一级（工作内容），2-二级（单位工程），3-三级（分部工程））" prop="guidePrice">
                            <el-input v-model="projectplanForm.level" placeholder="请输入节点级别（1- 一级（工作内容），2-二级（单位工程），3-三级（分部工程））" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="父节点id" prop="guidePrice">
                            <el-input v-model="projectplanForm.parentId" placeholder="请输入父节点id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="计划开始日期" prop="guidePrice">
                            <el-input v-model="projectplanForm.planStartDate" placeholder="请输入计划开始日期" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="计划结束日期" prop="guidePrice">
                            <el-input v-model="projectplanForm.planEndDate" placeholder="请输入计划结束日期" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="实际开始日期" prop="guidePrice">
                            <el-input v-model="projectplanForm.actualStartDate" placeholder="请输入实际开始日期" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="实际结束日期" prop="guidePrice">
                            <el-input v-model="projectplanForm.actualEndDate" placeholder="请输入实际结束日期" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="是否默认展示（0-否，1-是）" prop="guidePrice">
                            <el-input v-model="projectplanForm.isShow" placeholder="请输入是否默认展示（0-否，1-是）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="关联节点的id(紧后id)" prop="guidePrice">
                            <el-input v-model="projectplanForm.afterId" placeholder="请输入关联节点的id(紧后id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="完成状态（1-未开始，2-进行中，3-已完成）" prop="guidePrice">
                            <el-input v-model="projectplanForm.completionStatus" placeholder="请输入完成状态（1-未开始，2-进行中，3-已完成）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="预警状态(0-未预警，1-已预警)" prop="guidePrice">
                            <el-input v-model="projectplanForm.warnStatus" placeholder="请输入预警状态(0-未预警，1-已预警)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="排序号" prop="guidePrice">
                            <el-input v-model="projectplanForm.sortNum" placeholder="请输入排序号" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="完成百分比" prop="guidePrice">
                            <el-input v-model="projectplanForm.percent" placeholder="请输入完成百分比" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="guidePrice">
                            <el-input v-model="projectplanForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="guidePrice">
                            <el-input v-model="projectplanForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="guidePrice">
                            <el-input v-model="projectplanForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="guidePrice">
                            <el-input v-model="projectplanForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="guidePrice">
                            <el-input v-model="projectplanForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('projectplanForm')">保存</el-button>
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
                    projectplanForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键id', trigger: ['blur']}
                    ],
                                          projectId: [
                        {required: true, message: '请输入项目id', trigger: ['blur']}
                    ],
                                          name: [
                        {required: true, message: '请输入节点名称', trigger: ['blur']}
                    ],
                                          level: [
                        {required: true, message: '请输入节点级别（1- 一级（工作内容），2-二级（单位工程），3-三级（分部工程））', trigger: ['blur']}
                    ],
                                          parentId: [
                        {required: true, message: '请输入父节点id', trigger: ['blur']}
                    ],
                                          planStartDate: [
                        {required: true, message: '请输入计划开始日期', trigger: ['blur']}
                    ],
                                          planEndDate: [
                        {required: true, message: '请输入计划结束日期', trigger: ['blur']}
                    ],
                                          actualStartDate: [
                        {required: true, message: '请输入实际开始日期', trigger: ['blur']}
                    ],
                                          actualEndDate: [
                        {required: true, message: '请输入实际结束日期', trigger: ['blur']}
                    ],
                                          isShow: [
                        {required: true, message: '请输入是否默认展示（0-否，1-是）', trigger: ['blur']}
                    ],
                                          afterId: [
                        {required: true, message: '请输入关联节点的id(紧后id)', trigger: ['blur']}
                    ],
                                          completionStatus: [
                        {required: true, message: '请输入完成状态（1-未开始，2-进行中，3-已完成）', trigger: ['blur']}
                    ],
                                          warnStatus: [
                        {required: true, message: '请输入预警状态(0-未预警，1-已预警)', trigger: ['blur']}
                    ],
                                          sortNum: [
                        {required: true, message: '请输入排序号', trigger: ['blur']}
                    ],
                                          percent: [
                        {required: true, message: '请输入完成百分比', trigger: ['blur']}
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
                    ajax.get('core/projectplan/' + this.$route.query.id).then(rs => {
                        this.projectplanForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.projectplanForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/projectplan', data).then(rs => {
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

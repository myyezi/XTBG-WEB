<template>
    <div class="form-panel">
        <el-form :model="projectbigeventForm" :rules="rules" ref="projectbigeventForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="大事记" name="1">
                    <div class="flex-panel">
                        <el-form-item label="选择项目" prop="projectId">
                            <el-select v-model="projectbigeventForm.projectId" filterable clearable placeholder="请选择项目">
                                <el-option
                                    v-for="item in projectList"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="事件日期" prop="eventDate">
                            <el-date-picker v-model="projectbigeventForm.eventDate" type="date" placeholder="选择事件日期"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="事件描述" prop="description" class="big">
                            <el-input type="textarea" :rows="4" v-model="projectbigeventForm.description" placeholder="请输入事件描述" maxlength=200 clearable></el-input>
                        </el-form-item>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('projectbigeventForm')">保存</el-button>
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
                projectbigeventForm: {
                    eventDate: '',
                },
                projectList: [],
                openCollapse: ["1"],//默认打开的面板
                rules: {
                    projectId: [
                        {required: true, message: '请选择项目', trigger: ['blur']}
                    ],
                    eventDate: [
                        {required: true, message: '请输入事件日期', trigger: ['blur']}
                    ],
                    description: [
                        {required: true, message: '请输入事件描述', trigger: ['blur']}
                    ],
                }
            }
        },
        mounted() {
            this.open();
            this.getProjectList();
        },
        methods: {

            //获取项目
            getProjectList() {
                ajax.get('core/projectreportweekly/getProjectList').then(rs => {
                    this.projectList = rs.data;
                });
            },
            //进入编辑页调用 bean为列表页传入数据
            open() {
                if (this.$route.query.id) {
                    ajax.get('core/projectbigevent/' + this.$route.query.id).then(rs => {
                        this.projectbigeventForm = rs.data;
                    });
                } else {
                    this.projectbigeventForm.eventDate = new Date().format('yyyy-MM-dd');
                }
            },

            //保存
            submitForm(form) {
                var data = this.projectbigeventForm;
                this.$refs[form].validate((valid) => {
                    if (!valid) {
                        this.$message.error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/projectbigevent', data).then(rs => {
                        if (rs.status == 0) {
                            this.$message.success(rs.msg);
                            this.close();
                        } else {
                            this.$message.error(rs.msg);
                        }
                    });
                });
            },
        },
    }
</script>

<template>
    <div class="form-panel">
        <el-form :model="admcourseForm" :rules="rules" ref="admcourseForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="课程管理" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admcourseForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
                            <el-input v-model="admcourseForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="对象(1-所有人 2-指定员工)" prop="source">
                            <el-input v-model="admcourseForm.source" placeholder="请输入对象(1-所有人 2-指定员工)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="标题" prop="title">
                            <el-input v-model="admcourseForm.title" placeholder="请输入标题" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="内容" prop="content">
                            <el-input v-model="admcourseForm.content" placeholder="请输入内容" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="发布时间" prop="publishTime">
                            <el-input v-model="admcourseForm.publishTime" placeholder="请输入发布时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="阅读量" prop="readCount">
                            <el-input v-model="admcourseForm.readCount" placeholder="请输入阅读量" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="课程状态(1-未发布 2-已发布)" prop="courseStatus">
                            <el-input v-model="admcourseForm.courseStatus" placeholder="请输入课程状态(1-未发布 2-已发布)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admcourseForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="creater">
                            <el-input v-model="admcourseForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="admcourseForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="admcourseForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="admcourseForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admcourseForm')">保存</el-button>
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
                    admcourseForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          companyId: [
                        {required: true, message: '请输入所属管理公司(组织表管理公司id)', trigger: ['blur']}
                    ],
                                          source: [
                        {required: true, message: '请输入对象(1-所有人 2-指定员工)', trigger: ['blur']}
                    ],
                                          title: [
                        {required: true, message: '请输入标题', trigger: ['blur']}
                    ],
                                          content: [
                        {required: true, message: '请输入内容', trigger: ['blur']}
                    ],
                                          publishTime: [
                        {required: true, message: '请输入发布时间', trigger: ['blur']}
                    ],
                                          readCount: [
                        {required: true, message: '请输入阅读量', trigger: ['blur']}
                    ],
                                          courseStatus: [
                        {required: true, message: '请输入课程状态(1-未发布 2-已发布)', trigger: ['blur']}
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
                    ajax.get('adm/admcourse/' + this.$route.query.id).then(rs => {
                        this.admcourseForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admcourseForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admcourse', data).then(rs => {
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

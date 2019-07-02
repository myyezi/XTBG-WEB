<template>
    <div class="form-panel">
        <el-form :model="projecttemplateForm" :rules="rules" ref="projecttemplateForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目文档模板" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键id" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="父节点id" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.parentId" placeholder="请输入父节点id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="类目号" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.code" placeholder="请输入类目号" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="类目名称" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.name" placeholder="请输入类目名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="归档文件内容" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.content" placeholder="请输入归档文件内容" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="立卷单位" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.filingCompany" placeholder="请输入立卷单位" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="建设单位保存期限" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.constructionDeadline" placeholder="请输入建设单位保存期限" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="运行单位保存期限" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.operationDeadline" placeholder="请输入运行单位保存期限" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="guidePrice">
                            <el-input v-model="projecttemplateForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('projecttemplateForm')">保存</el-button>
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
                    projecttemplateForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键id', trigger: ['blur']}
                    ],
                                          parentId: [
                        {required: true, message: '请输入父节点id', trigger: ['blur']}
                    ],
                                          code: [
                        {required: true, message: '请输入类目号', trigger: ['blur']}
                    ],
                                          name: [
                        {required: true, message: '请输入类目名称', trigger: ['blur']}
                    ],
                                          content: [
                        {required: true, message: '请输入归档文件内容', trigger: ['blur']}
                    ],
                                          filingCompany: [
                        {required: true, message: '请输入立卷单位', trigger: ['blur']}
                    ],
                                          constructionDeadline: [
                        {required: true, message: '请输入建设单位保存期限', trigger: ['blur']}
                    ],
                                          operationDeadline: [
                        {required: true, message: '请输入运行单位保存期限', trigger: ['blur']}
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
                    ajax.get('archive/projecttemplate/' + this.$route.query.id).then(rs => {
                        this.projecttemplateForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.projecttemplateForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('archive/projecttemplate', data).then(rs => {
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

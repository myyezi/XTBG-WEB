<template>
    <div class="form-panel">
        <el-form :model="projectplandocumentForm" :rules="rules" ref="projectplandocumentForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目计划文档结构" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键id" prop="guidePrice">
                            <el-input v-model="projectplandocumentForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="项目计划id" prop="guidePrice">
                            <el-input v-model="projectplandocumentForm.planId" placeholder="请输入项目计划id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="类目编号" prop="guidePrice">
                            <el-input v-model="projectplandocumentForm.code" placeholder="请输入类目编号" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="类目名称" prop="guidePrice">
                            <el-input v-model="projectplandocumentForm.name" placeholder="请输入类目名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="需归档文件内容" prop="guidePrice">
                            <el-input v-model="projectplandocumentForm.content" placeholder="请输入需归档文件内容" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="立卷单位" prop="guidePrice">
                            <el-input v-model="projectplandocumentForm.filingCompany" placeholder="请输入立卷单位" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="guidePrice">
                            <el-input v-model="projectplandocumentForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="guidePrice">
                            <el-input v-model="projectplandocumentForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="guidePrice">
                            <el-input v-model="projectplandocumentForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="guidePrice">
                            <el-input v-model="projectplandocumentForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="guidePrice">
                            <el-input v-model="projectplandocumentForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('projectplandocumentForm')">保存</el-button>
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
                    projectplandocumentForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键id', trigger: ['blur']}
                    ],
                                          planId: [
                        {required: true, message: '请输入项目计划id', trigger: ['blur']}
                    ],
                                          code: [
                        {required: true, message: '请输入类目编号', trigger: ['blur']}
                    ],
                                          name: [
                        {required: true, message: '请输入类目名称', trigger: ['blur']}
                    ],
                                          content: [
                        {required: true, message: '请输入需归档文件内容', trigger: ['blur']}
                    ],
                                          filingCompany: [
                        {required: true, message: '请输入立卷单位', trigger: ['blur']}
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
                    ajax.get('core/projectplandocument/' + this.$route.query.id).then(rs => {
                        this.projectplandocumentForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.projectplandocumentForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/projectplandocument', data).then(rs => {
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

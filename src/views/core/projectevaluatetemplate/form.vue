<template>
    <div class="form-panel">
        <el-form :model="projectevaluatetemplateForm" :rules="rules" ref="projectevaluatetemplateForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目评价管理模板" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="上级节点名称：" prop="parentId">
                            <el-input disabled="isDisabled" v-model="projectevaluatetemplateForm.parentId" placeholder="请输入上级节点名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="指标序号：" prop="code">
                            <el-input v-model="projectevaluatetemplateForm.code" placeholder="请输入指标序号" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="评价指标：" prop="title">
                            <el-input v-model="projectevaluatetemplateForm.title" placeholder="请输入评价指标" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="指标分值：" prop="indexScore">
                            <el-input v-model="projectevaluatetemplateForm.indexScore" placeholder="请输入指标分值" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="考核内容及评分标准：" prop="content">
                            <el-input type="textarea" v-model="projectevaluatetemplateForm.content" placeholder="请输入考核内容及评分标准" maxlength=30 clearable></el-input>
                        </el-form-item>

                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('projectevaluatetemplateForm')">保存</el-button>
                <el-button @click="close">取消</el-button>
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
                    projectevaluatetemplateForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          code: [
                        {required: true, message: '请输入指标序号', trigger: ['blur']}
                    ],
                                          title: [
                        {required: true, message: '请输入评价指标标题', trigger: ['blur']}
                    ],
                                          content: [
                        {required: true, message: '请输入考核内容及评分标准', trigger: ['blur']}
                    ],
                                          indexScore: [
                        {required: true, message: '请输入指标分值', trigger: ['blur']}
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
                    ajax.get('core/projectevaluatetemplate/' + this.$route.query.id).then(rs => {
                        this.projectevaluatetemplateForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.projectevaluatetemplateForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/projectevaluatetemplate', data).then(rs => {
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

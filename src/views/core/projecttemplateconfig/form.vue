<template>
    <div class="form-panel">
        <el-form :model="projecttemplateconfigForm" :rules="rules" ref="projecttemplateconfigForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目计划模板设置" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键id" prop="guidePrice">
                            <el-input v-model="projecttemplateconfigForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="模板id" prop="guidePrice">
                            <el-input v-model="projecttemplateconfigForm.templateId" placeholder="请输入模板id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="节点名称" prop="guidePrice">
                            <el-input v-model="projecttemplateconfigForm.name" placeholder="请输入节点名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="节点级别（1- 一级（工作内容），2-二级（单位工程），3-三级（分布工程））" prop="guidePrice">
                            <el-input v-model="projecttemplateconfigForm.level" placeholder="请输入节点级别（1- 一级（工作内容），2-二级（单位工程），3-三级（分布工程））" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="父节点id" prop="guidePrice">
                            <el-input v-model="projecttemplateconfigForm.parentId" placeholder="请输入父节点id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="排序号" prop="guidePrice">
                            <el-input v-model="projecttemplateconfigForm.sortNum" placeholder="请输入排序号" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="guidePrice">
                            <el-input v-model="projecttemplateconfigForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="guidePrice">
                            <el-input v-model="projecttemplateconfigForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="guidePrice">
                            <el-input v-model="projecttemplateconfigForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="guidePrice">
                            <el-input v-model="projecttemplateconfigForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="guidePrice">
                            <el-input v-model="projecttemplateconfigForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('projecttemplateconfigForm')">保存</el-button>
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
                    projecttemplateconfigForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键id', trigger: ['blur']}
                    ],
                                          templateId: [
                        {required: true, message: '请输入模板id', trigger: ['blur']}
                    ],
                                          name: [
                        {required: true, message: '请输入节点名称', trigger: ['blur']}
                    ],
                                          level: [
                        {required: true, message: '请输入节点级别（1- 一级（工作内容），2-二级（单位工程），3-三级（分布工程））', trigger: ['blur']}
                    ],
                                          parentId: [
                        {required: true, message: '请输入父节点id', trigger: ['blur']}
                    ],
                                          sortNum: [
                        {required: true, message: '请输入排序号', trigger: ['blur']}
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
                    ajax.get('core/projecttemplateconfig/' + this.$route.query.id).then(rs => {
                        this.projecttemplateconfigForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.projecttemplateconfigForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/projecttemplateconfig', data).then(rs => {
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

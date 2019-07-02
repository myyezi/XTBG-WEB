<template>
    <div class="form-panel">
        <el-form :model="projecttemplateForm" :rules="rules" ref="projecttemplateForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目计划模板" name="1">
                    <div class="flex-panel">
                        <el-form-item label="模板类型" prop="type">
                            <el-select v-model="projecttemplateForm.type" clearable placeholder="请选择模板类型">
                                <el-option  label="输变电工程110KV" :value="1"></el-option>
                                <el-option  label="输变电工程220KV" :value="2"></el-option>
                            </el-select>
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
                    type: [
                        {required: true, message: '请选择项目类型', trigger: ['blur']}
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
                    ajax.get('core/projecttemplate/save' + this.$route.query.id).then(rs => {
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
                    ajax.post('core/projecttemplate', data).then(rs => {
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

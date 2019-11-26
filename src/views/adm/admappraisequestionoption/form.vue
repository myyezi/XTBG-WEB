<template>
    <div class="form-panel">
        <el-form :model="admappraisequestionoptionForm" :rules="rules" ref="admappraisequestionoptionForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="考核管理_考题选项表" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admappraisequestionoptionForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="考核ID" prop="appraiseId">
                            <el-input v-model="admappraisequestionoptionForm.appraiseId" placeholder="请输入考核ID" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="选项内容" prop="text">
                            <el-input v-model="admappraisequestionoptionForm.text" placeholder="请输入选项内容" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="排序" prop="sort">
                            <el-input v-model="admappraisequestionoptionForm.sort" placeholder="请输入排序" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admappraisequestionoptionForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="选项值" prop="value">
                            <el-input v-model="admappraisequestionoptionForm.value" placeholder="请输入选项值" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="选项图片（图片地址）" prop="picture">
                            <el-input v-model="admappraisequestionoptionForm.picture" placeholder="请输入选项图片（图片地址）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请人" prop="creater">
                            <el-input v-model="admappraisequestionoptionForm.creater" placeholder="请输入申请人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="admappraisequestionoptionForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="admappraisequestionoptionForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="admappraisequestionoptionForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="考核题目ID" prop="appraiseQuestionId">
                            <el-input v-model="admappraisequestionoptionForm.appraiseQuestionId" placeholder="请输入考核题目ID" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admappraisequestionoptionForm')">保存</el-button>
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
                    admappraisequestionoptionForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          appraiseId: [
                        {required: true, message: '请输入考核ID', trigger: ['blur']}
                    ],
                                          text: [
                        {required: true, message: '请输入选项内容', trigger: ['blur']}
                    ],
                                          sort: [
                        {required: true, message: '请输入排序', trigger: ['blur']}
                    ],
                                          status: [
                        {required: true, message: '请输入数据状态(0-删除，1-正常)', trigger: ['blur']}
                    ],
                                          value: [
                        {required: true, message: '请输入选项值', trigger: ['blur']}
                    ],
                                          picture: [
                        {required: true, message: '请输入选项图片（图片地址）', trigger: ['blur']}
                    ],
                                          creater: [
                        {required: true, message: '请输入申请人', trigger: ['blur']}
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
                                          appraiseQuestionId: [
                        {required: true, message: '请输入考核题目ID', trigger: ['blur']}
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
                    ajax.get('adm/admappraisequestionoption/' + this.$route.query.id).then(rs => {
                        this.admappraisequestionoptionForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admappraisequestionoptionForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admappraisequestionoption', data).then(rs => {
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

<template>
    <div class="form-panel">
        <el-form :model="admappraisequestionForm" :rules="rules" ref="admappraisequestionForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="考核管理_考题" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admappraisequestionForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
                            <el-input v-model="admappraisequestionForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="考核表ID" prop="appraiseId">
                            <el-input v-model="admappraisequestionForm.appraiseId" placeholder="请输入考核表ID" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="标题" prop="title">
                            <el-input v-model="admappraisequestionForm.title" placeholder="请输入标题" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="类型（1-单选，2-多选）" prop="type">
                            <el-input v-model="admappraisequestionForm.type" placeholder="请输入类型（1-单选，2-多选）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="正确答案" prop="answer">
                            <el-input v-model="admappraisequestionForm.answer" placeholder="请输入正确答案" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="排序" prop="sort">
                            <el-input v-model="admappraisequestionForm.sort" placeholder="请输入排序" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admappraisequestionForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="creater">
                            <el-input v-model="admappraisequestionForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="admappraisequestionForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="admappraisequestionForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="admappraisequestionForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admappraisequestionForm')">保存</el-button>
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
                    admappraisequestionForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          companyId: [
                        {required: true, message: '请输入所属管理公司(组织表管理公司id)', trigger: ['blur']}
                    ],
                                          appraiseId: [
                        {required: true, message: '请输入考核表ID', trigger: ['blur']}
                    ],
                                          title: [
                        {required: true, message: '请输入标题', trigger: ['blur']}
                    ],
                                          type: [
                        {required: true, message: '请输入类型（1-单选，2-多选）', trigger: ['blur']}
                    ],
                                          answer: [
                        {required: true, message: '请输入正确答案', trigger: ['blur']}
                    ],
                                          sort: [
                        {required: true, message: '请输入排序', trigger: ['blur']}
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
                    ajax.get('adm/admappraisequestion/' + this.$route.query.id).then(rs => {
                        this.admappraisequestionForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admappraisequestionForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admappraisequestion', data).then(rs => {
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

<template>
    <div class="form-panel">
        <el-form :model="checkdetailForm" :rules="rules" ref="checkdetailForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="质量检查问题明细" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键id" prop="guidePrice">
                            <el-input v-model="checkdetailForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="问题单id" prop="guidePrice">
                            <el-input v-model="checkdetailForm.checkId" placeholder="请输入问题单id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="问题" prop="guidePrice">
                            <el-input v-model="checkdetailForm.title" placeholder="请输入问题" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="责任单位" prop="guidePrice">
                            <el-input v-model="checkdetailForm.responsibleCompany" placeholder="请输入责任单位" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="要求整改日期" prop="guidePrice">
                            <el-input v-model="checkdetailForm.rectifyDate" placeholder="请输入要求整改日期" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="guidePrice">
                            <el-input v-model="checkdetailForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="guidePrice">
                            <el-input v-model="checkdetailForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="guidePrice">
                            <el-input v-model="checkdetailForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="guidePrice">
                            <el-input v-model="checkdetailForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="guidePrice">
                            <el-input v-model="checkdetailForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('checkdetailForm')">保存</el-button>
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
                    checkdetailForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键id', trigger: ['blur']}
                    ],
                                          checkId: [
                        {required: true, message: '请输入问题单id', trigger: ['blur']}
                    ],
                                          title: [
                        {required: true, message: '请输入问题', trigger: ['blur']}
                    ],
                                          responsibleCompany: [
                        {required: true, message: '请输入责任单位', trigger: ['blur']}
                    ],
                                          rectifyDate: [
                        {required: true, message: '请输入要求整改日期', trigger: ['blur']}
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
                    ajax.get('qsm/checkdetail/' + this.$route.query.id).then(rs => {
                        this.checkdetailForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.checkdetailForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('qsm/checkdetail', data).then(rs => {
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

<template>
    <div class="form-panel">
        <el-form :model="checkrectifydetailForm" :rules="rules" ref="checkrectifydetailForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="安全检查整改单明细" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键id" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="整改单id" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.checkRectifyId" placeholder="请输入整改单id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="问题单明细id" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.checkDetailId" placeholder="请输入问题单明细id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="问题" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.title" placeholder="请输入问题" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="责任单位" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.responsibleCompany" placeholder="请输入责任单位" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="整改日期" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.rectifyDate" placeholder="请输入整改日期" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="整改情况" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.rectifySituation" placeholder="请输入整改情况" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="整改单位" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.rectifyCompany" placeholder="请输入整改单位" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="整改负责人" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.rectifyPerson" placeholder="请输入整改负责人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="整改时间" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.rectifyTime" placeholder="请输入整改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="guidePrice">
                            <el-input v-model="checkrectifydetailForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('checkrectifydetailForm')">保存</el-button>
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
                    checkrectifydetailForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键id', trigger: ['blur']}
                    ],
                                          checkRectifyId: [
                        {required: true, message: '请输入整改单id', trigger: ['blur']}
                    ],
                                          checkDetailId: [
                        {required: true, message: '请输入问题单明细id', trigger: ['blur']}
                    ],
                                          title: [
                        {required: true, message: '请输入问题', trigger: ['blur']}
                    ],
                                          responsibleCompany: [
                        {required: true, message: '请输入责任单位', trigger: ['blur']}
                    ],
                                          rectifyDate: [
                        {required: true, message: '请输入整改日期', trigger: ['blur']}
                    ],
                                          rectifySituation: [
                        {required: true, message: '请输入整改情况', trigger: ['blur']}
                    ],
                                          rectifyCompany: [
                        {required: true, message: '请输入整改单位', trigger: ['blur']}
                    ],
                                          rectifyPerson: [
                        {required: true, message: '请输入整改负责人', trigger: ['blur']}
                    ],
                                          rectifyTime: [
                        {required: true, message: '请输入整改时间', trigger: ['blur']}
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
                    ajax.get('qsm/checkrectifydetail/' + this.$route.query.id).then(rs => {
                        this.checkrectifydetailForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.checkrectifydetailForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('qsm/checkrectifydetail', data).then(rs => {
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

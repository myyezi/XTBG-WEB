<template>
    <div class="form-panel">
        <el-form :model="coreprojectevaluatedetailForm" :rules="rules" ref="coreprojectevaluatedetailForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目部综合评价明细" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键id" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="评价主表id" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.projectEvaluateId" placeholder="请输入评价主表id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="父节点id" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.parentId" placeholder="请输入父节点id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="指标序号" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.code" placeholder="请输入指标序号" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="评价指标标题" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.title" placeholder="请输入评价指标标题" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="考核内容及评分标准" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.content" placeholder="请输入考核内容及评分标准" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="指标分值" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.indexScore" placeholder="请输入指标分值" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="扣分" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.deductScore" placeholder="请输入扣分" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="扣分原因" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.deductReason" placeholder="请输入扣分原因" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="guidePrice">
                            <el-input v-model="coreprojectevaluatedetailForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('coreprojectevaluatedetailForm')">保存</el-button>
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
                    coreprojectevaluatedetailForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键id', trigger: ['blur']}
                    ],
                                          projectEvaluateId: [
                        {required: true, message: '请输入评价主表id', trigger: ['blur']}
                    ],
                                          parentId: [
                        {required: true, message: '请输入父节点id', trigger: ['blur']}
                    ],
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
                                          deductScore: [
                        {required: true, message: '请输入扣分', trigger: ['blur']}
                    ],
                                          deductReason: [
                        {required: true, message: '请输入扣分原因', trigger: ['blur']}
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
                    ajax.get('generator/projectevaluatedetail/' + this.$route.query.id).then(rs => {
                        this.coreprojectevaluatedetailForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.coreprojectevaluatedetailForm;
                this.$refs\[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('generator/projectevaluatedetail', data).then(rs => {
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

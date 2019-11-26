<template>
    <div class="form-panel">
        <el-form :model="admpurchaseForm" :rules="rules" ref="admpurchaseForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="采购管理" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admpurchaseForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
                            <el-input v-model="admpurchaseForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="采购物品（物品字典表ID）" prop="goodsId">
                            <el-input v-model="admpurchaseForm.goodsId" placeholder="请输入采购物品（物品字典表ID）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="采购数量" prop="num">
                            <el-input v-model="admpurchaseForm.num" placeholder="请输入采购数量" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="期望采购时间" prop="hopePurchaseTime">
                            <el-input v-model="admpurchaseForm.hopePurchaseTime" placeholder="请输入期望采购时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="采购状态" prop="purchaseStatus">
                            <el-input v-model="admpurchaseForm.purchaseStatus" placeholder="请输入采购状态" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="采购金额" prop="amount">
                            <el-input v-model="admpurchaseForm.amount" placeholder="请输入采购金额" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="供应商" prop="supplierId">
                            <el-input v-model="admpurchaseForm.supplierId" placeholder="请输入供应商" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="采购事由" prop="reason">
                            <el-input v-model="admpurchaseForm.reason" placeholder="请输入采购事由" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="入库状态" prop="stockInStatus">
                            <el-input v-model="admpurchaseForm.stockInStatus" placeholder="请输入入库状态" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admpurchaseForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请人" prop="creater">
                            <el-input v-model="admpurchaseForm.creater" placeholder="请输入申请人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="admpurchaseForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="admpurchaseForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="admpurchaseForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admpurchaseForm')">保存</el-button>
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
                    admpurchaseForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          companyId: [
                        {required: true, message: '请输入所属管理公司(组织表管理公司id)', trigger: ['blur']}
                    ],
                                          goodsId: [
                        {required: true, message: '请输入采购物品（物品字典表ID）', trigger: ['blur']}
                    ],
                                          num: [
                        {required: true, message: '请输入采购数量', trigger: ['blur']}
                    ],
                                          hopePurchaseTime: [
                        {required: true, message: '请输入期望采购时间', trigger: ['blur']}
                    ],
                                          purchaseStatus: [
                        {required: true, message: '请输入采购状态', trigger: ['blur']}
                    ],
                                          amount: [
                        {required: true, message: '请输入采购金额', trigger: ['blur']}
                    ],
                                          supplierId: [
                        {required: true, message: '请输入供应商', trigger: ['blur']}
                    ],
                                          reason: [
                        {required: true, message: '请输入采购事由', trigger: ['blur']}
                    ],
                                          stockInStatus: [
                        {required: true, message: '请输入入库状态', trigger: ['blur']}
                    ],
                                          status: [
                        {required: true, message: '请输入数据状态(0-删除，1-正常)', trigger: ['blur']}
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
                    ajax.get('adm/admpurchase/' + this.$route.query.id).then(rs => {
                        this.admpurchaseForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admpurchaseForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admpurchase', data).then(rs => {
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

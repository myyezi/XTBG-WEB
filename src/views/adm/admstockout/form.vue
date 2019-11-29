<template>
    <div class="form-panel">
        <el-form :model="admstockoutForm" :rules="rules" ref="admstockoutForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="出库管理" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admstockoutForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
                            <el-input v-model="admstockoutForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="采购物品（物品字典表ID）" prop="goodsId">
                            <el-input v-model="admstockoutForm.goodsId" placeholder="请输入采购物品（物品字典表ID）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="出库数量" prop="num">
                            <el-input v-model="admstockoutForm.num" placeholder="请输入出库数量" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="期望出库日期" prop="hopeStockOutTime">
                            <el-input v-model="admstockoutForm.hopeStockOutTime" placeholder="请输入期望出库日期" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="出库事由" prop="reason">
                            <el-input v-model="admstockoutForm.reason" placeholder="请输入出库事由" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="出库人" prop="stockOutUser">
                            <el-input v-model="admstockoutForm.stockOutUser" placeholder="请输入出库人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="出库时间" prop="stockOutTime">
                            <el-input v-model="admstockoutForm.stockOutTime" placeholder="请输入出库时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admstockoutForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请人" prop="creater">
                            <el-input v-model="admstockoutForm.creater" placeholder="请输入申请人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="admstockoutForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="admstockoutForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="admstockoutForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admstockoutForm')">保存</el-button>
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
                    admstockoutForm: {},
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
                        {required: true, message: '请输入出库数量', trigger: ['blur']}
                    ],
                                          hopeStockOutTime: [
                        {required: true, message: '请输入期望出库日期', trigger: ['blur']}
                    ],
                                          reason: [
                        {required: true, message: '请输入出库事由', trigger: ['blur']}
                    ],
                                          stockOutUser: [
                        {required: true, message: '请输入出库人', trigger: ['blur']}
                    ],
                                          stockOutTime: [
                        {required: true, message: '请输入出库时间', trigger: ['blur']}
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
                    ajax.get('adm/admstockout/' + this.$route.query.id).then(rs => {
                        this.admstockoutForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admstockoutForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admstockout', data).then(rs => {
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

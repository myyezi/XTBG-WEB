<template>
    <div class="form-panel">
        <el-form :model="admstockForm" :rules="rules" ref="admstockForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="库存管理" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admstockForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
                            <el-input v-model="admstockForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="采购物品（物品字典表ID）" prop="goodsId">
                            <el-input v-model="admstockForm.goodsId" placeholder="请输入采购物品（物品字典表ID）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数量" prop="num">
                            <el-input v-model="admstockForm.num" placeholder="请输入数量" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="预警阀值" prop="warningNum">
                            <el-input v-model="admstockForm.warningNum" placeholder="请输入预警阀值" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="缺货阀值" prop="shortageNum">
                            <el-input v-model="admstockForm.shortageNum" placeholder="请输入缺货阀值" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="库存状态（1-正常，2-预警）" prop="stockStatus">
                            <el-input v-model="admstockForm.stockStatus" placeholder="请输入库存状态（1-正常，2-预警）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admstockForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请人" prop="creater">
                            <el-input v-model="admstockForm.creater" placeholder="请输入申请人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="admstockForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="admstockForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="admstockForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admstockForm')">保存</el-button>
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
                    admstockForm: {},
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
                        {required: true, message: '请输入数量', trigger: ['blur']}
                    ],
                                          warningNum: [
                        {required: true, message: '请输入预警阀值', trigger: ['blur']}
                    ],
                                          shortageNum: [
                        {required: true, message: '请输入缺货阀值', trigger: ['blur']}
                    ],
                                          stockStatus: [
                        {required: true, message: '请输入库存状态（1-正常，2-预警）', trigger: ['blur']}
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
                    ajax.get('adm/admstock/' + this.$route.query.id).then(rs => {
                        this.admstockForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admstockForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admstock', data).then(rs => {
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

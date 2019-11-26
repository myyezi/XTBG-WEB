<template>
    <div class="form-panel">
        <el-form :model="admstockrecordForm" :rules="rules" ref="admstockrecordForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="库存管理_记录" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admstockrecordForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="库存ID" prop="stockId">
                            <el-input v-model="admstockrecordForm.stockId" placeholder="请输入库存ID" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="采购物品（物品字典表ID）" prop="goodsId">
                            <el-input v-model="admstockrecordForm.goodsId" placeholder="请输入采购物品（物品字典表ID）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="库存动作(1-入库，2-出库)" prop="actionType">
                            <el-input v-model="admstockrecordForm.actionType" placeholder="请输入库存动作(1-入库，2-出库)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="执行数量" prop="executNum">
                            <el-input v-model="admstockrecordForm.executNum" placeholder="请输入执行数量" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="实时总数" prop="num">
                            <el-input v-model="admstockrecordForm.num" placeholder="请输入实时总数" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请人" prop="applyer">
                            <el-input v-model="admstockrecordForm.applyer" placeholder="请输入申请人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="applyTime">
                            <el-input v-model="admstockrecordForm.applyTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="执行人" prop="executor">
                            <el-input v-model="admstockrecordForm.executor" placeholder="请输入执行人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="执行时间" prop="executTime">
                            <el-input v-model="admstockrecordForm.executTime" placeholder="请输入执行时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admstockrecordForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请人" prop="creater">
                            <el-input v-model="admstockrecordForm.creater" placeholder="请输入申请人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="admstockrecordForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="admstockrecordForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="admstockrecordForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admstockrecordForm')">保存</el-button>
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
                    admstockrecordForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          stockId: [
                        {required: true, message: '请输入库存ID', trigger: ['blur']}
                    ],
                                          goodsId: [
                        {required: true, message: '请输入采购物品（物品字典表ID）', trigger: ['blur']}
                    ],
                                          actionType: [
                        {required: true, message: '请输入库存动作(1-入库，2-出库)', trigger: ['blur']}
                    ],
                                          executNum: [
                        {required: true, message: '请输入执行数量', trigger: ['blur']}
                    ],
                                          num: [
                        {required: true, message: '请输入实时总数', trigger: ['blur']}
                    ],
                                          applyer: [
                        {required: true, message: '请输入申请人', trigger: ['blur']}
                    ],
                                          applyTime: [
                        {required: true, message: '请输入申请时间', trigger: ['blur']}
                    ],
                                          executor: [
                        {required: true, message: '请输入执行人', trigger: ['blur']}
                    ],
                                          executTime: [
                        {required: true, message: '请输入执行时间', trigger: ['blur']}
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
                    ajax.get('adm/admstockrecord/' + this.$route.query.id).then(rs => {
                        this.admstockrecordForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admstockrecordForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admstockrecord', data).then(rs => {
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

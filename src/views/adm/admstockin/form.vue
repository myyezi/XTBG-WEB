<template>
    <div class="form-panel">
        <el-form :model="admstockinForm" :rules="rules" ref="admstockinForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="入库管理" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admstockinForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
                            <el-input v-model="admstockinForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="采购单ID" prop="purchaseId">
                            <el-input v-model="admstockinForm.purchaseId" placeholder="请输入采购单ID" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="入库数量" prop="stockInNum">
                            <el-input v-model="admstockinForm.stockInNum" placeholder="请输入入库数量" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="入库状态" prop="stockInStatus">
                            <el-input v-model="admstockinForm.stockInStatus" placeholder="请输入入库状态" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admstockinForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请人" prop="creater">
                            <el-input v-model="admstockinForm.creater" placeholder="请输入申请人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="updater">
                            <el-input v-model="admstockinForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="申请时间" prop="createTime">
                            <el-input v-model="admstockinForm.createTime" placeholder="请输入申请时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="admstockinForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admstockinForm')">保存</el-button>
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
                    admstockinForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          companyId: [
                        {required: true, message: '请输入所属管理公司(组织表管理公司id)', trigger: ['blur']}
                    ],
                                          purchaseId: [
                        {required: true, message: '请输入采购单ID', trigger: ['blur']}
                    ],
                                          stockInNum: [
                        {required: true, message: '请输入入库数量', trigger: ['blur']}
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
                    ajax.get('adm/admstockin/' + this.$route.query.id).then(rs => {
                        this.admstockinForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admstockinForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admstockin', data).then(rs => {
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

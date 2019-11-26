<template>
    <div class="form-panel">
        <el-form :model="admsupplierForm" :rules="rules" ref="admsupplierForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="供应商管理" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admsupplierForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
                            <el-input v-model="admsupplierForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="供应商名称" prop="name">
                            <el-input v-model="admsupplierForm.name" placeholder="请输入供应商名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="省" prop="province">
                            <el-input v-model="admsupplierForm.province" placeholder="请输入省" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="市" prop="city">
                            <el-input v-model="admsupplierForm.city" placeholder="请输入市" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="区" prop="district">
                            <el-input v-model="admsupplierForm.district" placeholder="请输入区" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="详细地址" prop="address">
                            <el-input v-model="admsupplierForm.address" placeholder="请输入详细地址" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="经度" prop="longitude">
                            <el-input v-model="admsupplierForm.longitude" placeholder="请输入经度" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="纬度" prop="latitude">
                            <el-input v-model="admsupplierForm.latitude" placeholder="请输入纬度" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="备注" prop="remark">
                            <el-input v-model="admsupplierForm.remark" placeholder="请输入备注" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admsupplierForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="creater">
                            <el-input v-model="admsupplierForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="更新人" prop="updater">
                            <el-input v-model="admsupplierForm.updater" placeholder="请输入更新人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="createTime">
                            <el-input v-model="admsupplierForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="更新时间" prop="updateTime">
                            <el-input v-model="admsupplierForm.updateTime" placeholder="请输入更新时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admsupplierForm')">保存</el-button>
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
                    admsupplierForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          companyId: [
                        {required: true, message: '请输入所属管理公司(组织表管理公司id)', trigger: ['blur']}
                    ],
                                          name: [
                        {required: true, message: '请输入供应商名称', trigger: ['blur']}
                    ],
                                          province: [
                        {required: true, message: '请输入省', trigger: ['blur']}
                    ],
                                          city: [
                        {required: true, message: '请输入市', trigger: ['blur']}
                    ],
                                          district: [
                        {required: true, message: '请输入区', trigger: ['blur']}
                    ],
                                          address: [
                        {required: true, message: '请输入详细地址', trigger: ['blur']}
                    ],
                                          longitude: [
                        {required: true, message: '请输入经度', trigger: ['blur']}
                    ],
                                          latitude: [
                        {required: true, message: '请输入纬度', trigger: ['blur']}
                    ],
                                          remark: [
                        {required: true, message: '请输入备注', trigger: ['blur']}
                    ],
                                          status: [
                        {required: true, message: '请输入数据状态(0-删除，1-正常)', trigger: ['blur']}
                    ],
                                          creater: [
                        {required: true, message: '请输入创建人', trigger: ['blur']}
                    ],
                                          updater: [
                        {required: true, message: '请输入更新人', trigger: ['blur']}
                    ],
                                          createTime: [
                        {required: true, message: '请输入创建时间', trigger: ['blur']}
                    ],
                                          updateTime: [
                        {required: true, message: '请输入更新时间', trigger: ['blur']}
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
                    ajax.get('adm/admsupplier/' + this.$route.query.id).then(rs => {
                        this.admsupplierForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admsupplierForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admsupplier', data).then(rs => {
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

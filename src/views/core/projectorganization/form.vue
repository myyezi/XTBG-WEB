<template>
    <div class="form-panel">
        <el-form :model="projectorganizationForm" :rules="rules" ref="projectorganizationForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目参建单位表" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键id" prop="guidePrice">
                            <el-input v-model="projectorganizationForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="项目id" prop="guidePrice">
                            <el-input v-model="projectorganizationForm.projectId" placeholder="请输入项目id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="用户id" prop="guidePrice">
                            <el-input v-model="projectorganizationForm.userId" placeholder="请输入用户id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="管理岗位" prop="guidePrice">
                            <el-input v-model="projectorganizationForm.positionId" placeholder="请输入管理岗位" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="单位" prop="guidePrice">
                            <el-input v-model="projectorganizationForm.deptId" placeholder="请输入单位" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="联系方式" prop="guidePrice">
                            <el-input v-model="projectorganizationForm.contactNum" placeholder="请输入联系方式" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="职称/资格证书" prop="guidePrice">
                            <el-input v-model="projectorganizationForm.position" placeholder="请输入职称/资格证书" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="guidePrice">
                            <el-input v-model="projectorganizationForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="guidePrice">
                            <el-input v-model="projectorganizationForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="guidePrice">
                            <el-input v-model="projectorganizationForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="guidePrice">
                            <el-input v-model="projectorganizationForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="guidePrice">
                            <el-input v-model="projectorganizationForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('projectorganizationForm')">保存</el-button>
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
                    projectorganizationForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键id', trigger: ['blur']}
                    ],
                                          projectId: [
                        {required: true, message: '请输入项目id', trigger: ['blur']}
                    ],
                                          userId: [
                        {required: true, message: '请输入用户id', trigger: ['blur']}
                    ],
                                          positionId: [
                        {required: true, message: '请输入管理岗位', trigger: ['blur']}
                    ],
                                          deptId: [
                        {required: true, message: '请输入单位', trigger: ['blur']}
                    ],
                                          contactNum: [
                        {required: true, message: '请输入联系方式', trigger: ['blur']}
                    ],
                                          position: [
                        {required: true, message: '请输入职称/资格证书', trigger: ['blur']}
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
                    ajax.get('core/projectorganization/' + this.$route.query.id).then(rs => {
                        this.projectorganizationForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.projectorganizationForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/projectorganization', data).then(rs => {
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

<template>
    <div class="form-panel">
        <el-form :model="projectcompanyForm" :rules="rules" ref="projectcompanyForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目参建单位表" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键id" prop="guidePrice">
                            <el-input v-model="projectcompanyForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="项目id" prop="guidePrice">
                            <el-input v-model="projectcompanyForm.projectId" placeholder="请输入项目id" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="单位名称" prop="guidePrice">
                            <el-input v-model="projectcompanyForm.name" placeholder="请输入单位名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="单位类型（1-监理单位，2-施工单位，3-设计单位）" prop="guidePrice">
                            <el-input v-model="projectcompanyForm.type" placeholder="请输入单位类型（1-监理单位，2-施工单位，3-设计单位）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="人员姓名" prop="guidePrice">
                            <el-input v-model="projectcompanyForm.personName" placeholder="请输入人员姓名" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="联系方式" prop="guidePrice">
                            <el-input v-model="projectcompanyForm.contactNum" placeholder="请输入联系方式" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="角色名称" prop="guidePrice">
                            <el-input v-model="projectcompanyForm.position" placeholder="请输入角色名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="guidePrice">
                            <el-input v-model="projectcompanyForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建人" prop="guidePrice">
                            <el-input v-model="projectcompanyForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改人" prop="guidePrice">
                            <el-input v-model="projectcompanyForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="guidePrice">
                            <el-input v-model="projectcompanyForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="修改时间" prop="guidePrice">
                            <el-input v-model="projectcompanyForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('projectcompanyForm')">保存</el-button>
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
                    projectcompanyForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键id', trigger: ['blur']}
                    ],
                                          projectId: [
                        {required: true, message: '请输入项目id', trigger: ['blur']}
                    ],
                                          name: [
                        {required: true, message: '请输入单位名称', trigger: ['blur']}
                    ],
                                          type: [
                        {required: true, message: '请输入单位类型（1-监理单位，2-施工单位，3-设计单位）', trigger: ['blur']}
                    ],
                                          personName: [
                        {required: true, message: '请输入人员姓名', trigger: ['blur']}
                    ],
                                          contactNum: [
                        {required: true, message: '请输入联系方式', trigger: ['blur']}
                    ],
                                          position: [
                        {required: true, message: '请输入角色名称', trigger: ['blur']}
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
                    ajax.get('core/projectcompany/' + this.$route.query.id).then(rs => {
                        this.projectcompanyForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.projectcompanyForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/projectcompany', data).then(rs => {
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

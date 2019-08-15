<template>
    <div class="form-panel">
        <el-form :model="admsealdetailForm" :rules="rules" ref="admsealdetailForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="用印明细" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admsealdetailForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="文件名称" prop="name">
                            <el-input v-model="admsealdetailForm.name" placeholder="请输入文件名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="文件类别（关联字典表）" prop="type">
                            <el-input v-model="admsealdetailForm.type" placeholder="请输入文件类别（关联字典表）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="加盖印章（关联字典表）" prop="sealType">
                            <el-input v-model="admsealdetailForm.sealType" placeholder="请输入加盖印章（关联字典表）" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admsealdetailForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admsealdetailForm')">保存</el-button>
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
                    admsealdetailForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          name: [
                        {required: true, message: '请输入文件名称', trigger: ['blur']}
                    ],
                                          type: [
                        {required: true, message: '请输入文件类别（关联字典表）', trigger: ['blur']}
                    ],
                                          sealType: [
                        {required: true, message: '请输入加盖印章（关联字典表）', trigger: ['blur']}
                    ],
                                          status: [
                        {required: true, message: '请输入数据状态(0-删除，1-正常)', trigger: ['blur']}
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
                    ajax.get('adm/admsealdetail/' + this.$route.query.id).then(rs => {
                        this.admsealdetailForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admsealdetailForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admsealdetail', data).then(rs => {
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

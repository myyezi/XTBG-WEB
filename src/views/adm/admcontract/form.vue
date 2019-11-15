<template>
    <div class="form-panel">
        <el-form :model="admcontractForm" :rules="rules" ref="admcontractForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="合同管理" name="1">
                    <div class="flex-panel">
                        <el-form-item label="合同名称" prop="name">
                            <el-input v-model="admcontractForm.name" placeholder="请输入合同名称" maxlength=100 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="项目名称" prop="projectTaskId">
                            <el-select class="overall_situation_input_icon" v-model="admcontractForm.projectTaskId" filterable clearable placeholder="请选择项目" @change="getPowerByProjectId()">
                                <el-option
                                    v-for="item in projectList"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="业主" prop="proprietorName">
                            <el-input v-model="admcontractForm.proprietorName" placeholder="根据所选项目自动带出" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" prop="proprietorContactName">
                            <el-input v-model="admcontractForm.proprietorContactName" placeholder="根据所选项目自动带出" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="合同金额" prop="amount">
                            <el-input v-model="admcontractForm.amount" placeholder="请输入合同金额" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="签订人" prop="signer">
                            <el-input v-model="admcontractForm.signer" placeholder="请输入签订人" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="签订日期" prop="signTime">
                            <el-date-picker v-model="admcontractForm.signTime" type="date" value-format="yyyy-MM-dd" placeholder="请输入签订日期"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="附件" prop="attachment" class="big">
                            <upload-panel :size="6" accept=".jpg,.jpeg,.png,.gif" :file-list.sync="attachment" :show-img="true"></upload-panel>
                        </el-form-item>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="submitForm('admcontractForm')">保存</el-button>
                <el-button @click="close">返回</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    import UploadPanel from '@/components/UploadPanel/index'

    export default {
        mixins: [tool, ruleTool],
        components: {UploadPanel},
        data() {
            return {
                admcontractForm: {
                    proprietorName: '',
                    proprietorContactName: ''
                },
                projectList: [],
                openCollapse: ["1"],//默认打开的面板
                rules: {
                    name: [
                        {required: true, message: '请输入合同名称', trigger: ['blur']}
                    ],
                    projectTaskId: [
                        {required: true, message: '请输入项目任务书ID', trigger: ['blur']}
                    ],
                                          amount: [
                        {required: true, message: '请输入金额', trigger: ['blur']}
                    ],
                                          signer: [
                        {required: true, message: '请输入签订人(用户id)', trigger: ['blur']}
                    ],
                                          signTime: [
                        {required: true, message: '请输入签订时间', trigger: ['blur']}
                    ],
                                          progress: [
                        {required: true, message: '请输入收款进度', trigger: ['blur']}
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
            this.getProjectList()
        },
        methods: {

            //进入编辑页调用 bean为列表页传入数据
            open() {
                if (this.$route.query.id) {
                    ajax.get('adm/admcontract/' + this.$route.query.id).then(rs => {
                        this.admcontractForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //获取项目
            getProjectList() {
                ajax.get('adm/admcontract/getProjectTaskList').then(rs => {
                    this.projectList = rs.data;
                });
            },
            getPowerByProjectId() {
                ajax.get('adm/admcontract/getPowerByProjectId?projectId='+ this.admcontractForm.projectTaskId).then(rs => {
                    this.admcontractForm.proprietorName = rs.data.proprietorName;
                    this.admcontractForm.proprietorContactName = rs.data.proprietorContactName;
                });
            },

            //保存
            submitForm(form) {
                var data = this.admcontractForm;
                this.$refs[form].validate((valid) => {
                    if (!valid) {
                        this.$message.error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admcontract', data).then(rs => {
                        if (rs.status == 0) {
                            this.$message.success(rs.msg);
                            this.close();
                        } else {
                            this.$message.error(rs.msg);
                        }
                    });
                });
            },

        },
    }
</script>

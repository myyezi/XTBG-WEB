<template>
    <div class="form-panel">
        <el-form :model="sysmessageForm" :rules="rules" ref="sysmessageForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="消息提醒" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="ID" prop="id">
                            <el-input v-model="sysmessageForm.id" placeholder="请输入ID" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="用户ID" prop="userId">
                            <el-input v-model="sysmessageForm.userId" placeholder="请输入用户ID" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="消息标题" prop="title">
                            <el-input v-model="sysmessageForm.title" placeholder="请输入消息标题" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="消息内容" prop="content">
                            <el-input v-model="sysmessageForm.content" placeholder="请输入消息内容" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="类型" prop="type">
                            <el-input v-model="sysmessageForm.type" placeholder="请输入类型" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="跳转URL" prop="jumpUrl">
                            <el-input v-model="sysmessageForm.jumpUrl" placeholder="请输入跳转URL" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="跳转标题" prop="jumpTitle">
                            <el-input v-model="sysmessageForm.jumpTitle" placeholder="请输入跳转标题" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="读取状态(0-未读，1-已读)" prop="readStatus">
                            <el-input v-model="sysmessageForm.readStatus" placeholder="请输入读取状态(0-未读，1-已读)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="sysmessageForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="创建时间" prop="createTime">
                            <el-input v-model="sysmessageForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('sysmessageForm')">保存</el-button>
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
                    sysmessageForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入ID', trigger: ['blur']}
                    ],
                                          userId: [
                        {required: true, message: '请输入用户ID', trigger: ['blur']}
                    ],
                                          title: [
                        {required: true, message: '请输入消息标题', trigger: ['blur']}
                    ],
                                          content: [
                        {required: true, message: '请输入消息内容', trigger: ['blur']}
                    ],
                                          type: [
                        {required: true, message: '请输入类型', trigger: ['blur']}
                    ],
                                          jumpUrl: [
                        {required: true, message: '请输入跳转URL', trigger: ['blur']}
                    ],
                                          jumpTitle: [
                        {required: true, message: '请输入跳转标题', trigger: ['blur']}
                    ],
                                          readStatus: [
                        {required: true, message: '请输入读取状态(0-未读，1-已读)', trigger: ['blur']}
                    ],
                                          status: [
                        {required: true, message: '请输入数据状态(0-删除，1-正常)', trigger: ['blur']}
                    ],
                                          createTime: [
                        {required: true, message: '请输入创建时间', trigger: ['blur']}
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
                    ajax.get('message/sysmessage/' + this.$route.query.id).then(rs => {
                        this.sysmessageForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.sysmessageForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('message/sysmessage', data).then(rs => {
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

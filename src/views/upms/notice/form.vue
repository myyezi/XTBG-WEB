<template>
    <div class="form-panel">
        <el-form :model="noticeForm" :rules="rules" ref="noticeForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="通知" name="1">
                    <div class="flex-panel">
                        <el-form-item label="通知类型" prop="type">
                            <el-select v-model="noticeForm.type" filterable clearable>
                                <el-option label="APP" :value="1"></el-option>
                                <el-option label="平台" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="通知内容" prop="content">
                            <el-input type="textarea" v-model="noticeForm.content" placeholder="请输入通知" maxlength=20 clearable></el-input>
                        </el-form-item>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="submitForm('noticeForm')">保存</el-button>
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
        data() {
            return {
                noticeForm: {
                    type: '',
                    content: '',
                },
                openCollapse: ["1"],//默认打开的面板
                rules: {
                    type: [
                        {required: true, message: '请选择类型', trigger: ['blur', 'change']}
                    ],
                    content: [
                        {required: true, message: '请输入内容', trigger: ['blur', 'change']}
                    ]
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
                    ajax.get('upms/notice/' + this.$route.query.id).then(rs => {
                        this.noticeForm = rs.data;
                    });
                }
            },
            //保存
            submitForm(form) {
                var data = this.noticeForm;
                this.$refs[form].validate((valid) => {
                    if (!valid) {
                        this.$message.error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('upms/notice', data).then(rs => {
                        if (rs.status == 0) {
                            this.$message.success(rs.msg);
                            this.close();
                        } else {
                            this.$message.error(rs.msg);
                        }
                    });
                });
            },
        }
    }
</script>

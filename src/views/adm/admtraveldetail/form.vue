<template>
    <div class="form-panel">
        <el-form :model="admtraveldetailForm" :rules="rules" ref="admtraveldetailForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="出差明细" name="1">
                    <div class="flex-panel">
                                            <el-form-item label="主键" prop="id">
                            <el-input v-model="admtraveldetailForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="出差地点" prop="address">
                            <el-input v-model="admtraveldetailForm.address" placeholder="请输入出差地点" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="开始时间" prop="startTime">
                            <el-input v-model="admtraveldetailForm.startTime" placeholder="请输入开始时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="结束时间" prop="endTime">
                            <el-input v-model="admtraveldetailForm.endTime" placeholder="请输入结束时间" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="出差时长" prop="travelTime">
                            <el-input v-model="admtraveldetailForm.travelTime" placeholder="请输入出差时长" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="出行方式(1-公共交通 2-出租车 3-自驾  4-公司车辆)" prop="type">
                            <el-input v-model="admtraveldetailForm.type" placeholder="请输入出行方式(1-公共交通 2-出租车 3-自驾  4-公司车辆)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
                            <el-input v-model="admtraveldetailForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
                        </el-form-item>
                                        </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('admtraveldetailForm')">保存</el-button>
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
                    admtraveldetailForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键', trigger: ['blur']}
                    ],
                                          address: [
                        {required: true, message: '请输入出差地点', trigger: ['blur']}
                    ],
                                          startTime: [
                        {required: true, message: '请输入开始时间', trigger: ['blur']}
                    ],
                                          endTime: [
                        {required: true, message: '请输入结束时间', trigger: ['blur']}
                    ],
                                          travelTime: [
                        {required: true, message: '请输入出差时长', trigger: ['blur']}
                    ],
                                          type: [
                        {required: true, message: '请输入出行方式(1-公共交通 2-出租车 3-自驾  4-公司车辆)', trigger: ['blur']}
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
                    ajax.get('adm/admtraveldetail/' + this.$route.query.id).then(rs => {
                        this.admtraveldetailForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.admtraveldetailForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('adm/admtraveldetail', data).then(rs => {
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

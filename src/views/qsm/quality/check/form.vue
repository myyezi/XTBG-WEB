<!--
<template>
    <div class="form-panel">
        <el-form :model="checkForm" :rules="rules" ref="checkForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="质量检查问题通知单" name="1">
                    <div class="flex-panel">
                        <el-form-item label="主键id" prop="id">
                            <el-input v-model="checkForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="项目id" prop="projectId">
                            <el-input v-model="checkForm.projectId" placeholder="请输入项目id" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="编号" prop="code">
                            <el-input v-model="checkForm.code" placeholder="请输入编号" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="检查组织单位" prop="checkCompany">
                            <el-input v-model="checkForm.checkCompany" placeholder="请输入检查组织单位" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="被查地点" prop="checkAddress">
                            <el-input v-model="checkForm.checkAddress" placeholder="请输入被查地点" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="被查日期" prop="checkDate">
                            <el-input v-model="checkForm.checkDate" placeholder="请输入被查日期" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="被查单位" prop="becheckedCompanyId">
                            <el-input v-model="checkForm.becheckedCompanyId" placeholder="请输入被查单位" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="检查人员" prop="checkUserId">
                            <el-input v-model="checkForm.checkUserId" placeholder="请输入检查人员" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="签收人员" prop="signUserId">
                            <el-input v-model="checkForm.signUserId" placeholder="请输入签收人员" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="检查范围和简要内容" prop="description">
                            <el-input v-model="checkForm.description" placeholder="请输入检查范围和简要内容" maxlength=30 clearable></el-input>
                        </el-form-item>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('checkForm')">保存</el-button>
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
                    checkForm: {},
                openCollapse: ["1"],//默认打开的面板
                rules: {
                                          id: [
                        {required: true, message: '请输入主键id', trigger: ['blur']}
                    ],
                                          projectId: [
                        {required: true, message: '请输入项目id', trigger: ['blur']}
                    ],
                                          code: [
                        {required: true, message: '请输入编号', trigger: ['blur']}
                    ],
                                          checkCompany: [
                        {required: true, message: '请输入检查组织单位', trigger: ['blur']}
                    ],
                                          checkAddress: [
                        {required: true, message: '请输入被查地点', trigger: ['blur']}
                    ],
                                          checkDate: [
                        {required: true, message: '请输入被查日期', trigger: ['blur']}
                    ],
                                          becheckedCompanyId: [
                        {required: true, message: '请输入被查单位', trigger: ['blur']}
                    ],
                                          checkUserId: [
                        {required: true, message: '请输入检查人员', trigger: ['blur']}
                    ],
                                          signUserId: [
                        {required: true, message: '请输入签收人员', trigger: ['blur']}
                    ],
                                          description: [
                        {required: true, message: '请输入检查范围和简要内容', trigger: ['blur']}
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
                    ajax.get('qsm/quality/check/' + this.$route.query.id).then(rs => {
                        this.checkForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },

            //保存
            submitForm(form) {
                var data = this.checkForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('qsm/quality/check', data).then(rs => {
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
-->


<template>
    <div class="form-panel">
        <el-form :model="checkForm" :rules="rules" ref="checkForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="质量检查问题通知单" name="1">
                    <div class="flex-panel">
                        <el-form-item label="检查单号" prop="code">
                            <el-input v-model="checkForm.code" placeholder="系统自动生成" maxlength=50 clearable disabled></el-input>
                        </el-form-item>
                        <el-form-item label="检查组织单位" prop="checkCompany">
                            <el-input v-model="checkForm.checkCompany" placeholder="请输入检查组织单位" maxlength=50 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="被查项目" prop="projectId">
                            <el-select v-model="checkForm.projectId" filterable clearable placeholder="请选择被查项目">
                                <el-option
                                    v-for="item in projectList"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="被查地点" prop="checkAddress">
                            <el-input v-model="checkForm.checkAddress" placeholder="请输入被查地点" maxlength=50 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="被查日期" prop="checkDate">
                            <el-date-picker v-model="checkForm.checkDate" type="date" placeholder="请输入被查日期"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="被查单位" prop="becheckedCompany">
                            <el-input v-model="checkForm.becheckedCompany" placeholder="请输入被查单位" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="检查人员" prop="checkUserId">
                            <el-input v-model="checkForm.checkUserId" placeholder="请输入检查人员" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="签收人员" prop="signUserId">
                            <!--<el-input v-model="checkForm.signUserId" placeholder="请输入签收人员" maxlength=30 clearable></el-input>-->
                            <el-select v-model="checkForm.signUserId" filterable clearable placeholder="请选择签收人">
                                <el-option
                                    v-for="item in userList"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="检查范围和简要内容" prop="description" class="big">
                            <el-input type="textarea" v-model="checkForm.description" placeholder="请输入检查范围和简要内容" maxlength=2000 clearable></el-input>
                        </el-form-item>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="质量检查问题通知单明细" name="2">
                    <el-button class="float-btn" type="primary" @click="addItem">新增</el-button>
                    <el-table border :data="checkForm.checkDetailList" style="width: 100%">
                        <el-table-column prop="index" label="序号" min-width="20">
                            <template slot-scope="{row,$index}">
                                <span>{{$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="发现问题" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'checkDetailList.' + $index + '.title'" :rules="rules.required('请输入问题')">
                                    <el-input type="textarea" :rows="1" v-model="row.title" placeholder="请输入问题" maxlength=500 clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="责任单位" min-width="100" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'checkDetailList.' + $index + '.responsibleCompany'" :rules="rules.required('请输入责任单位')">
                                    <el-input v-model="row.responsibleCompany" placeholder="请输入责任单位" maxlength=50 clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="要求整改日期" min-width="50" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'checkDetailList.' + $index + '.rectifyDate'" :rules="rules.required('请输入要求整改日期')">
                                    <el-date-picker v-model="row.rectifyDate" type="date" placeholder="请选择整改日期"></el-date-picker>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <!--<el-table-column label="现场问题照片" min-width="50" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'checkDetailList.' + $index + '.img'" :rules="rules.required('请上传现场问题照片')">
                                    &lt;!&ndash;<el-input v-model="row.response" placeholder="请上传照片" maxlength=200 clearable></el-input>&ndash;&gt;
                                    <upload-panel :size="6" accept=".jpg,.jpeg,.png,.gif" :file-list.sync="img" :show-img="true"></upload-panel>
                                </el-form-item>
                            </template>
                        </el-table-column>-->
                        <el-table-column label="操作" min-width="20">
                            <template slot-scope="{row, $index}">
                                <el-button v-if="checkForm.checkDetailList.length>1" type="text" size="small" @click="delItem($index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('checkForm')">保存</el-button>
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
                checkForm: {
                    checkDetailList: [],
                },
                projectList: [],
                userList: [],
                openCollapse: ["1", "2"],//默认打开的面板
                rules: {
                    projectId: [
                        {required: true, message: '请输入项目id', trigger: ['blur']}
                    ],
                    checkCompany: [
                        {required: true, message: '请输入检查组织单位', trigger: ['blur']}
                    ],
                    checkAddress: [
                        {required: true, message: '请输入被查地点', trigger: ['blur']}
                    ],
                    checkDate: [
                        {required: true, message: '请输入被查日期', trigger: ['blur']}
                    ],
                    becheckedCompany: [
                        {required: true, message: '请输入被查单位', trigger: ['blur']}
                    ],
                    checkUserId: [
                        {required: true, message: '请输入检查人员', trigger: ['blur']}
                    ],
                    signUserId: [
                        {required: true, message: '请输入签收人员', trigger: ['blur']}
                    ],
                }
            }
        },
        mounted() {
            this.open();
            this.getProjectList();
            this.getUsertList();
        },
        methods: {

            addItem() {
                this.checkForm.checkDetailList.push({});
            },
            delItem(i) {
                console.log(this.checkForm.checkDetailList)
                this.checkForm.checkDetailList.splice(i, 1);
            },
            //获取项目
            getProjectList() {
                ajax.get('core/projectreportweekly/getProjectList').then(rs => {
                    this.projectList = rs.data;
                });
            },
            //获取用户
            getUsertList() {
                ajax.get('qsm/safe/check/getUser').then(rs => {
                    this.userList = rs.data;
                });
            },
            //进入编辑页调用 bean为列表页传入数据
            open() {
                if (this.$route.query.id) {
                    ajax.get('qsm/quality/check/' + this.$route.query.id).then(rs => {
                        this.checkForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                } else {
                    this.checkForm.checkDetailList = [{}];
                }
            },

            //保存
            submitForm(form) {
                var data = this.checkForm;
                this.$refs[form]
                    .validate((valid) => {
                        if (!valid) {
                            this.$message
                                .error('校验不通过，请检查输入项');
                            return;
                        }
                        ajax.post('qsm/quality/check', data).then(rs => {
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

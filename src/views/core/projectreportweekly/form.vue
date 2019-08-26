<template>
    <div class="form-panel">
        <el-form :model="weeklyForm" :rules="rules" ref="weeklyForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目工程周报" name="1">
                    <div class="flex-panel">
                        <el-form-item label="选择项目" prop="projectId">
                            <el-select v-model="weeklyForm.projectId" filterable clearable placeholder="请选择项目">
                                <el-option
                                    v-for="item in projectList"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年份" prop="year">
                            {{weeklyForm.year}}
                        </el-form-item>
                        <el-form-item label="周报期数" prop="period">{{weeklyForm.period}}</el-form-item>
                        <el-form-item label="周起止日期" prop="startEnd">{{weeklyForm.startEnd}}</el-form-item>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="工程进度情况" name="2">
                    <el-button class="float-btn" type="primary" @click="addItem">新增</el-button>
                    <el-table border :data="weeklyForm.progressList" style="width: 100%">
                        <el-table-column prop="index" label="序号" min-width="12">
                            <template slot-scope="{row,$index}">
                                <span>{{$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="工程名称" min-width="100" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'progressList.' + $index + '.engineeringName'" :rules="rules.required('请输入工程名称')">
                                    <el-input v-model="row.engineeringName" placeholder="请输入工程名称" maxlength=50 clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="里程碑完成节点" min-width="100" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'progressList.' + $index + '.milepostNode'" :rules="rules.required('请输入里程碑完成节点')">
                                    <el-input v-model="row.milepostNode" placeholder="请输入里程碑完成节点" maxlength=50 clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="响应情况" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'progressList.' + $index + '.response'" :rules="rules.required('请输入响应情况')">
                                    <el-input v-model="row.response" placeholder="请输入响应情况" maxlength=200 clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="13">
                            <template slot-scope="{row, $index}">
                                <el-button v-if="weeklyForm.progressList.length>1" type="text" size="small" @click="delItem($index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-form-item label="本周主要完成工作" prop="thisContent" class="big">
                        <el-button type="primary" icon="el-icon-plus" size="small" @click="addPlanDialog()" style="margin-right:10px">导入本周计划</el-button>
                        <el-button type="primary" icon="el-icon-plus" size="small" @click="addBigeventDialog()" style="margin-right:10px">导入大事记</el-button>
                        <el-input type="textarea" :rows="6" v-model="weeklyForm.thisContent" placeholder="请输入本周完成工作" maxlength="500" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="下周工作完成情况" prop="nextContent" class="big">
                        <el-input type="textarea" :rows="6" v-model="weeklyForm.nextContent" placeholder="请输入下周工作完成情况" maxlength=500 clearable></el-input>
                    </el-form-item>
                    <el-form-item label="主要问题及工作处理情况" prop="problemContent" class="big">
                        <el-input type="textarea" :rows="6" v-model="weeklyForm.problemContent" placeholder="请输入主要问题及工作处理情况" maxlength=500 clearable></el-input>
                    </el-form-item>
                    <el-form-item label="新增需协调解决问题" prop="issuesContent" class="big">
                        <el-input type="textarea" :rows="6" v-model="weeklyForm.issuesContent" placeholder="请输入新增需协调解决问题" maxlength=500 clearable></el-input>
                    </el-form-item>
                </el-collapse-item>
                <!--<el-collapse-item title="周报内容" name="3">-->

                <!--</el-collapse-item>-->
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('weeklyForm')">保存</el-button>
                <el-button @click="close">返回</el-button>
            </div>
        </el-form>

        <el-dialog width="800px" title="大事记" :visible.sync="bigeventDialogVisible" :append-to-body="true">
            <el-table ref="multipleTable" :data="bigeventData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="description" label="大事记内容" show-overflow-tooltip></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="bigeventDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="copyBigevent()">复制并粘贴</el-button>
            </div>
        </el-dialog>
        <el-dialog width="600px" title="本周计划" :visible.sync="planDialogVisible" :append-to-body="true">
            {{planText}}
            <div slot="footer" class="dialog-footer">
                <el-button @click="planDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="copyPlan()">复制并粘贴</el-button>
            </div>
        </el-dialog>

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
                bigeventDialogVisible: false,
                planDialogVisible: false,
                multipleSelection: [],
                bigeventData: [],
                planText: '',
                projectList: [],
                weeklyForm: {
                    thisContent: '',
                    progressList: [],
                },
                openCollapse: ["1", "2",, "3"],//默认打开的面板
                rules: {
                    projectId: [
                        {required: true, message: '请选择项目', trigger: ['blur']}
                    ],
                    progressContent: [
                        {required: true, message: '请输入工程进度情况', trigger: ['blur']}
                    ],
                    thisContent: [
                        {required: true, message: '请输入本周主要完成工作', trigger: ['blur']}
                    ],
                    nextContent: [
                        {required: true, message: '请输入下周工作完成情况', trigger: ['blur']}
                    ],
                    problemContent: [
                        {required: true, message: '请输入主要问题及工作处理情况', trigger: ['blur']}
                    ],
                    issuesContent: [
                        {required: true, message: '请输入新增需协调解决问题', trigger: ['blur']}
                    ],
                }
            }
        },
        mounted() {
            this.open();
            this.getProjectList();
        },
        methods: {

            // 获取周数据
            getWeeklyByNow() {
                ajax.get('core/projectreportweekly/getWeeklyByNow').then(rs => {
                    this.weeklyForm.year = rs.data.year;
                    this.weeklyForm.period = rs.data.period;
                    this.weeklyForm.startEnd = rs.data.startEnd;
                });
            },
            //获取项目
            getProjectList() {
                ajax.get('core/projectreportweekly/getProjectList').then(rs => {
                    this.projectList = rs.data;
                });
            },
            addItem() {
                this.weeklyForm.progressList.push({/*gunStatus:1*/});
            },
            delItem(i) {
                console.log(this.weeklyForm.progressList)
                this.weeklyForm.progressList.splice(i, 1);
            },
            // 上周计划
            addPlanDialog() {
                this.planDialogVisible = true;
                ajax.get('core/projectreportweekly/1').then(rs => {
                    this.planText = rs.data.nextContent;
                });
            },
            copyPlan() {
                this.planDialogVisible = false;
                this.weeklyForm.thisContent += this.planText + '\n';
            },
            // 大事记
            addBigeventDialog() {
                let projectId = this.weeklyForm.projectId;
                let startEnd = this.weeklyForm.startEnd;
                if(projectId && projectId.length > 0) {
                    this.bigeventDialogVisible = true;
                    let eventDateStart = startEnd.substring(0, 10);
                    let eventDateEnd = startEnd.substring(13, 23);
                    ajax.get('core/projectbigevent?projectId='+ projectId +'&eventDateStart='+
                        eventDateStart +'&eventDateEnd='+ eventDateEnd +'&size=100').then(rs => {
                        this.bigeventData = rs.records;
                    });
                } else {
                    this.$message.error("请选择项目！");
                }

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            copyBigevent() {
                let bigeventData = this.multipleSelection;
                if(bigeventData != null && bigeventData.length > 0) {
                    this.bigeventDialogVisible = false;
                    for (let i of bigeventData){
                        this.weeklyForm.thisContent += i.description + '\n';
                    }
                } else {
                    this.$message.error("请选择数据！");
                }

            },

            //进入编辑页调用 bean为列表页传入数据
            open() {
                if (this.$route.query.id) {
                    ajax.get('core/projectreportweekly/' + this.$route.query.id).then(rs => {
                        this.weeklyForm = rs.data;
                    });
                } else {
                    this.weeklyForm.progressList = [{}];
                    ajax.get('core/projectreportweekly/getWeeklyByNow').then(rs => {
                        this.weeklyForm.year = rs.data.year;
                        this.weeklyForm.period = rs.data.period;
                        this.weeklyForm.startEnd = rs.data.startEnd;
                    });
                }
            },

            //保存
            submitForm(form) {
                let data = this.weeklyForm;
                this.$refs[form].validate((valid) => {
                    if (!valid) {
                        this.$message.error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/projectreportweekly', data).then(rs => {
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

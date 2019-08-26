<template>
    <div class="form-panel">
        <el-tabs v-model="activeName">
            <el-tab-pane label="备忘录" name="1">
                <ele-calendar
                    style="margin:20px;width:calc(100% - 40px);font-size:14px;"
                    :render-content="renderContent"
                    :data="datedef"
                    :prop="prop"
                    :border = 'true'
                    :lunarcalendar = 'true'
                    @pick="datePick"
                ></ele-calendar>
            </el-tab-pane>
        </el-tabs>

        <el-dialog width="800px" title="备忘录" :visible.sync="dialogVisible" top="5vh">
            <el-button v-show="showAddBtn" type="primary" @click="addMemo()" size="small">新 增</el-button>
            <el-collapse style="height:calc(90vh - 148px);overflow: auto;" class="meno_form_item" accordion>
                 <el-collapse-item v-for="(item, index) in memoList" :key="index">
                    <template slot="title">
                        <div style="display:inline-block">备忘录{{index+1}}</div>
                    </template>
                    <el-form :model="item.formModel" :rules="rules" :ref="item.formRef" label-position="top"  class="full-input">
                        <div class="clearfix">
                            <el-button type="primary" @click="submitForm(item)" size="mini" style="float: right;margin-left:10px">保存</el-button>
                            <el-button v-if="item.id" v-show="showEditBtn" type="primary" @click="editMemo(item)" size="mini" style="float: right;margin-left:10px">{{item.editVal == 1?'取消编辑':'编辑'}}</el-button>
                            <el-button type="primary" @click="deleteMemo(item,index)" size="mini" style="float: right;margin-left:10px">删除</el-button>
                        </div>
                        <el-form-item label="解决单位" prop="companyId">
                            <el-input v-if="item.id" v-model="item.formModel.companyId" placeholder="请输入解决单位" maxlength="50" disabled></el-input>
                            <el-input v-else v-model="item.formModel.companyId" placeholder="请输入解决单位" maxlength="50" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="问题提出日期:" prop="createTime">
                            <!--<el-date-picker v-if="item.id" v-model="item.formModel.createTime" type="date" disabled></el-date-picker>
                            <el-date-picker v-else v-model="item.formModel.createTime" type="date" clearable></el-date-picker>-->
                            <el-date-picker v-model="item.formModel.createTime" type="date" disabled></el-date-picker>
                        </el-form-item>
                        <el-form-item label="需解决日期:" prop="dealDate">
                            <el-date-picker v-if="item.id" v-model="item.formModel.dealDate" type="date" placeholder="选择需解决日期" disabled></el-date-picker>
                            <el-date-picker v-else v-model="item.formModel.dealDate" type="date" placeholder="选择需解决日期" clearable></el-date-picker>
                        </el-form-item>
                        <el-form-item label="问题描述" prop="description">
                            <el-input v-if="item.id" type="textarea"
                                    v-model="item.formModel.description" placeholder="请输入问题描述" maxlength="500" disabled></el-input>
                            <el-input v-else type="textarea"
                                    v-model="item.formModel.description" placeholder="请输入问题描述" maxlength="500" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="反馈描述" prop="feedbackDescribe">
                            <el-input v-if="item.editVal == 1 && item.id" type="textarea"
                                    v-model="item.formModel.feedbackDescribe" placeholder="请输入反馈描述" maxlength="500" clearable></el-input>
                            <el-input v-if="item.editVal == 0 || !item.id" type="textarea"
                                    v-model="item.formModel.feedbackDescribe" placeholder="请输入反馈描述" maxlength="500" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="反馈状态" prop="feedbackStatus">
                            <el-select v-if="item.editVal == 0 || item.id == null" v-model="item.formModel.feedbackStatus" disabled>
                                <el-option label="进行中" :value="1"></el-option>
                                <el-option label="已完成" :value="2"></el-option>
                                <el-option label="取消" :value="3"></el-option>
                            </el-select>
                            <el-select v-if="item.id != null && item.editVal == 1" v-model="item.formModel.feedbackStatus" clearable placeholder="请选择反馈状态">
                                <el-option label="进行中" :value="1"></el-option>
                                <el-option label="已完成" :value="2"></el-option>
                                <el-option label="取消" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="反馈时间:" prop="feedbackTime">{{item.formModel.feedbackTime}}</el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </el-dialog>
    </div>
</template>

<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    import eleCalendar from 'ele-calendar'
    import 'ele-calendar/dist/vue-calendar.css' //引入css

    export default {
        mixins: [tool, ruleTool],
        components: {eleCalendar},
        data() {
            return {
                memoList: [],
                showAddBtn: this.getCurrentUserAuthority("/core/projectmemo/add"),
                showEditBtn: this.getCurrentUserAuthority("/core/projectmemo/edit"),
                datedef:[],
                memoForm: {

                },
                dialogVisible: false,
                activeName: '1',
                openCollapse: ["1"],//默认打开的面板
                today: new Date().format('yyyy-MM-dd'),
                clickDate : '',
                rules: {
                    companyId: [
                        {required: true, message: '请输入需解决单位', trigger: 'blur'}
                    ],
                    dealDate: [
                        {required: true, message: '请输入需解决日期', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入问题描述', trigger: 'blur'}
                    ],
                },
                prop:'dealDate', //对应日期字段名
                memo_yellow:require('@/styles/img/memo_yellow.png'),
                memo_blue:require('@/styles/img/memo_blue.png'),
                memo_gray:require('@/styles/img/memo_gray.png'),
                memo_white:require('@/styles/img/memo_white.png'),
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            // 增加备忘录
            addMemo() {
                this.memoList.push({
                    formRef:'formRef'+this.memoList.length,
                    formModel:{
                        projectId: this.$route.query.id,
                        createTime : this.today,
                        dealDate : this.clickDate,
                    }
                })
            },
            // 删除备忘录
            deleteMemo(data,index) {
                let _this = this
                this.$confirm('是否删除该备忘录' ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function() {
                    if(data.id) {
                        // 调删除接口
                        ajax.delete('core/projectmemo/'+ data.id).then(rs => {
                            if (rs.status == 0) {
                                _this.$message.success(rs.msg);
                                _this.memoListOpertion(data,index)
                            } else {
                                _this.$message.error(rs.msg);
                            }
                        });
                    } else {
                        // 删除成功数据处理
                        console.log("23132132132")
                        _this.memoListOpertion(data,index)
                    }
                }).catch(function() {
                });
                console.log(this.memoList)
            },
            // 删除备忘录页面数据处理
            memoListOpertion(data,index) {
                this.memoList.splice(index, 1);
                this.memoList.forEach((item,index) => {
                    item.formRef = 'formRef'+index
                });
                if(this.$refs[data.formRef]&&this.$refs[data.formRef][0]) {
                    this.$refs[data.formRef][0].clearValidate();
                }
            },
            // 编辑备忘录
            editMemo(data) {
                if(data.editVal === 1) {
                    data.editVal = 0
                } else {
                    data.editVal = 1
                }
                this.$forceUpdate()
            },
             // 保存备忘录
            submitForm(data) {
                let formObj = data.formModel
                this.$refs[data.formRef][0].validate((valid) => {
                    if (!valid) {
                        this.$message.error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/projectmemo', formObj).then(rs => {
                        if (rs.status == 0) {
                            this.$message.success(rs.msg);
                            this.getList();
                        } else {
                            this.$message.error(rs.msg);
                        }
                    });
                });
            },
            // 重写日历表显示的内容
            renderContent(h,parmas) {
                const loop = data =>{
                    return (
                        this.isToday(data.defdate) !== 1?
                            (<div>
                            <div>{data.defvalue.text}</div>
                            <div style="width: 32px;margin: 0 auto;">
                            <img src={ data.defvalue.value.feedbackStatus==1 ? this.memo_yellow
                            : data.defvalue.value.feedbackStatus==2?this.memo_blue
                            : data.defvalue.value.feedbackStatus==3?this.memo_gray :this.memo_white} style="width:32px;height:32px"/>
                        </div>
                        </div>) : <div>{data.defvalue.text}</div>
                )
                }
                return (
                    <div  style="height:90px;text-align: left;padding: 8px;font-size: 14px;">
                    {loop(parmas)}
                    </div>
            );
            },
            // 点击日期
            datePick(date, event, row, dome) {
                let idate = date.format("yyyy-MM-dd")
                if(this.isToday(date) != 1) {
                    this.dialogVisible = true;
                    this.getMemoDetail(idate);
                    this.clickDate = idate;
                }
            },
            // 判断点击的日期是否在今天之前还是之后还是当天
            isToday(str) {
                let times = new Date().getTime() - str.getTime()
                let type;
                if(times<0) {
                    type = 1 //今天之后
                } else if(times>86400000){
                    type = 2 //今天之前
                } else {
                    type = 3 // 今天
                }
                return type;
            },
            // 得到有周报的日期
            getList() {
                ajax.get('core/projectmemo?projectId='+ this.$route.query.id).then(rs => {
                    this.datedef = rs;
                });
            },
            //查询备忘录
            getMemoDetail(idate) {
                if (this.$route.query.id) {
                    ajax.get('core/projectmemo/getMemoDetail',{
                        projectId : this.$route.query.id,
                        dealDate: idate
                    }).then(rs => {
                        if(rs.status === 0) {
                            this.memoList = rs.data;
                            if(this.memoList&&this.memoList.length>0) {
                                this.memoList.forEach((item,index) => {
                                    item.editVal = 0
                                    item.formRef = 'formRef'+index
                                    if(item.formModel.feedbackTime) {
                                        item.formModel.feedbackTime = item.formModel.feedbackTime.replace("T", " ");
                                    }
                                    if(this.$refs[item.formRef]&&this.$refs[item.formRef][0]) {
                                        this.$refs[item.formRef][0].clearValidate();
                                    }
                                });
                            }
                        } else {
                            this.$message.error(rs.msg);
                        }
                    });
                } else {
                    alert(new Date().format("yyyy-MM-dd"));
                    this.createTime = date.format("yyyy-MM-dd");
                }
            }
        }
    }
</script>
<style>
    .meno_form_item .el-form-item {
        margin-bottom:8px
    }
</style>


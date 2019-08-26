<template>
    <div class="form-panel">
        <el-tabs v-model="activeName">
            <el-tab-pane label="宜昌输变电工程项目日报" name="1">
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

        <el-dialog width="600px" title="日报" :visible.sync="dialogVisible" :append-to-body="true">
            <el-form :model="dailyForm" :rules="rules" label-position="top" ref="dailyForm" class="full-input">

                <!--<div class="detail-item">
                    <label class="control-label">日期：</label>
                    <div class="input-group">
                        <span>{{dailyForm.reportDate}}</span>
                    </div>
                </div>-->
                <el-form-item label="日期:" prop="reportDate">{{dailyForm.reportDate}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {{dailyForm.reportDate}}日之后将不可修改</el-form-item>
                <el-form-item label="今日总结" prop="todayContent">
                    <el-input v-if="dailyForm.reportDate == today" type="textarea"
                              v-model="dailyForm.todayContent" placeholder="请输入今日总结" maxlength="500" clearable></el-input>
                    <el-input v-if="dailyForm.reportDate != today" type="textarea"
                              v-model="dailyForm.todayContent" placeholder="请输入今日总结" maxlength="500" disabled></el-input>
                </el-form-item>
                <el-form-item label="明日计划" prop="tomorrowContent">
                    <el-input v-if="dailyForm.reportDate == today" type="textarea"
                              v-model="dailyForm.tomorrowContent" placeholder="请输入明日计划" maxlength="500" clearable></el-input>
                    <el-input v-if="dailyForm.reportDate != today" type="textarea"
                              v-model="dailyForm.tomorrowContent" placeholder="请输入明日计划" maxlength="500" disabled></el-input>
                </el-form-item>
                <el-form-item label="最近提交人:">{{dailyForm.updater}}</el-form-item>
                <el-form-item label="最近提交时间:">{{dailyForm.updateTime}}</el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button v-if="dailyForm.reportDate == today" v-show="showAddBtn" type="primary" @click="submitForm('dailyForm')">保 存</el-button>
            </div>
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
                showAddBtn: this.getCurrentUserAuthority("/projectreportdaily/add"),
                datedef:[],
                dailyForm: {
                    todayContent:'',
                    tomorrowContent: ''
                },
                dialogVisible: false,
                activeName: '1',
                openCollapse: ["1"],//默认打开的面板
                today: new Date().format('yyyy-MM-dd'),
                rules: {
                    todayContent: [
                        {required: true, message: '请填写今日总结', trigger: ['blur']}
                    ],
                    tomorrowContent: [
                        {required: true, message: '请输入明日计划', trigger: ['blur']}
                    ]
                },
                prop:'date', //对应日期字段名
                correctdate:require('@/styles/img/correctdate.png'),
                errdate:require('@/styles/img/errdate.png'),
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            // 重写日历表显示的内容
            renderContent(h,parmas) {
                const loop = data =>{
                    return (
                        this.isToday(data.defdate) !== 1?
                            (<div>
                            <div>{data.defvalue.text}</div>
                            <div style="width: 32px;margin: 0 auto;">
                            <img src={ data.defvalue.value?this.correctdate:this.errdate} style="width:32px;height:32px"/>
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
                let flag = false;
                let obj;
                this.datedef.forEach(item => {
                    if(item.date === idate) {
                        obj = item
                        flag = true
                    }
                });
                // 判断点击的日期是否为已经填写周报的日期
                if(flag) {
                    console.log('已填写',obj)
                } else {
                    if(this.isToday(date) != 1) {
                        this.dialogVisible = true;
                        this.open(idate);
                    }
                    /*if(this.isToday(date) === 3) {
                        console.log("今天")
                        this.dialogVisible = true;
                        this.dailyForm.reportDate = idate;
                        this.open(idate);
                    } else if(this.isToday(date) === 2) {
                        console.log('今天之前未填写',date.format("yyyy-MM-dd"))
                        this.dialogVisible = true;
                        this.dailyForm.reportDate = idate;
                        this.open(idate);
                    } else {
                        console.log("今天之后",date.format("yyyy-MM-dd"))
                    }*/
                }
            },

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

            getList() {
                ajax.get('core/projectreportdaily?projectId='+ this.$route.query.id).then(rs => {
                    console.log(rs)
                    this.datedef = rs;
                });
            },
            //进入编辑页调用 bean为列表页传入数据
            open(idate) {
                if (this.$route.query.id) {
                    ajax.get('core/projectreportdaily/getReportDailyDetail?id='
                        + this.$route.query.id +"&reportDate="+ idate).then(rs => {
                        if(rs.data) {
                            this.dailyForm = rs.data;
                        } else {
                            this.dailyForm = {};
                            this.dailyForm.reportDate = idate;
                            this.dailyForm.projectId = this.$route.query.id;
                        }
                    });
                }
            },
            //保存
            submitForm(form) {
                var data = this.dailyForm;
                data.updateTime = '';
                // alert(data.reportDate)
                /*if (this.isToday(new Date()) != 3) {
                    this.$message.error('只能对当日日报进行编辑');
                    return;
                }*/
                this.$refs[form].validate((valid) => {
                    if (!valid) {
                        this.$message.error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/projectreportdaily', data).then(rs => {
                        if (rs.status == 0) {
                            this.$message.success(rs.msg);
                            this.dialogVisible = false;
                            this.getList();
                        } else {
                            this.$message.error(rs.msg);
                        }
                    });
                });
            },
        }
    }
</script>

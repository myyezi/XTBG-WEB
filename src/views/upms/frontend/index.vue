<template>
  <div class="form-panel list-panel">
    <el-tabs v-model="activeName" @tab-click="getActiveName">
      <el-tab-pane label="富文本" name="1">
        <el-form :model="informationForm" :rules="rules" ref="chargeStationForm" label-position="top" label-width="100px" :class="{'register-form': true}">
          <el-collapse v-model="openCollapse">
            <el-collapse-item title="资讯管理" name="1">
              <div class="flex-panel">
                <el-form-item label="新闻标题" prop="title">
                  <el-input v-model="informationForm.title" placeholder="请输入新闻标题" maxlength=40 clearable></el-input>
                </el-form-item>

                <el-form-item label="新闻来源" prop="source">
                  <el-input v-model="informationForm.source" placeholder="请输入新闻来源" clearable></el-input>
                </el-form-item>
                <el-form-item label="新闻作者" prop="author">
                  <el-input v-model="informationForm.author" placeholder="请输入新闻作者" clearable></el-input>
                </el-form-item>

                <el-form-item label="资讯类型" prop="type">
                  <el-select v-model="informationForm.type" clearable placeholder="请选择资讯类型">
                    <el-option label="充电桩" value="1"></el-option>
                    <el-option label="车管家" value="2"></el-option>
                    <el-option label="光伏" value="3"></el-option>
                    <el-option label="储能" value="4"></el-option>
                    <el-option label="电网" value="5"></el-option>
                    <el-option label="水源" value="6"></el-option>
                    <el-option label="天然气" value="7"></el-option>
                    <el-option label="热能" value="11"></el-option>
                    <el-option label="融资" value="12"></el-option>
                    <el-option label="APP首页顶部轮播新闻" value="8"></el-option>
                    <el-option label="APP首页广告一" value="9"></el-option>
                    <el-option label="APP首页广告二" value="10"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="来源URL" prop="url">
                  <el-input v-model="informationForm.url" placeholder="请输入来源URL" clearable></el-input>
                </el-form-item>

                <el-form-item label="新闻封面图片（仅需上传一张）" prop="cover" class="big">
                  <upload-panel :size="1" accept=".jpg,.jpeg,.png,.gif" :file-list.sync="cover" :show-img="true"></upload-panel>
                </el-form-item>
                <el-form-item label="正文" prop="content" class="big">
                  <!-- 引入富文本组件 -->
                  <Tinymce ref="editor" v-model="informationForm.content" :height="400" />
                  <!-- <my-editor v-model="informationForm.content"></my-editor> -->
                </el-form-item>

                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <div class="left-row">
                        <el-button type="primary" @click="submitForm('chargeStationForm')">保存</el-button>
                        <el-button @click="close">返回</el-button>
                    </div>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="日报表日历" name="2">
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
            <el-tab-pane label="周报表" name="3" style="overflow: auto;">
                <div class="week_report">
                    <div class="week_report_title">清江输变电工程项目周报</div>
                    <div class="week_report_time">
                        <el-date-picker
                            v-model="valueYear"
                            type="year"
                            @change="getYear"
                            format="yyyy 年"
                            value-format="yyyy"
                            placeholder="选择年">
                        </el-date-picker>
                    </div>
                    <ul class="clearfix">
                        <li v-for="(item,index) in weekReportList" :key="index" class="clearfix" @click="getWeekReport(item)">
                            <p class="week_report_left">
                                <span v-if="index===0">本周（第{{item.weekName}}周）</span>
                                <span v-else>第 {{item.weekName}} 周</span>
                                <span>{{item.dateStart}}-{{item.dateEnd}}</span>
                            </p>
                            <p class="week_report_right">
                                <span>提交人：{{item.submitter}}</span>
                                <span>提交时间：{{item.submitDate}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
            <el-tab-pane label="树形控件" name="4">
                <tree-table></tree-table>
            </el-tab-pane>
            <el-tab-pane label="甘特图预览" name="5">
                <gantt-details></gantt-details>
            </el-tab-pane>
            <!-- <el-tab-pane label="甘特图操作" name="6">
              <gantt-opertion></gantt-opertion>
            </el-tab-pane> -->
            <!-- <el-tab-pane label="流程设置" name="7">
                <el-dialog title="流程设置" :visible.sync="workDialogVisible"  :fullscreen="true" :append-to-body="true">
                    <div class="fd-nav-content">
                        <div class="workflow-design">
                            <work-flow :workFlowData="workFlowData"></work-flow>
                        </div>
                    </div>
                </el-dialog>
            </el-tab-pane> -->
        </el-tabs>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible"  width="80%">
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    // import MyEditor from '@/components/QuillEditor/index.vue'
    import UploadPanel from '@/components/UploadPanel/index'
    import Tinymce from '@/components/Tinymce'
    import eleCalendar from 'ele-calendar'
    import 'ele-calendar/dist/vue-calendar.css' //引入css
    import weekReportList from '@/mock/weekReport.js'
    import treeTable from './treeTable'
    import ganttDetails from './ganttDetails'
    import ganttOpertion from './ganttOpertion'
    import workFlow from './compent/work'
    export default {
        mixins: [tool, ruleTool],
        components: {Tinymce,UploadPanel,eleCalendar,treeTable,ganttDetails,ganttOpertion,workFlow},
        data() {
            return {
                workDialogVisible:false,
                activeName: '1',
                informationForm: {},
                providers: [],
                cover:[],
                openCollapse: ["1"],//默认打开的面板
                rules: {
                    title: [
                        {required: true, message: '请输入新闻标题', trigger: ['blur', 'change']}
                    ],
                    source: [
                        {required: true, message: '请输入新闻来源', trigger: ['blur', 'change']}
                    ],
                    type: [
                        {required: true, message: '请选择新闻类型', trigger: ['change']}
                    ],
                    content: [
                        {required: true, message: '请填写正文', trigger: ['change']}
                    ]
                    // ,
                    // cover: [
                    //     {required: true, message: '请选择图片', trigger: ['change']}
                    // ]
                },
                datedef:[
                    {date:"2019-06-15",content:'dweefef',cid:null},
                    {date:"2019-06-10",conten:null,cid:null},
                    {date:"2019-06-01",content:'123',cid:null},
                    {date:"2019-05-01",content:'123',cid:null},
                    {date:"2019-04-01",content:'123',cid:null},
                ],
                prop:'date', //对应日期字段名
                correctdate:require('@/styles/img/correctdate.png'),
                errdate:require('@/styles/img/errdate.png'),
                weekReportList:weekReportList,
                valueYear:new Date().getFullYear().toString(),
                dialogFormVisible:false,
                workFlowData:{
                    "name": "发起人",
                    "nodeId": "sid-startevent",
                    "type": "start",
                    "properties": {
                        "editName":false,
                    }
                }
                // workFlowData:{
                //     "name": "发起人",
                //     "nodeId": "sid-startevent",
                //     "type": "start",
                //     "properties": {
                //         "editName":true,
                //     },
                //     "childNode": {
                //         "name": "直接主管1",
                //         "type": "approver",
                //         "prevId": "sid-startevent",
                //         "nodeId": "702c_daec",
                //         "properties": {
                //             "editName":true,
                //             "activateType": "ONE_BY_ONE",
                //             "agreeAll": false,
                //             "actionerRules": [{
                //                 "type": "target_management",
                //                 "level": 1,
                //                 "isEmpty": false,
                //                 "autoUp": true
                //             }],
                //             "noneActionerAction": "admin"
                //         },
                //         "childNode": {
                //             "type": "route",
                //             "prevId": "702c_daec",
                //             "nodeId": "f701_e579",
                //             "conditionNodes": [{
                //                 "name": "条件1",
                //                 "type": "condition",
                //                 "prevId": "f701_e579",
                //                 "nodeId": "6232_3e8e",
                //                 "properties": {
                //                     "editName":true,
                //                     "conditions": [
                //                         [{
                //                             "type": "dingtalk_actioner_value_condition",
                //                             "paramKey": "DDHolidayField-J2BWEN12__options",
                //                             "paramLabel": "请假类型",
                //                             "paramValue": "",
                //                             "paramValues": ["年假"],
                //                             "isEmpty": false
                //                         }, {
                //                             "type": "dingtalk_actioner_range_condition",
                //                             "paramKey": "DDHolidayField-J2BWEN12__duration",
                //                             "paramLabel": "时长（天）",
                //                             "lowerBound": 1,
                //                             "upperBound": "",
                //                             "unit": "天",
                //                             "isEmpty": false
                //                         }]
                //                     ]
                //                 },
                //                 "childNode": {
                //                     "name": "UNKNOWN",
                //                     "type": "approver",
                //                     "prevId": "6232_3e8e",
                //                     "nodeId": "d2da_2444",
                //                     "properties": {
                //                         "editName":true,
                //                         "activateType": "ONE_BY_ONE",
                //                         "agreeAll": false,
                //                         "actionerRules": [{
                //                             "type": "target_management",
                //                             "level": 1,
                //                             "isEmpty": false,
                //                             "autoUp": true
                //                         }],
                //                         "noneActionerAction": "admin"
                //                     }
                //                 }
                //             }, {
                //                 "name": "条件4",
                //                 "type": "condition",
                //                 "prevId": "f701_e579",
                //                 "nodeId": "aba1_c924",
                //                 "properties": {
                //                     "editName":true,
                //                     "conditions": [
                //                         [{
                //                             "type": "dingtalk_actioner_value_condition",
                //                             "paramKey": "DDHolidayField-J2BWEN12__options",
                //                             "paramLabel": "请假类型",
                //                             "paramValue": "",
                //                             "paramValues": ["年假"],
                //                             "isEmpty": false
                //                         }, {
                //                             "type": "dingtalk_actioner_range_condition",
                //                             "paramKey": "DDHolidayField-J2BWEN12__duration",
                //                             "paramLabel": "时长（天）",
                //                             "lowerBound": 1,
                //                             "upperBound": "",
                //                             "unit": "天",
                //                             "isEmpty": false
                //                         }]
                //                     ]
                //                 },
                //                 "childNode": {
                //                     "name": "UNKNOWN",
                //                     "type": "approver",
                //                     "prevId": "aba1_c924",
                //                     "nodeId": "aab6_12f3",
                //                     "properties": {
                //                         "editName":true,
                //                         "activateType": "ONE_BY_ONE",
                //                         "agreeAll": false,
                //                         "actionerRules": [{
                //                             "type": "target_management",
                //                             "level": 1,
                //                             "isEmpty": false,
                //                             "autoUp": true
                //                         }],
                //                         "noneActionerAction": "admin"
                //                     },
                //                     "childNode": {
                //                         "type": "route",
                //                         "prevId": "aab6_12f3",
                //                         "nodeId": "281e_78f2",
                //                         "conditionNodes": [{
                //                             "name": "条件1",
                //                             "type": "condition",
                //                             "prevId": "281e_78f2",
                //                             "nodeId": "0e44_0924",
                //                             "properties": {
                //                                 "editName":true,
                //                                 "conditions": [
                //                                     [{
                //                                         "type": "dingtalk_actioner_value_condition",
                //                                         "paramKey": "DDHolidayField-J2BWEN12__options",
                //                                         "paramLabel": "请假类型",
                //                                         "paramValue": "",
                //                                         "paramValues": ["年假"],
                //                                         "isEmpty": false
                //                                     }, {
                //                                         "type": "dingtalk_actioner_range_condition",
                //                                         "paramKey": "DDHolidayField-J2BWEN12__duration",
                //                                         "paramLabel": "时长（天）",
                //                                         "lowerBound": 1,
                //                                         "upperBound": "",
                //                                         "unit": "天",
                //                                         "isEmpty": false
                //                                     }]
                //                                 ]
                //                             },
                //                             "childNode": {
                //                                 "type": "route",
                //                                 "prevId": "0e44_0924",
                //                                 "nodeId": "1867_5667",
                //                                 "conditionNodes": [{
                //                                     "name": "条件1",
                //                                     "type": "condition",
                //                                     "prevId": "1867_5667",
                //                                     "nodeId": "e7d2_6a2f",
                //                                     "properties": {
                //                                         "editName":true,
                //                                         "conditions": [
                //                                             [{
                //                                                 "type": "dingtalk_actioner_value_condition",
                //                                                 "paramKey": "DDHolidayField-J2BWEN12__options",
                //                                                 "paramLabel": "请假类型",
                //                                                 "paramValue": "",
                //                                                 "paramValues": ["事假"],
                //                                                 "isEmpty": false
                //                                             }, {
                //                                                 "type": "dingtalk_actioner_range_condition",
                //                                                 "paramKey": "DDHolidayField-J2BWEN12__duration",
                //                                                 "paramLabel": "时长（天）",
                //                                                 "lowerBound": 1,
                //                                                 "upperBound": "",
                //                                                 "unit": "天",
                //                                                 "isEmpty": false
                //                                             }]
                //                                         ]
                //                                     },
                //                                     "childNode": {
                //                                         "name": "UNKNOWN",
                //                                         "type": "approver",
                //                                         "prevId": "e7d2_6a2f",
                //                                         "nodeId": "fd31_542d",
                //                                         "properties": {
                //                                             "editName":true,
                //                                             "activateType": "ONE_BY_ONE",
                //                                             "agreeAll": false,
                //                                             "actionerRules": [{
                //                                                 "type": "target_management",
                //                                                 "level": 1,
                //                                                 "isEmpty": false,
                //                                                 "autoUp": true
                //                                             }],
                //                                             "noneActionerAction": "admin"
                //                                         }
                //                                     }
                //                                 }, {
                //                                     "name": "条件2",
                //                                     "type": "condition",
                //                                     "prevId": "1867_5667",
                //                                     "nodeId": "677f_a9ce",
                //                                     "properties": {
                //                                         "editName":true,
                //                                         "conditions": [
                //                                             [{
                //                                                 "type": "dingtalk_actioner_value_condition",
                //                                                 "paramKey": "DDHolidayField-J2BWEN12__options",
                //                                                 "paramLabel": "请假类型",
                //                                                 "paramValue": "",
                //                                                 "paramValues": ["事假"],
                //                                                 "isEmpty": false
                //                                             }, {
                //                                                 "type": "dingtalk_actioner_range_condition",
                //                                                 "paramKey": "DDHolidayField-J2BWEN12__duration",
                //                                                 "paramLabel": "时长（天）",
                //                                                 "lowerBound": 1,
                //                                                 "upperBound": "",
                //                                                 "unit": "天",
                //                                                 "isEmpty": false
                //                                             }]
                //                                         ]
                //                                     }
                //                                 }],
                //                                 "properties": {}
                //                             }
                //                         }, {
                //                             "name": "条件2",
                //                             "type": "condition",
                //                             "prevId": "281e_78f2",
                //                             "nodeId": "732d_0c35",
                //                             "properties": {
                //                                 "editName":true,
                //                                 "conditions": [
                //                                     [{
                //                                         "type": "dingtalk_actioner_value_condition",
                //                                         "paramKey": "DDHolidayField-J2BWEN12__options",
                //                                         "paramLabel": "请假类型",
                //                                         "paramValue": "",
                //                                         "paramValues": ["事假"],
                //                                         "isEmpty": false
                //                                     }, {
                //                                         "type": "dingtalk_actioner_range_condition",
                //                                         "paramKey": "DDHolidayField-J2BWEN12__duration",
                //                                         "paramLabel": "时长（天）",
                //                                         "lowerBound": 1,
                //                                         "upperBound": "",
                //                                         "unit": "天",
                //                                         "isEmpty": false
                //                                     }]
                //                                 ]
                //                             }
                //                         }],
                //                         "properties": {}
                //                     }
                //                 }
                //             }, {
                //                 "name": "条件3",
                //                 "type": "condition",
                //                 "prevId": "f701_e579",
                //                 "nodeId": "f4c2_31b3",
                //                 "properties": {
                //                     "editName":true,
                //                     "conditions": []
                //                 }
                //             }],
                //             "properties": {},
                //             "childNode": {
                //                 "name": "UNKNOWN",
                //                 "type": "approver",
                //                 "prevId": "f701_e579",
                //                 "nodeId": "d5bb_ea83",
                //                 "properties": {
                //                     "editName":true,
                //                     "activateType": "ONE_BY_ONE",
                //                     "agreeAll": false,
                //                     "actionerRules": [{
                //                         "type": "target_select",
                //                         "multi": 0,
                //                         "select": ["allStaff"],
                //                         "range": {
                //                             "approvals": [],
                //                             "labels": [],
                //                             "allStaff": null
                //                         },
                //                         "isEmpty": false,
                //                         "key": "manual_d5bb_ea83_2204_347d"
                //                     }]
                //                 },
                //                 "childNode": {
                //                     "name": "UNKNOWN",
                //                     "type": "approver",
                //                     "prevId": "d5bb_ea83",
                //                     "nodeId": "3332_94bf",
                //                     "properties": {
                //                         "editName":true,
                //                         "activateType": "ONE_BY_ONE",
                //                         "agreeAll": false,
                //                         "actionerRules": [{
                //                             "type": "target_originator",
                //                             "isEmpty": false
                //                         }]
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }
            }
        },
        mounted() {
            this.open();
        },
        methods: {
            getActiveName() {
                if(this.activeName == 7) {
                    this.workDialogVisible = true
                    this.$nextTick(() => {
                        let divs = document.getElementById('workflow');
                        let div = document.getElementById('workflowDesign');
                        let iMove = (div.scrollWidth-document.body.offsetWidth)/2
                        divs.scrollTo(iMove,0)
                    })
                }
            },
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
                this.dialogFormVisible = true
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
                    if(this.isToday(date) === 3) {
                        console.log("今天")
                    } else if(this.isToday(date) === 2) {
                        console.log('今天之前未填写',date.format("yyyy-MM-dd"))
                    } else {
                        console.log("今天之后",date.format("yyyy-MM-dd"))
                    }
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

            // 周报表选择年
            getYear() {
                if(this.valueYear) {
                    console.log(this.valueYear)
                } 
            },
            // 点击周报
            getWeekReport(item) {
                this.dialogFormVisible = true
                console.log(item)
            },
            //进入编辑页调用 bean为列表页传入数据
            open() {
                if (this.$route.query.id) {
                    ajax.get('base/information/' + this.$route.query.id).then(rs => {
                        rs.data.type = rs.data.type.toString();
                        this.informationForm = rs.data;
                        if (null != rs.data.cover && rs.data.cover.length > 0) {
                            this.cover = JSON.parse(rs.data.cover);
                        }
                    });
                }
            },
            //保存
            submitForm(form) {
                var data = this.informationForm;
                console.log(this.informationForm)
                this.$refs[form].validate((valid) => {
                    if (!valid) {
                        this.$message.error('校验不通过，请检查输入项');
                        return;
                    }
                    if (this.cover && this.cover.length > 0) {
                        data.cover = JSON.stringify(this.cover);
                    }
                    ajax.post('base/information', data).then(rs => {
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
<style lang="scss">
    .week_report {
        min-width: 1208px;
    }
    .week_report_title {
        margin:0 20px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: #333;
        line-height: 50px;
        border-bottom: 1px solid #e2e4e7;
    }
    .week_report_time {
        width: 200px;
        margin: 20px auto 0;
    }
    .week_report ul {
        padding-left:20px; 
        margin-top:20px;
    }
    .week_report li {
        float: left;
        width: calc(25% - 40px);
        margin: 0 40px 30px 0;
        padding: 10px;
        border: 1px solid #E6E7E9;
        border-top: 3px solid #97B3CE;
        cursor: pointer;
    }
    .week_report li:hover{
        box-shadow: 0px 0px 14px #ccc;
    }
    .week_report li:nth-child(1) {
        border: 1px solid #fe7300;
        border-top: 3px solid #fe7300;
    }
    .week_report li:nth-child(4n) {
        margin-right:0;
    }
    .week_report li .week_report_left {
        float:left;
    }
    .week_report li .week_report_right {
        float:right;
    }
    .week_report li .week_report_left span {
        display: block;
        font-weight: bold;
        font-size: 18px;
        color:#40485b;
    }
    .week_report li .week_report_right span {
        display: block;
        font-size: 14px;
        color: #005980;
    }
    .week_report li .week_report_left span:nth-child(2) {
        font-weight: normal;
        margin-top: 8px;
        font-size: 14px;
        color:#8c92a4;
    }
    .week_report li .week_report_right span:nth-child(2) {
        margin-top: 8px;
    }
    .project_title {
        font-size: 26px;
        color: #333;
        margin-bottom: 20px;
    }
    .project_title span{
        font-weight: bold;
    }
    .project_date {
        color: #333;
        font-weight: bold;
        font-size: 16px;
    }
    .fd-nav-content {
        position: fixed;
        top: 56px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        // overflow-x: hidden;
        overflow-y: auto;
        padding-bottom: 30px;
    }
    .workflow-design {
        width: 100%;
        overflow: auto;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background: #f5f5f7;
        .box-scale {
            transform: scale(1);
            display: inline-block;
            position: relative;
            width: 100%;
            height: 100%;
            padding: 54.5px 0;
            align-items: flex-start;
            justify-content: center;
            flex-wrap: wrap;
            min-width: min-content;
            background-color: #f5f5f7;//背景色
            transform-origin: 0 0 0;
        }
    }
</style>


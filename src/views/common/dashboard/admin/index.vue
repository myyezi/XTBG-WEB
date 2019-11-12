<template>
    <div class="app-container white-bg list-panel" v-cloak style="background: #ecf0f1;">
        <div class="el-row">
            <div class="el-col el-col-12">
                <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header home-card-heard">
                        <div class="home_title clearfix">
                            <p class="clearfix"><img src="../../../../styles/img/xm.png" /><span>项目分布一览</span></p> 
                        </div>
                    </div>
                    <div class="el-card__body" style="height:500px;padding-top:0">
                        <div class="project_statistics_swtich clearfix">
                            <ul class="clearfix">
                                <li v-for="(item,index) in companyList" :key="index" :class="{'company_active':item.active}" @click="companyClick(item)">{{item.name}}</li>
                            </ul>
                            <el-dropdown split-button  size="mini" @command="handleClick1" style="float:right;margin-top: 6px;">
                                {{projectName}}
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :disabled="projectName==='全部'" command="1">全部</el-dropdown-item>
                                    <el-dropdown-item :disabled="projectName==='进行中'" command="2">进行中</el-dropdown-item>
                                    <el-dropdown-item :disabled="projectName==='已暂停'" command="3">已暂停</el-dropdown-item>
                                    <el-dropdown-item :disabled="projectName==='已完成'" command="4">已完成</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <ve-map :vMapData="vMapData"></ve-map>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-12" style="width: calc(50% - 10px);margin: 0 0 10px 10px;">
                <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header home-card-heard">
                        <div class="home_title clearfix">
                            <p class="clearfix"><img src="../../../../styles/img/xm.png" /><span>业主分布一览</span></p> 
                        </div>
                    </div>
                    <div class="el-card__body" style="height:500px;">
                        <ve-map :vMapData="vMapData"></ve-map>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-12">
                <div class="el-card box-card is-always-shadow">
                    <div class="el-card__body home-card-body">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="待办" name="doTaskTab">
                            <el-table border :data="doTaskList" style="width: 100%; height: 406px">
                                <el-table-column label="序号" fixed type="index" width="50"></el-table-column>
                                <el-table-column label="操作" width="100">
                                    <template fixed slot-scope="{ row, column, $index }">
                                        <el-button v-if="row.type != 3" @click="approval(row.id, row.type)" type="text" size="small">审批</el-button>
                                        <el-button v-else @click="approval(row.id, row.type)" type="text" size="small">签收</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="事项名称" width="150">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="toIndexProject(scope.row)">
                                            {{scope.row.name}}
                                        </el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="content" label="事项内容" width="250"></el-table-column>
                                <el-table-column prop="taskType" show-overflow-tooltip label="类型">事项审批</el-table-column>
                                <el-table-column prop="createTime" label="发布时间" width="200"></el-table-column>
                            </el-table>
                        </el-tab-pane>

                        <el-tab-pane label="已办" name="hisTaskTab">
                            <el-table border :data="hisTaskList" style="width: 100%; height: 406px">
                                <el-table-column label="序号" fixed type="index" width="50"></el-table-column>
                                <el-table-column prop="name" label="事项名称" width="150">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="toIndexProject(scope.row)">
                                            {{scope.row.name}}
                                        </el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="content" label="事项内容" width="250"></el-table-column>
                                <el-table-column prop="taskType" show-overflow-tooltip label="类型">事项审批</el-table-column>
                                <el-table-column prop="createTime" label="发布时间" width="200"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-12" style="width: calc(50% - 10px);margin: 0 0 10px 10px;">
                <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header home-card-heard">
                        <div class="home_title clearfix">
                            <p class="clearfix"><img src="../../../../styles/img/xm.png" /><span>项目数量统计</span></p> 
                        </div>
                    </div>
                    <div class="el-card__body">
                        <ve-histogram 
                            :data="chartDataCarApply"
                            height="400px" 
                            style="padding-top:10px" 
                            :legend="legendPie"
                            :textStyle="textStyle"
                            :yAxis="yAxisStore"
                            :extend="xAxis"
                        ></ve-histogram>
                    </div>
                </div>
            </div>
            <el-dialog title="待办-审批" width="400px" :visible.sync="approvalDialogVisible" :append-to-body="true" class="el-dialog__body">
                <el-form :model="approvalForm" :rules="rules" ref="approvalForm" label-position="top" label-width="100px">
                    <el-form-item label="是否通过" prop="approvalStatus">
                        <el-radio v-model="approvalForm.approvalStatus" label="2">通过</el-radio>
                        <el-radio v-model="approvalForm.approvalStatus" label="3">不通过</el-radio>
                    </el-form-item>
                    <el-form-item label="审批原因" prop="reason" v-if="approvalForm.approvalStatus == 3">
                        <!--<el-input type="textarea" v-model="noticeForm.content" placeholder="请输入通知" maxlength=20 clearable></el-input>-->
                        <el-input type="textarea" v-model="approvalForm.reason" placeholder="请输入原因" maxlength=200 clearable></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitApprovalForm('approvalForm')">保存</el-button>
                    <el-button @click="approvalDialogVisible = false">返回</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- <div class="el-row">
            <div class="el-col el-col-24">
                <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header home-card-heard">
                        <div class="home_title">
                            <p class="clearfix"><img src="../../../../styles/img/dt.png" /> <span>项目状态一览表</span></p>
                            <div class="home_project_stauts clearfix">
                                <span v-model="searchParam.projectStatus" @click="getProjectListByStatus()" style="color: #666666"><i class="project_stauts1"></i>全部（{{projectNum0}}）</span>
                                <span v-model="searchParam.projectStatus" @click="getProjectListByStatus(1)" style="color: #FFA600"><i class="project_stauts2"></i>暂存（{{projectNum1}}）</span>
                                <span v-model="searchParam.projectStatus" @click="getProjectListByStatus(2)" style="color: #41C0D0"><i class="project_stauts3"></i>进行中（{{projectNum2}}）</span>
                                <span v-model="searchParam.projectStatus" @click="getProjectListByStatus(3)" style="color: #AD8CF5"><i class="project_stauts4"></i>已暂停（{{projectNum3}}）</span>
                                <span v-model="searchParam.projectStatus" @click="getProjectListByStatus(4)" style="color: #AD8C00"><i class="project_stauts5"></i>已完成（{{projectNum4}}）</span>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 20px;">
                        <el-autocomplete
                            style="width:calc(100% - 100px);margin: 0 10px 0 20px;"
                            prefix-icon="el-icon-search"
                            class="inline-input"
                            v-model="inputSearch"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入项目名称关键字搜索"
                        ></el-autocomplete>
                        <el-button @click="getProjectListByname()" style="padding:9px;border: 1px solid #3ab7c7;border: 1px solid #3ca9b7;background: #3ca9b7;color: #fff;">搜索</el-button>
                    </div>
                    <div class="el-card__body">
                        <el-table :data="list" style="width: 100%">
                            <el-table-column
                                label="序号"
                                fixed
                                type="index"
                                width="50">
                            </el-table-column>
                            <el-table-column prop="projectStatusText" sortable show-overflow-tooltip min-width="100" label="状态">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.projectStatus == 1" style="color: #FFA600;font-size: 13px;">{{scope.row.projectStatusText}}</span>
                                    <span v-if="scope.row.projectStatus == 2" style="color: #41C0D0;font-size: 13px;">{{scope.row.projectStatusText}}</span>
                                    <span v-if="scope.row.projectStatus == 3" style="color: #AD8CF5;font-size: 13px;">{{scope.row.projectStatusText}}</span>
                                    <span v-if="scope.row.projectStatus == 4" style="color: #AD8C00;font-size: 13px;">{{scope.row.projectStatusText}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="项目名称">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="toIndexProject(scope.row)">
                                        {{scope.row.name}}
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="100" label="项目类型"></el-table-column>
                            <el-table-column prop="startTime" sortable show-overflow-tooltip min-width="100" label="计划开工日期"></el-table-column>
                            <el-table-column prop="endTime" sortable show-overflow-tooltip min-width="100" label="计划完工日期"></el-table-column>
                        </el-table>
                        <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            :current-page=pageList.current
                            :page-size=pageList.size
                            :total=pageList.total>
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    import VeMap from './components/map'
    import {VeHistogram} from 'v-charts'

    export default {
        name: 'DashboardAdmin',
        mixins: [tool, ruleTool],
        components: {
            VeMap,VeHistogram
        },
        data() {
            this.legendPie = {
                itemWidth:30,
                itemGap:20,
                textStyle:{
                    color:"#333"
                }
            }
            this.textStyle = {
                // color:"#2bb6ff",
                // fontWeight:'bold',
                fontSize:14
            }
            this.yAxisStore = [{
                name:'个',
                splitLine:{
                    lineStyle:{
                        color:"#1e265c"
                    }
                }
            }]
            this.xAxis = {
                'xAxis.0.axisLabel.interval': 0,//x轴显示全
                'xAxis.0.axisTick.show': false,
                // 'xAxis.0.axisLabel.rotate': 10,//x轴文本倾斜
                series: {
                    label: { show: true, position: "top" },
                    itemStyle:{
                        barBorderRadius: [30, 30, 0, 0],
                    }
                },
                color:['#a9abe8','#98d4d2','#e8cdba','#a3d6a9']
            }
            this.chartSettings = {
                area: true,
            }
            return {
                companyList:[{
                    name:'能源公司',
                    active:true
                },{
                    name:'科技公司'
                },{
                    name:'运营公司'
                },{
                    name:'建筑公司'
                },],
                chartDataCarApply: {
                    columns: ['日期', '能源公司','科技公司','运营公司','建筑公司'],
                    rows: [{
                        '日期':'2019年',
                        '能源公司':67,
                        '科技公司':100,
                        '运营公司':12,
                        '建筑公司':57,
                    },{
                        '日期':'2018年',
                        '能源公司':67,
                        '科技公司':100,
                        '运营公司':12,
                        '建筑公司':57,
                    },{
                        '日期':'2017年',
                        '能源公司':67,
                        '科技公司':100,
                        '运营公司':12,
                        '建筑公司':57,
                    },{
                        '日期':'2016年',
                        '能源公司':67,
                        '科技公司':100,
                        '运营公司':12,
                        '建筑公司':57,
                    },{
                        '日期':'2015年',
                        '能源公司':67,
                        '科技公司':100,
                        '运营公司':12,
                        '建筑公司':57,
                    }]
                },
                pageList:[],

                approvalForm: {},
                approvalDialogVisible: false,
                activeName: "doTaskTab",
                doTaskList: [],
                hisTaskList: [],
                inputSearch:'',
                projectName:'全部',
                projectNameList: [],
                projectList:[],
                // listUrl: "power/powerprojecttask?projectStatus=2",
                listUrl: "power/powerproject",
                projectNum0:0,
                projectNum1:0,
                projectNum2:0,
                projectNum3:0,
                projectNum4:0,
                tableData: [],
                vMapData:[],
                projectStatus:'',
                projectNameArr:['全部', '进行中','已暂停','已完成'],

                // showApprovalBtn: this.getCurrentUserAuthority("/powerprojectapproval/save"),
                rules: {
                    approvalStatus: [
                        {required: true, message: '请选择审批状态', trigger: ['blur']}
                    ],
                    reason: [
                        {required: true, message: '请输入审批原因', trigger: ['blur']}
                    ],
                },

                pageC :1,
                pageS :10,
                beforeStatus : '',

            }
        },
        computed: {},
        created () {
        },
        mounted() {
            // this.getList();
            this.getProjectListByStatus()
            this.getMessageList();
            this.getMapProjectList();
            this.getProjectCountByStatus();
            this.loadProjectNameList();
        },
        methods: {
            // 切换公司事件
            companyClick(item) {
                this.companyList.forEach(items => {
                    this.$set(items,'active',false);
                });
                this.$set(item,'active',true);
            },
            getMessageList() {
                ajax.get('/power/powerprojectapproval/getDoTaskList?size=9').then(rs => {
                    this.doTaskList = rs;
                });
            },
            handleClick(tab, event) {
                if(tab.name == 'doTaskTab') {
                    this.getMessageList()
                } else if (tab.name == 'hisTaskTab') {
                    ajax.get('/power/powerprojectapproval/getHisTaskList?size=9').then(rs => {
                        this.hisTaskList = rs;
                    });
                }
            },

            approval(id, type) {
                if(type != 3) {
                    console.log(id, type)
                    this.approvalDialogVisible = true
                    this.approvalForm.id = id
                    this.approvalForm.type = type
                } else {
                    this.$confirm("确认签收吗？").then(_ => {
                        let data = {}
                        data.id = id
                        data.signStatus = 2
                        data.signTime = 'qianshou'
                        ajax.post('power/powerprojecttask', data).then(rs => {
                            if (rs.status == 0) {
                                this.$message.success(rs.msg);
                                this.getMessageList()
                            } else {
                                this.$message.error(rs.msg);
                            }
                        });
                    }).catch(_ => {
                    });
                }
            },
            //保存
            submitApprovalForm(form) {
                var data = this.approvalForm;
                this.$refs[form].validate((valid) => {
                    if (!valid) {
                        this.$message.error('校验不通过，请检查输入项');
                        return;
                    }
                    if(data.type == 1) {
                        ajax.post('power/powerprojectapproval', data).then(rs => {
                            if (rs.status == 0) {
                                this.$message.success(rs.msg);
                                this.approvalDialogVisible = false
                                this.getMessageList()
                            } else {
                                this.$message.error(rs.msg);
                            }
                        });
                    } else if(data.type == 2) {
                        data.approvalReason = data.reason
                        ajax.post('power/powerprojectextension/approval', data).then(rs => {
                            if (rs.status == 0) {
                                this.$message.success(rs.msg);
                                this.approvalDialogVisible = false
                                this.getMessageList()
                            } else {
                                this.$message.error(rs.msg);
                            }
                        });
                    }
                });
            },

            // 根据项目状态获取所有项目(2-进行中，3-已暂停，4-已完成)
            getMapProjectList() {
                ajax.get('/power/powerproject/getProjectList',{
                    projectStatus:this.projectStatus
                }).then(rs => {
                    this.vMapData = rs.data
                });
            },

            getProjectCountByStatus() {
                ajax.get('/power/powerproject/getProjectCountByStatus').then(rs => {
                    this.projectNum0 = rs.data.allCount
                    this.projectNum1 = rs.data.status1
                    this.projectNum2 = rs.data.status2
                    this.projectNum3 = rs.data.status3
                    this.projectNum4 = rs.data.status4
                });
            },
            getProjectListByname() {
                ajax.get('/power/powerproject',{
                    projectStatus:'',
                    keyWord: this.inputSearch
                    // name: this.inputSearch
                }).then(rs => {
                    this.list = rs.records
                    this.listCount = rs.total
                });
            },
            getProjectListByStatus(status) {
                console.log("this.beforeStatus="+ this.beforeStatus)
                console.log("this.status="+ status)
                if(this.beforeStatus != status) {
                    this.pageC = 1
                }
                ajax.get('/power/powerproject',{projectStatus:status,current:this.pageC,size:this.pageS}).then(rs => {
                    this.list = rs.records
                    this.listCount = rs.total
                    this.pageList = rs
                    this.pages = rs.pages
                    this.projectStatus = status
                    this.beforeStatus = rs.projectStatus
                });
            },

            handleClick1(data) {
                this.projectStatus = parseInt(data)
                this.projectName = this.projectNameArr[(this.projectStatus - 1)]
                this.getMapProjectList()
            },

            querySearch(queryString, cb) {
                let projectNameList = this.projectNameList;
                let results = queryString ? projectNameList.filter(this.createFilter(queryString)) : projectNameList;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadProjectNameList() {
                ajax.get('/power/powerproject/getProjectList').then(rs => {
                    this.projectNameList = rs.data;
                });
            },

            toIndexProject(row) {
                console.log(row)
                this.$router.push({
                    path: '/power/powerprojecttask/detail/'+ row.taskId,
                    // query: {id:row.id}
                })
            },


            //切换页容量
            handleSizeChange2(val) {
                this.pageSize = val;
                this.pageC = 1;
                this.getProjectListByStatus(this.projectStatus);
            },
            //翻页
            handleCurrentChange2(val) {
                this.pageC = val;
                this.getProjectListByStatus(this.projectStatus);
            },
        }
    }
</script>
<style lang="scss">
    .project_statistics_swtich {
        padding-bottom:20px;
        ul {
            float: left;
            li {
                float: left;
                text-align: center;
                height: 40px;
                line-height: 40px;
                margin: 0 10px;
                cursor: pointer;
            }
            .company_active {
                color:#29c9bb;
                border-bottom: 2px solid #29c9bb;
            }
        }
    }
    .home-card-heard {
        border-bottom: 1px solid #fff;
        height: 60px;
    }
    .home-card-body {
        .el-tabs__item {
            margin: 13px 0;
        }
    }
    .home_title {
        p {
            float:left;
            margin:0;
            span{
                float:left;
                margin: 6px 5px;
            }
            img {
                float:left;
            }
        }
    }
    .home_project_stauts {
        float:right;
        line-height: 34px;
    }
    .home_project_stauts span {
        float:left;
        margin-right:10px;
        cursor: pointer;
    }
    .home_project_stauts span:nth-child(3) {
        margin-right:0;
    }
    .home_project_stauts span i {
        display: inline-block;
        width:5px;
        height:5px;
        border-radius: 50%;
        margin: 3px;
    }
    .home_project_stauts span:nth-child(1) {
        color:#909399;
    }
    .home_project_stauts span:nth-child(2) {
        color:#409eff;
    }
    .home_project_stauts span:nth-child(3) {
        color:#67c23a;
    }
    .home_table_stauts i{
        display: inline-block;
        width:5px;
        height:5px;
        border-radius: 50%;
        margin: 2px 6px;
    }
    .project_stauts1 {
        background:#666666;
    }
    .project_stauts2 {
        background:#FFA600;
    }
    .project_stauts3 {
        background:#41C0D0;
    }
    .project_stauts4 {
        background:#AD8CF5;
    }
    .project_stauts5 {
        background:#AD8C00;
    }
</style>


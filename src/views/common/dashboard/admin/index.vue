<template>
    <div class="app-container white-bg list-panel" v-cloak style="background: #ecf0f1;">
        <div class="el-row">
            <div class="el-col el-col-15">
                <div class="el-card box-card is-always-shadow">
                    <!--<div class="el-card__header home-card-heard">
                        <div class="home_title clearfix">
                            &lt;!&ndash;<p class="clearfix"><img src="../../../../styles/img/xx.png" /><span>消息中心</span></p>&ndash;&gt;
                            &lt;!&ndash;<el-button type="text" style="float:right;padding:5px;border: 1px solid #3ab7c7;color:#246a73;" @click="moreMessage()">更多</el-button>&ndash;&gt;
                            <p class="clearfix"><img src="../../../../styles/img/xx.png" /><span>代办</span></p>
                        </div>
                    </div>
 
                    <div class="el-card__body">
                        <el-table
                            :data="tableData"
                            style="width: 100%"
                            height="400">
                            <el-table-column label="序号" fixed type="index" width="50"></el-table-column>
                            <el-table-column prop="typeText" label="事项名称" width="150"></el-table-column>
                            <el-table-column prop="projectName" label="事项内容" width="250"></el-table-column>
                            <el-table-column prop="content" show-overflow-tooltip label="类型"></el-table-column>
                            <el-table-column prop="createTime" label="发布时间" width="200"></el-table-column>
                        </el-table>
                    </div>-->
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="待办" name="doTaskTab">
                            <!--<el-table border :data="bigEventList" style="width: 100%; height: 466px">
                                <el-table-column prop="projectCode" sortable show-overflow-tooltip min-width="100" label="项目编号">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="toBigEventDetail(scope.row)">
                                            {{scope.row.projectCode}}
                                        </el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="projectName" sortable show-overflow-tooltip min-width="100" label="项目名称"></el-table-column>
                                <el-table-column prop="projectType" sortable show-overflow-tooltip min-width="100" label="项目类型"></el-table-column>
                                <el-table-column prop="description" sortable show-overflow-tooltip min-width="300" label="事件描述"></el-table-column>
                                <el-table-column prop="updater" sortable show-overflow-tooltip min-width="50" label="提交人"></el-table-column>
                                <el-table-column prop="eventDate" sortable show-overflow-tooltip min-width="50" label="事件日期"></el-table-column>
                            </el-table>-->
                            <el-table border :data="doTaskList" style="width: 100%; height: 466px">
                                <el-table-column label="序号" fixed type="index" width="50"></el-table-column>
                                <el-table-column prop="typeText" label="事项名称" width="150"></el-table-column>
                                <el-table-column prop="projectName" label="事项内容" width="250"></el-table-column>
                                <el-table-column prop="content" show-overflow-tooltip label="类型"></el-table-column>
                                <el-table-column prop="createTime" label="发布时间" width="200"></el-table-column>
                            </el-table>
                        </el-tab-pane>

                        <el-tab-pane label="已办" name="hisTaskTab">
                            <el-table border :data="hisTaskList" style="width: 100%; height: 466px">
                                <el-table-column label="序号" fixed type="index" width="50"></el-table-column>
                                <el-table-column prop="typeText" label="事项名称" width="150"></el-table-column>
                                <el-table-column prop="projectName" label="事项内容" width="250"></el-table-column>
                                <el-table-column prop="content" show-overflow-tooltip label="类型"></el-table-column>
                                <el-table-column prop="createTime" label="发布时间" width="200"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>

            <div class="el-col el-col-9" style="width: calc(37.5% - 10px);margin: 0 0 10px 10px;">
                <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header home-card-heard">
                        <div class="home_title clearfix">
                            <p class="clearfix"><img src="../../../../styles/img/xm.png" /><span>项目分布一览</span></p> 
                            <el-dropdown split-button  size="mini" @command="handleClick1" style="float:right;">
                                {{projectName}}
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :disabled="projectName==='进行中'" command="2">进行中</el-dropdown-item>
                                    <el-dropdown-item :disabled="projectName==='已暂停'" command="3">已暂停</el-dropdown-item>
                                    <el-dropdown-item :disabled="projectName==='已完成'" command="4">已完成</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                    <div class="el-card__body">
                        <ve-map :vMapData="vMapData"></ve-map>
                    </div>
                </div>
            </div>
        </div>

        <div class="el-row">
            <div class="el-col el-col-24">
                <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header home-card-heard">
                        <div class="home_title">
                            <p class="clearfix"><img src="../../../../styles/img/dt.png" /> <span>项目状态一览表</span></p>
                            <div class="home_project_stauts clearfix">
                                <span @click="getProjectListByStatus()" style="color: #666666"><i class="project_stauts1"></i>全部（{{projectNum0}}）</span>
                                <span @click="getProjectListByStatus(1)" style="color: #FFA600"><i class="project_stauts2"></i>暂存（{{projectNum1}}）</span>
                                <span @click="getProjectListByStatus(2)" style="color: #41C0D0"><i class="project_stauts3"></i>进行中（{{projectNum2}}）</span>
                                <span @click="getProjectListByStatus(3)" style="color: #AD8CF5"><i class="project_stauts4"></i>已暂停（{{projectNum3}}）</span>
                                <span @click="getProjectListByStatus(3)" style="color: #AD8C00"><i class="project_stauts4"></i>已完成（{{projectNum3}}）</span>
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
                            <el-table-column prop="planStartDate" sortable show-overflow-tooltip min-width="100" label="计划开工日期"></el-table-column>
                            <el-table-column prop="planEndDate" sortable show-overflow-tooltip min-width="100" label="计划完工日期"></el-table-column>
                        </el-table>
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="pageSizeSetting"
                            :page-size="pageSize"
                            :layout="pageLayout"
                            :total="listCount">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'
    import VeMap from './components/map'

    export default {
        name: 'DashboardAdmin',
        mixins: [tool],
        components: {
            VeMap
        },
        data() {
            this.chartSettings = {
                area: true
            }
            return {
                activeName: "doTaskTab",
                doTaskList: [],
                hisTaskList: [],
                inputSearch:'',
                projectName:'进行中',
                projectNameList: [],
                projectList:[],
                // listUrl: "power/powerprojecttask?projectStatus=2",
                listUrl: "power/powerproject?projectStatus=2",
                projectNum0:0,
                projectNum1:0,
                projectNum2:0,
                projectNum3:0,
                tableData: [],
                vMapData:[],
                projectStatus:2,
                projectNameArr:['进行中','已暂停','已完成']
            }
        },
        computed: {},
        created () {
        },
        mounted() {
            this.getList();
            this.getMessageList();
            this.getMapProjectList();
            this.getProjectCountByStatus();
            this.loadProjectNameList();
        },
        methods: {

            handleClick(tab, event) {
                if(tab.name == 'doTaskTab') {
                    this.getMessageList()
                } else if (tab.name == 'hisTaskTab') {
                    ajax.get('/power/powerprojectapproval?size=9').then(rs => {
                        this.hisTaskList = rs.records;
                    });
                }
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
                    this.projectNum1 = rs.data.startCount
                    this.projectNum2 = rs.data.goCount
                    this.projectNum3 = rs.data.endCount
                });
            },
            getProjectListByname() {
                ajax.get('/power/powerproject',{
                    projectStatus:'',
                    name: this.inputSearch
                }).then(rs => {
                    this.list = rs.records
                    this.listCount = rs.total
                });
            },
            getProjectListByStatus(status) {
                ajax.get('/power/powerproject',{
                    projectStatus:status
                }).then(rs => {
                    this.list = rs.records
                    this.listCount = rs.total
                });
            },
            moreMessage() {
                this.$router.push({path: '/upms/message'})
            },
            getMessageList() {
                ajax.get('/power/powerprojectapproval/getDoTasks1.id,List?size=9').then(rs => {
                    this.doTaskList = rs.records;
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
                    path: '/power/powerprojecttask/detail/'+ row.id,
                    // query: {id:row.id}
                })
            },
            forwardDetail(id, type, content) {
                if(type == 1) {
                    ajax.get('core/projectreportweekly/getWeeklyByNow').then(rs => {
                        if("第"+ rs.data.period +"期" == content) {
                            this.$router.push({
                                path: '/core/projectreportweekly/edit',
                                query: {id:id}
                            })
                        } else {
                            this.$router.push({
                                path: '/core/projectreportweekly/detail/'+id,
                            })
                        }
                    });
                } else if(type == 2) {
                    this.$router.push({
                        path: '/core/projectbigevent/detail/'+id,
                    })
                }
            }
        }
    }
</script>
<style lang="scss">
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
</style>


<template>
    <div class="app-container white-bg list-panel" v-cloak style="background: #ecf0f1;">
        <div class="el-row">
            <div class="el-col el-col-15">
                <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header">
                        <div class="home_title clearfix">
                            <span>消息中心</span>
                            <el-button type="text" style="float:right;margin-top: -12px;height: 28px;">更多 》</el-button>
                            <!-- <span style="float:right;color:#4781fe">更多 》</span> -->
                        </div>
                    </div>
 
                    <div class="el-card__body">
                        <el-table
                            :data="tableData"
                            style="width: 100%"
                            height="400">
                            <el-table-column
                                label="序号"
                                fixed
                                type="index"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="类型"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="province"
                                label="所属项目"
                            >
                            </el-table-column>
                            <el-table-column
                                label="消息描述"
                                width="300"
                            >
                                <template slot-scope="scope">
                                    <span>{{ scope.row.city&&scope.row.city.length>20? scope.row.city.substring(0,20)+'...':scope.row.city}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                label="时间"
                                width="100">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-9" style="width: calc(37.5% - 10px);
    margin: 0 0 10px 10px;">
                <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header">
                        <div class="clearfix">
                            <span>项目分布一览</span>
                            <el-dropdown split-button type="primary" size="mini" @command="handleClick" style="float:right;margin-top: -5px;height: 21px;">
                                {{projectName}}
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :disabled="projectName==='黄金糕'" command="黄金糕">黄金糕</el-dropdown-item>
                                    <el-dropdown-item :disabled="projectName==='狮子头'" command="狮子头">狮子头</el-dropdown-item>
                                    <el-dropdown-item :disabled="projectName==='螺蛳粉'" command="螺蛳粉">螺蛳粉</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                    <div class="el-card__body">
                        <ve-map></ve-map>
                    </div>
                </div>
            </div>
        </div>

        <div class="el-row">
            <div class="el-col el-col-24">
                <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header">
                        <div class="clearfix">
                            <span>项目状态一览表</span>
                            <el-input
                                style="width: 270px;margin-left: 20px;"
                                placeholder="请输入项目名称关键字搜索"
                                prefix-icon="el-icon-search"
                                v-model="inputSearch">
                            </el-input>
                            <div class="home_project_stauts clearfix">
                                <span><i class="project_stauts1"></i>未开始（{{projectNum1}}）</span>
                                <span><i class="project_stauts2"></i>进行中（{{projectNum2}}）</span>
                                <span><i class="project_stauts3"></i>已完工（{{projectNum3}}）</span>
                            </div>
                        </div>
                    </div>
                    <div class="el-card__body">
                        <el-table :data="list" style="width: 100%">
                            <el-table-column
                                label="序号"
                                fixed
                                type="index"
                                width="50">
                            </el-table-column>
                            <el-table-column 
                                prop="projectTypeText" sortable show-overflow-tooltip min-width="100" 
                                label="项目类型">
                                <template slot-scope="scope">
                                    <span class="home_table_stauts"><i class="project_stauts1"></i>{{ scope.row.projectTypeText}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column 
                                prop="code" sortable show-overflow-tooltip min-width="100" 
                                label="项目编号">
                            </el-table-column>
                            <el-table-column 
                                prop="name" sortable show-overflow-tooltip min-width="100" 
                                label="项目名称">
                            </el-table-column>
                            <el-table-column 
                                prop="score" sortable show-overflow-tooltip min-width="100" 
                                label="得分率">
                            </el-table-column>
                            <el-table-column 
                                prop="createTime" sortable show-overflow-tooltip min-width="100" 
                                label="评价时间">
                            </el-table-column>
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
                inputSearch:'',
                projectName:'黄金糕',
                listUrl: "core/projectevaluate",
                projectNum1:5,
                projectNum2:8,
                projectNum3:10,
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎小虎',
                    province: '上海',
                    city: '普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区',
                    }, {
                    date: '2016-05-02',
                    name: '王小虎小虎',
                    province: '上海',
                    city: '普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区',
                    }, {
                    date: '2016-05-04',
                    name: '王小虎小虎',
                    province: '上海',
                    city: '普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区',
                    }, {
                    date: '2016-05-01',
                    name: '王小虎小虎',
                    province: '上海',
                    city: '普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区',
                    }, {
                    date: '2016-05-08',
                    name: '王小虎小虎',
                    province: '上海',
                    city: '普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区普陀区',
                    }, {
                    date: '2016-05-06',
                    name: '王小虎小虎',
                    province: '上海',
                    city: '普陀区',
                    }, {
                    date: '2016-05-07',
                    name: '王小虎小虎',
                    province: '上海',
                    city: '普陀区',
                    }, {
                    date: '2016-05-06',
                    name: '王小虎小虎',
                    province: '上海',
                    city: '普陀区',
                    }, {
                    date: '2016-05-07',
                    name: '王小虎小虎',
                    province: '上海',
                    city: '普陀区',
                    }, {
                    date: '2016-05-06',
                    name: '王小虎小虎',
                    province: '上海',
                    city: '普陀区',
                    }]
            }
        },
        computed: {},
        created () {
        },
        mounted() {
            this.getList();
        },
        methods: {
            handleClick(data) {
                console.log(data)
                this.projectName = data
            }
        }
    }
</script>
<style>
    .home_project_stauts {
        float:right;
        line-height: 34px;
    }
    .home_project_stauts span {
        float:left;
        margin-right:10px;
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
        background:#909399;
    }
    .project_stauts2 {
        background:#409eff;
    }
    .project_stauts3 {
        background:#67c23a;
    }
</style>


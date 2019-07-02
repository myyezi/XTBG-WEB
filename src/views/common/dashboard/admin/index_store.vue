<template>
    <div class="app-container white-bg list-panel" v-cloak style="background: #ecf0f1">
        <div class="zlgl">
            <div class="el-card box-card is-always-shadow">
                <div class="el-card__header">
                    <div class="clearfix">
                        <span>门店信息</span>
                    </div>
                </div>
                <div class="md_detail_count">
                    <ul class="clearfix">
                        <li class="clearfix">
                            <span>门店名称：</span>
                            <span>{{storeForm.name}}</span>
                        </li>
                        <li class="clearfix">
                            <span>门店介绍：</span>
                            <span>{{storeForm.introduction}}</span>
                        </li>
                        <li class="clearfix">
                            <span>营业时间：</span>
                            <span>{{storeForm.hours}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="zlgl" style="margin:20px 0">
            <div class="el-card box-card is-always-shadow">
                <div class="el-card__header">
                    <div class="clearfix">
                        <span>经营数据</span>
                        <div style="float:right">
                            <el-button-group>
                                <el-button :type="day" size="mini" circle @click="changeType(1)">日</el-button>
                                <el-button :type="month" size="mini" circle @click="changeType(2)">月</el-button>
                            </el-button-group>
                        </div>
                    </div>
                </div>
                <div class="el-card__body">
                    <ve-line :data="chartDataElectricity"></ve-line>
                </div>
            </div>
        </div>

        <div class="table-box" style="padding-top:20px;background:#fff;">
            <div class="switch_table">
                <ul class="clearfix">
                    <li v-for="(item,index) in switchTableList" :key="index" :class="{'switch_active':item.active}" @click="getTable(item)">
                        {{item.name}}
                    </li>
                </ul>
            </div>
            <el-table :data="list" style="width: 100%" v-if="tableType == 1"><!--newCarApplyList-->
                <el-table-column fixed label="操作" width="120">
                    <template slot-scope="{ row, column, $index }">
                        <el-button v-if="row.applyStatus == 2" type="text" size="small">已处理</el-button>
                        <el-button v-else  @click="updateApplyStatus(row)" type="text" size="small">待处理</el-button>
                        <el-button @click="toDetail(row)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="customerName" sortable show-overflow-tooltip min-width="100" label="申请人账号"></el-table-column>
                <el-table-column prop="applyTime" sortable show-overflow-tooltip min-width="100" label="申请时间"></el-table-column>
                <el-table-column prop="storeName" sortable show-overflow-tooltip min-width="100" label="门店名称"></el-table-column>
                <el-table-column prop="brandName" sortable show-overflow-tooltip min-width="100" label="品牌"></el-table-column>
                <el-table-column prop="seriesName" sortable show-overflow-tooltip min-width="100" label="型号"></el-table-column>
                <el-table-column prop="style" sortable show-overflow-tooltip min-width="100" label="款式"></el-table-column>
                <el-table-column prop="salesPrice" sortable show-overflow-tooltip min-width="100" label="门店价格(万元)"></el-table-column>
                <el-table-column prop="approvalTime" sortable show-overflow-tooltip min-width="100" label="发布时间"></el-table-column>
                <el-table-column prop="payTypeText" sortable show-overflow-tooltip min-width="100" label="付款方式"></el-table-column>
            </el-table>
            <el-table :data="list" style="width: 100%" v-if="tableType == 2"><!--newCarApplyList-->
                <el-table-column fixed label="操作" width="120">
                    <template slot-scope="{ row, column, $index }">
                        <el-button v-if="row.applyStatus == 2" type="text" size="small">已处理</el-button>
                        <el-button v-else  @click="updateApplyStatus(row)" type="text" size="small">待处理</el-button>
                        <el-button @click="toDetail(row)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="customerName" sortable show-overflow-tooltip min-width="100" label="申请人账号"></el-table-column>
                <el-table-column prop="applyTime" sortable show-overflow-tooltip min-width="100" label="申请时间"></el-table-column>
                <el-table-column prop="storeName" sortable show-overflow-tooltip min-width="100" label="门店名称"></el-table-column>
                <el-table-column prop="brandName" sortable show-overflow-tooltip min-width="100" label="品牌"></el-table-column>
                <el-table-column prop="seriesName" sortable show-overflow-tooltip min-width="100" label="型号"></el-table-column>
                <el-table-column prop="style" sortable show-overflow-tooltip min-width="100" label="款式"></el-table-column>
                <el-table-column prop="salesPrice" sortable show-overflow-tooltip min-width="100" label="门店价格(万元)"></el-table-column>
                <el-table-column prop="approvalTime" sortable show-overflow-tooltip min-width="100" label="发布时间"></el-table-column>
                <el-table-column prop="payTypeText" sortable show-overflow-tooltip min-width="100" label="付款方式"></el-table-column>
            </el-table>
             <el-table :data="list" style="width: 100%" v-if="tableType == 3">
                <el-table-column fixed label="操作" width="100">
                    <template slot-scope="{ row, column, $index }">
                        <el-button v-if="row.applyStatus == 2"  type="text" size="small" disabled  style="color:gray">已处理</el-button>
                        <el-button v-else  @click="updateStatus(row)" type="text" size="small">待处理</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="account" sortable show-overflow-tooltip min-width="100" label="申请人账号"></el-table-column>
                <el-table-column prop="applyTime" sortable show-overflow-tooltip min-width="100" label="生申请时间"></el-table-column>
                <el-table-column prop="phone" sortable show-overflow-tooltip min-width="120" label="联系方式"></el-table-column>
                <el-table-column prop="maintenanceNature" sortable show-overflow-tooltip min-width="150" label="维保性质"></el-table-column>
                <el-table-column prop="cityName" sortable show-overflow-tooltip min-width="100" label="省市"></el-table-column>
                <el-table-column prop="detailedAddress" sortable show-overflow-tooltip min-width="100" label="详细地址"></el-table-column>
                <el-table-column prop="brand" sortable show-overflow-tooltip min-width="100" label="车辆品牌"></el-table-column>
                <el-table-column prop="series" sortable show-overflow-tooltip min-width="100" label="型号"></el-table-column>
                <el-table-column prop="problemDescription" sortable show-overflow-tooltip min-width="200" label="问题描述"></el-table-column>
                <el-table-column prop="storeName" sortable show-overflow-tooltip min-width="100" label="门店名称"></el-table-column>
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
</template>
<script>
    import {VeLine} from 'v-charts'
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'
    import $ from 'jquery-slim'

    export default {
        mixins: [tool],
        name: 'DashboardAdmin',
        components: {
            VeLine
        },
        data() {
            this.chartSettings = {
                area: true
            }
            return {
                storeForm: {},
                activeName: 'newCarApplyTab',
                newCarApplyList: [],
                oldCarApplyList: [],
                maintenanceApplyList: [],
                day: "primary",
                month: "info",
                year: "info",
                type: 1,
                tableType:1,
                chartDataElectricity: {
                    columns: ['日期', '订单量'],
                    rows: []
                },
                listUrl: "/car/newCar/getNewCarApplyList",
                switchTableList:[
                    {
                        name:'新车订单',
                        tableType:1,
                        listUrl:'/car/newCar/getNewCarApplyList'
                    },
                    {
                        name:'二手车订单',
                        tableType:2,
                        listUrl:'/car/newCar/getOldCarApplyList'
                    },
                    {
                        name:'维保订单',
                        tableType:3,
                        listUrl:'/car/newCar/getMaintenanceApplyList'
                    }
                ]
            }
        },
        computed: {},
        created () {
            this.switchTableList.forEach(items => {
                this.$set(items,'active',false);
            });
            this.$set(this.switchTableList[0],'active',true);
        },
        mounted() {
            this.getDaysElectricity();
            this.getStoreDetail();
            this.getList();
        },
        methods: {
            getTable(item) {
                this.page = 1
                this.pageSize = 10
                this.switchTableList.forEach(items => {
                    this.$set(items,'active',false);
                });
                this.$set(item,'active',true);
                this.tableType = item.tableType
                this.listUrl = item.listUrl
                this.getList();
            },
            changeType(type) {
                if (type == 1) {
                    this.day = "primary";
                    this.month = "info";
                    this.year = "info";
                }
                else if (type == 2) {
                    this.day = "info";
                    this.month = "primary";
                    this.year = "info";
                }
                else if (type == 3) {
                    this.day = "info";
                    this.month = "info";
                    this.year = "primary";
                }
                this.type = type;
                this.getDaysElectricity();
            },
            getStoreDetail () {
                ajax.get('/car/store/getStoreDetailByUserId').then(rs => {
                    if (rs.data) {
                        this.storeForm = rs.data;
                    }
                });
            },
            getDaysElectricity() {
                ajax.get('operation/workbench/getDaysElectricity/' + this.type).then(rs => {
                    if (rs.status === 0) {
                        var dataList = rs.data;
                        if (null != dataList && dataList.length > 0) {
                            var rowsArray = new Array();
                            for (var i in dataList) {
                                var obj = {};
                                obj.日期 = dataList[i].days;
                                obj.订单量 = dataList[i].orderAmount;
                                rowsArray.push(obj);
                            }
                            this.chartDataElectricity.rows = rowsArray;
                        } else {
                            this.chartDataElectricity.rows = [];
                        }
                    } else {
                        this.$message.error(rs.msg);
                    }
                });
            },
        }
    }
</script>
<style>
    .md_detail_count {
        padding: 20px;
    }
    .md_detail_count ul li{
        width:30%;
        float:left;
    }
    .md_detail_count ul li:nth-child(2){
        width:calc(40% - 20px);
        margin:0 10px;
    }
    .md_detail_count ul li span{
        float:left;
    }
    .md_detail_count ul li:nth-child(1) span:nth-child(2) {
        font-style: italic;
    }
    .md_detail_count ul li span:nth-child(1) {
        float:left;
        width:75px;
        color:#4781fe;
    }
    .md_detail_count ul li span:nth-child(2){
        float:left;
        width:calc(100% - 75px);
    }
    .zlgl {
        background: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border-radius: 4px;
    }
    .clearfix:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .switch_table ul{
        margin-bottom:20px;
    }
    .switch_table ul li{
        float:left;
        width:105px;
        height:36px;
        line-height: 36px;
        background:#eee;
        font-size:16px;
        text-align: center;
        color:#666;
        border-right:1px solid #ddd;
        box-sizing: border-box;
        cursor: pointer;
    }
    .switch_table ul li:nth-child(1){
        border-top-left-radius :5px;
        border-bottom-left-radius :5px
    }
    .switch_table ul li:nth-child(3){
        border-top-right-radius :5px;
        border-bottom-right-radius :5px;
        border-right:0;
    }
    .switch_table ul .switch_active {
        background:#4781fe;
        color:#fff;
    }
</style>


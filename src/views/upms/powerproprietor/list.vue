<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF;margin-right:10px" icon="el-icon-plus" size="small" @click="add()" >创建</el-button>
            <el-input v-model="searchParam.name" placeholder="请输入业主名称" clearable class="zy_input" style="width:190px"></el-input>
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-refresh" size="small" @click="resetList()">重置</el-button>
            <!--<el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button>-->
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">
                <div class="form-group">
                    <label class="control-label">联系人</label>
                    <div class="input-group input-groups">
                        <el-input v-model="searchParam.nameOrPhone" placeholder="请输入联系人姓名或手机号"></el-input>
                    </div>
                </div>
                <div class="form-box">
                    <div class="form-group">
                        <label class="control-label">地区</label>
                        <div class="input-group">
                            <city-select-panel :value.sync="citySelectArr" ref="citySelect" @change="citySelectOnchange"></city-select-panel>
                        </div>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
        <div class="division-line"></div>
        <div class="table-box">
            <el-table :data="list" style="width: 100%">
                <el-table-column fixed label="操作" width="100">
                    <template fixed slot-scope="{ row, column, $index }">
                        <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="业主名称">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="toDetail(scope.row)">
                            {{scope.row.name}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" sortable show-overflow-tooltip min-width="50" label="联系人">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showContactList(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="districtName" sortable show-overflow-tooltip min-width="100" label="地区"></el-table-column>
                <el-table-column prop="address" sortable show-overflow-tooltip min-width="150" label="详细地址"></el-table-column>
                <el-table-column prop="companyName" sortable show-overflow-tooltip min-width="100" label="所属管理公司"></el-table-column>
                <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" sortable show-overflow-tooltip min-width="100" label="更新时间"></el-table-column>
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

        <el-dialog width="800px" :visible.sync="contactDialogVisible" :append-to-body="true">
            <el-table ref="multipleTable" :data="contactList" tooltip-effect="dark" style="width: 100%">
                <el-table-column prop="name" label="联系人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="post" label="联系人职务" show-overflow-tooltip></el-table-column>
                <el-table-column prop="phone" label="联系人手机号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="email" label="联系人邮箱" show-overflow-tooltip></el-table-column>
                <el-table-column prop="department" label="联系人所在部门" show-overflow-tooltip></el-table-column>
            </el-table>
        </el-dialog>
    </div>

</template>

<script>
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'
    import CitySelectPanel from '@/components/CitySelect/index2'

    export default {
        name: 'PowerProprietor',
        mixins: [tool],
        components: {CitySelectPanel},
        data() {
            return {
                isShowMore:false,
                contactDialogVisible: false,
                contactList: [],
                listUrl: "power/powerproprietor",
                showSearch: false,
                citySelectArr:[],
                showAddBtn: this.getCurrentUserAuthority("/powerproprietor/save"),
                showEditBtn: this.getCurrentUserAuthority("/powerproprietor/edit")
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getListBefore(params) {
                if (this.searchParam.districtId) {
                    console.log(this.searchParam.districtId)
                    if(this.searchParam.districtId[2]) {
                        params.districtId = this.searchParam.districtId[2];
                    } else if(this.searchParam.districtId[1]) {
                        params.cityId = this.searchParam.districtId[1]
                        params.districtId = ''
                    } else {
                        params.provinceId = this.searchParam.districtId[0]
                        params.districtId = ''
                    }
                } else {
                    params.districtId = '';
                }
            },
            //重置筛选
            resetList() {
                this.searchParam = {};
                this.citySelectArr = [];
                this.handleCurrentChange(1);
            },
            showContactList(row) {
                this.contactDialogVisible = true
                ajax.get('power/powerproprietor/getContactListById?id='+ row.id).then(rs => {
                    this.contactList = rs.data;
                });
            },
            citySelectOnchange(){
                this.searchParam.province = "";
                this.searchParam.city = "";
                this.searchParam.district = "";
                if(this.citySelectArr.length>0){
                    this.searchParam.province = this.citySelectArr[0];
                    if(this.citySelectArr.length>1){
                        this.searchParam.city = this.citySelectArr[1];
                    }
                    if(this.citySelectArr.length>2){
                        this.searchParam.district = this.citySelectArr[2];
                    }
                }

            },
        }
    }
</script>
<style>
</style>

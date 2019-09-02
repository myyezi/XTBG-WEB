<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-input v-model="searchParam.nameOrPhone" placeholder="请输入姓名或手机号" clearable class="zy_input"
                      style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i
                :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="resetList()">重置</el-button>
            <!-- <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button> -->
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">
                <div class="form-box">
                    <div class="form-group">
                        <label class="control-label">组织</label>
                        <div class="input-group">
                            <el-select v-model="searchParam.companyId" filterable clearable placeholder="请选择">
                                <el-option
                                    v-for="item in companyList"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">学历</label>
                        <div class="input-group">
                            <el-select v-model="searchParam.education" multiple clearable filterable default-first-option
                                       placeholder="请选择学历">
                                <el-option v-for="item in educations" :key="item.value" :label="item.text"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">职称</label>
                        <div class="input-group">
                            <el-select v-model="searchParam.qualification" multiple clearable filterable default-first-option
                                       placeholder="职称">
                                <el-option v-for="item in qualifications" :key="item.value" :label="item.text"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">性别</label>
                        <div class="input-group input-groups">
                            <el-select v-model="searchParam.gender" filterable clearable>
                                <el-option label="男" :value="1"></el-option>
                                <el-option label="女" :value="2"></el-option>
                                <el-option label="未知" :value="3"></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
        <div class="division-line"></div>
        <div class="table-box">
            <el-table :data="list" style="width: 100%">
                <el-table-column prop="name" fixed sortable show-overflow-tooltip min-width="100"
                                 label="姓名"></el-table-column>
                <el-table-column prop="account" sortable min-width="120" label="手机号"></el-table-column>
                <el-table-column prop="gender" sortable show-overflow-tooltip min-width="80"
                                 label="性别"></el-table-column>
                <el-table-column prop="birthday" sortable show-overflow-tooltip min-width="100"
                                 label="生日"></el-table-column>
                <el-table-column prop="education" sortable show-overflow-tooltip min-width="100"
                                 label="学历"></el-table-column>
                <el-table-column prop="qualification" sortable show-overflow-tooltip min-width="100"
                                 label="职称"></el-table-column>
                <el-table-column prop="companys" sortable show-overflow-tooltip min-width="150"
                                 label="所属管理公司"></el-table-column>
                <el-table-column prop="createTime" sortable min-width="100" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" sortable min-width="100" label="更新时间"></el-table-column>
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
    import TreeSelect from '@/components/TreeSelect/index'
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'
    import {startProcessAsync} from '@/utils/index'
    import $ from 'jquery-slim'

    export default {
        name: 'user',
        mixins: [tool],
        components: {TreeSelect},
        data() {
            return {
                educations: [],
                qualifications: [],
                listUrl: "/upms/user",
                showSearch: false,
                isShowMore: false,
                companyList: [],
            }
        },
        mounted() {
            this.getDict();
            this.getList();
            this.getCompanys();
        },
        methods: {
            // 获取字典
            getDict() {
                let r = 'XL,ZC';
                ajax.get("upms/dict/allType/" + r).then(rs => {
                    this.educations = rs.XL;
                    this.qualifications = rs.ZC;
                });
            },
            getListBefore(params) {
                if (this.searchParam.education) {
                    params.education = this.searchParam.education.join(',');
                }
                if (this.searchParam.qualification) {
                    params.qualification = this.searchParam.qualification.join(',');
                }
            },

            getCompanys() {
                ajax.get('upms/organization/getAllManagerCompanyList').then(result => {
                    if (this.checkResponse(result)) {
                        this.companyList = result.data;
                    } else {
                        this.companyList = [];
                    }
                });
            },
        }
    }
</script>

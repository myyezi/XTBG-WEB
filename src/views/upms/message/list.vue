<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-input v-model="searchParam.content" placeholder="请输入消息内容" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多条件<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="resetList()">重置</el-button>
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">
                <div class="form-group">
                    <label class="control-label">类型</label>
                    <div class="input-group">
                        <el-select v-model="searchParam.type" placeholder="全部" clearable>
                            <el-option label="类型1" :value="1"></el-option>
                            <el-option label="类型2" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
        <div class="division-line"></div>
        <div class="table-box">
            <el-table :data="list" style="width: 100%">
                <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="50" label="类型"></el-table-column>
                <el-table-column prop="content" sortable show-overflow-tooltip min-width="300" label="消息内容">
                    <!--<template fixed slot-scope="{ row, column, $index }">
                        <el-button v-show="showEditBtn" @click="forwardDetail(row.sourceId, row.type, row.content)" type="text" size="small">{{row.content}}</el-button>
                    </template>-->
                </el-table-column>
                <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="50" label="创建时间"></el-table-column>
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
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'

    export default {
        name: 'SysMessage',
        mixins: [tool],
        data() {
            return {
                isShowMore:false,
                listUrl: "upms/sysmessage",
                showSearch: false,
                showEditBtn: this.getCurrentUserAuthority("/projectbigevent/edit")
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
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

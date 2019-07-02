<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
            <el-select v-model="searchParam.type" placeholder="请选择模板类型" clearable  style="width:190px">
                <el-option  label="输变电工程110KV" :value="1"></el-option>
                <el-option  label="输变电工程220KV" :value="2"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
        </div>
        <div class="division-line"></div>
        <div class="table-box">
            <el-table :data="list" style="width: 100%">
                <el-table-column fixed label="操作" width="200">
                    <template fixed slot-scope="{ row, column, $index }">
                        <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">编辑</el-button>
                        <el-button v-show="showDelBtn" @click="del(row.id)" type="text" size="small">删除</el-button>
                        <el-button v-show="showTemplateConfigBtn" @click="templateConfig(row.id)" type="text" size="small">模板设置</el-button>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="code" sortable show-overflow-tooltip min-width="100" label="项目编号">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="toDetail(scope.row)">
                            {{scope.row.code}}
                        </el-button>
                    </template>
                </el-table-column>-->
                <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="100" label="模板类型"></el-table-column>
                <el-table-column prop="updater" sortable show-overflow-tooltip min-width="100" label="修改人"></el-table-column>
                <el-table-column prop="updateTime" sortable show-overflow-tooltip min-width="100" label="修改时间"></el-table-column>
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
    import {tool} from '@/utils/common'
    import ajax from '@/utils/request'

    export default {
        name: 'CoreProjectTemplate',
        mixins: [tool],
        data() {
            return {
                listUrl: "core/projecttemplate",
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/core/projecttemplate/add"),
                showEditBtn: this.getCurrentUserAuthority("/core/projecttemplate/edit"),
                showDelBtn: this.getCurrentUserAuthority("/core/projecttemplate/del"),
                showTemplateConfigBtn : this.getCurrentUserAuthority("/core/projecttemplate/templateConfig")
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            del(id){
                let _$this = this;
                this.$confirm('删除模板后相应模板配置也会删除，确定删除?' ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function() {
                    ajax.delete('core/projecttemplate/'+id).then(rs => {
                        if (rs.status == 0) {
                            _$this.$message
                                .success(rs.msg);
                            _$this.getList();
                        } else {
                            _$this.$message
                                .error(rs.msg);
                        }
                    });
                }).catch(function() {
                });

            },
            templateConfig(id){
                let url = this.$route.fullPath + '/list?id='+id;
                if(~this.$route.fullPath.indexOf("/projecttemplate?")){
                    return;
                }
                url = url.replace('/projecttemplate','/projecttemplateconfig');
                console.info(url);
                this.$router.push({path:url});
            },
        }
    }
</script>

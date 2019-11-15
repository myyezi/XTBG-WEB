<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-apple" size="small" @click="batchCodegen()">批量生成</el-button>
            <el-input v-model="searchParam.tableName" placeholder="请输入表名称" clearable class="zy_input" style="width:190px"></el-input>
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-refresh" size="small" @click="createTime=[];resetList()">重置</el-button>
            <!-- <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button> -->
        </div>

        <div class="division-line"></div>
        <div class="table-box">
            <el-table  ref="multipleTable" :data="list" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" min-width="50"> </el-table-column>
                <!-- <el-table-column  label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="codegen(scope.row)" type="text" size="small">生成
                        </el-button>
                    </template>
                </el-table-column> -->
                <el-table-column prop="tableName" sortable label="表名称" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="tableComment" sortable label="表注释" min-width="140" show-overflow-tooltip></el-table-column>
                <el-table-column prop="engine" sortable label="索引" min-width="100"></el-table-column>
                <el-table-column prop="datetime" sortable label="创建时间" min-width="150"></el-table-column>
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

        <!-- 生成代码弹窗-->
        <el-dialog width="600px" :title="title" :visible.sync="codegenVisible" :append-to-body="true">
            <el-form :model="codegenForm" :rules="rules" label-position="top" ref="codegenForm" class="full-input">
                <el-form-item label="表名称" label-width="120px" prop="tableName">
                    <el-tag
                    v-for="tag in tableNameList"
                    :key="tag"
                    closable @close="handleTagClose(tag)">
                    {{tag}}
                    </el-tag>
                </el-form-item>
                <el-form-item label="包名" label-width="120px" prop="packageName">
                    <el-input v-model="codegenForm.packageName" clearable maxlength="200" placeholder="包名(可为空默认com.zdhr)"></el-input>
                </el-form-item>

                <el-form-item label="作者" label-width="120px" prop="author">
                    <el-input v-model="codegenForm.author" clearable maxlength="100" placeholder="作者(可为空默认作者)"></el-input>
                </el-form-item>

                <el-form-item label="模块" label-width="120px" prop="moduleName">
                    <el-input v-model="codegenForm.moduleName" clearable maxlength="100" placeholder="模块(可为空默认generator)"></el-input>
                </el-form-item>

                <el-form-item label="表前缀" label-width="120px" prop="tablePrefix">
                    <el-input v-model="codegenForm.tablePrefix" clearable maxlength="100" placeholder="表前缀(可为空默认tb_)"></el-input>
                </el-form-item>

                <el-form-item label="注释" label-width="120px" prop="comments">
                    <el-input v-model="codegenForm.comments" clearable maxlength="200" placeholder="注释(可为空默认表注释)"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close('codegenForm')">取 消</el-button>
                <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="submit('codegenForm')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'


    export default {
        name: 'role',
        mixins: [tool, ruleTool],
        components: {},
        data() {
            return {
                isShowMore:false,
                listUrl: "codegen/generator/page",
                codegenVisible: false,
                codegenForm: {},
                title: "",
                multipleSelection: [],
                tableNameList:[],
                rules: {

                }
            }
        },
        mounted: function () {
            this.getList();
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.tableNameList = val.map(item => item.tableName);
            },
            handleTagClose(tag){
                this.tableNameList.splice(this.tableNameList.indexOf(tag), 1);
            },
            codegen(row) {
                this.title = "生成";
                this.$refs.multipleTable.clearSelection();
                this.multipleSelection = [row];
                this.tableNameList = [row.tableName];
                this.$refs.multipleTable.toggleRowSelection(row);
                this.codegenForm = {
                    tableName: row.tableName
                };
                this.codegenVisible = true;

                this.focus();
            },
            batchCodegen() {
                this.title = "生成";
                this.codegenForm = {
                    tableName: this.tableNameList.join(",")
                };
                this.codegenVisible = true;

                this.focus();
            },
            focus() {
                let that = this;
                setTimeout(function () {
                    that.$refs.nameInput.focus();
                }, 400);
            },
            close(codegenForm) {
                this.codegenForm = {};
                this.$refs[codegenForm].resetFields();
                this.codegenVisible = false;
            },
            submit(codegenForm) {
                this.$refs[codegenForm].validate((valid) => {
                    if (valid) {

                        ajax({
                            url:"codegen/generator/code",
                            data: this.codegenForm,
                            method: 'post',
                            responseType: 'arraybuffer'
                        }).then((res) => {
                            let blob = new Blob([res], { type: 'application/zip' })
                            let filename = this.codegenForm.moduleName + '.zip'
                            let link = document.createElement('a')
                            link.href = URL.createObjectURL(blob)
                            link.download = filename
                            document.body.appendChild(link)
                            link.click()
                            window.setTimeout(function () {
                            URL.revokeObjectURL(blob)
                            document.body.removeChild(link)
                            }, 0)
                        })
                    } else {
                        this.showMessage('校验不通过，请检查输入项');
                        return false;
                    }
                });
            }


        },
    }
</script>
<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

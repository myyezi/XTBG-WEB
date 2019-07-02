<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-input v-model="searchParam.name" placeholder="请输入工作内容" clearable class="zy_input" style="width:190px"></el-input>
            <el-select v-model="searchParam.stage" placeholder="请选择工程阶段" clearable style="width:190px">
                <el-option  label="工程前期" :value="1"></el-option>
                <el-option  label="工程建设" :value="2"></el-option>
                <el-option  label="总结及评价" :value="3"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" size="small" @click="getDragTree">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="resetDragTree">重置</el-button>
            <el-button type="primary" icon="el-icon-upload" size="small" @click="importExcel">导入</el-button>
        </div>
        <el-radio-group v-model="isopen" style="padding:20px 20px 0">
            <el-radio :label="false">收起</el-radio>
            <el-radio :label="true">展开</el-radio>
        </el-radio-group>
        <dragTreeTable
            class="table-box"
            :data="treeData"
            :fixed="true"
            :onDrag="onTreeDataChange"
            :isdraggable="true"
            :isopen="isopen"
            :height="600">
        </dragTreeTable>
        <el-dialog title="节点修改" :visible.sync="dialogFormVisible" :class="{'dialog_animation_in':dialogFormVisible,'dialog_animation_out':!dialogFormVisible}" width="200">
            <el-form :model="templateConfigForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="上级节点名称" v-show="parentNameVisible">
                    <el-input v-model="templateConfigForm.parentName" disabled></el-input>
                </el-form-item>
                <el-form-item label="节点名称" prop="name">
                    <el-input v-model="templateConfigForm.name" autocomplete="off" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="工程阶段" prop="stage">
                    <el-select v-model="templateConfigForm.stage" clearable  style="width:190px">
                        <el-option  label="工程前期" :value="1"></el-option>
                        <el-option  label="工程建设" :value="2"></el-option>
                        <el-option  label="总结及评价" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工期" prop="period">
                    <el-input v-model="templateConfigForm.period" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import dragTreeTable from "@/components/treeTable/dragTreeTable.vue";
    import ajax from '@/utils/request';
    import {tool, formRule} from '@/utils/common'

    export default {
        name: 'CoreProjectTemplateConfig',
        mixins: [tool],
        data() {
            return {
                isopen:false,
                templateId : "",
                treeData: {
                    columns: [],
                    lists: [],
                    custom_field: {
                        id: 'id',
                        lists: 'children',
                        parent_id: 'parentId',
                        order : 'sortNum'
                    }
                },
                dialogFormVisible : false,
                parentNameVisible : false, //上级节点名称是否显示
                templateConfigForm : {},
                rules: {
                    name: [
                        { required: true, message: '节点名称', trigger: 'blur' },
                    ],
                    stage: [
                        { required: true, message: '请选择工程阶段', trigger: 'change' },
                    ],
                    period: [
                        { required: true, message: '请输入工期', trigger: 'blur' },
                        { validator: formRule.standardSize, message: '请输入整数', trigger: 'blur' }
                    ],
                },
                titleImg : require('@/styles/img/add.png'),
                isAddRootNode : false,
                operateType : "",
                selectForm :{},
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/core/projecttemplateconfig/add"),
                showEditBtn: this.getCurrentUserAuthority("/core/projecttemplateconfig/edit")
            }
        },
        components: {
            dragTreeTable
        },
        mounted() {
            this.templateId = this.$route.query.id;
            // 自定义树形表格表头 type的值为selection会显示展开收缩图标，为action指操作栏
            // 自定义树形表格表头 align单元格对齐方式left、center、right，默认居左对齐
            // 自定义树形表格表头 field单元格内容取值使用与this.treeData.lists中字段相对应
            this.treeData.columns = [
                {
                    title: "操作",
                    type: "action",
                    width: 300,
                    align: "left",
                    actions: [
                        {
                            text: "复制",
                            onclick: this.copyNode,
                            formatter: item => {
                                return "<i>复制 </i>";
                            }
                        },
                        {
                            text: "新增",
                            onclick: this.addNode,
                            formatter: item => {
                                return "<i>新增 </i>";
                            }
                        },
                        {
                            text: "编辑",
                            onclick: this.editNode,
                            formatter: item => {
                                return "<i>编辑 </i>";
                            }
                        },
                        {
                            text: "删除",
                            onclick: this.deleteNode,
                            formatter: item => {
                                return "<i>删除 </i>";
                            }
                        },
                    ]
                },
                {
                    type: "selection",
                    title: "工作内容",
                    field: "name",
                    img : this.titleImg,
                    onclick: this.addRootNode,
                    width: 350,
                    align: "left",
                },
                {
                    title: "工期（天）",
                    field: "period",
                    width: 150,
                    align: "center",
                },
                {
                    title: "紧前紧后节点设置",
                    field: "content",
                    width: 200,
                    align: "center",
                    isCutOut:true,
                    formatter: item => {
                        return "<i><img src='static/add.png' style='width:16px;height:16px;margin: -2px 5px 0;vertical-align: middle;' /> </i>";
                    }
                },
                {
                    title: "工程阶段",
                    field: "stageText",
                    width: 200,
                    align: "center",
                    isCutOut:true
                },
                {
                    title: "关联文档设置",
                    field: "indexScore",
                    width: 200,
                    align: "center",
                    formatter: item => {
                        return "<i><img src='static/add.png' style='width:16px;height:16px;margin: -2px 5px 0;vertical-align: middle;' /> </i>";
                    }
                },
                {
                    title: "关联风险设置",
                    field: "indexScore",
                    width: 200,
                    align: "center",
                    formatter: item => {
                        return "<i><img src='static/add.png' style='width:16px;height:16px;margin: -2px 5px 0;vertical-align: middle;' /> </i>";
                    }
                }

            ];
            this.getDragTree();
        },
        methods: {
            //重置筛选
            resetDragTree() {
                this.searchParam = {};
                this.getDragTree();
            },
            expand(){
                if (this.isopen == false){
                    this.isopen = true;
                }else{
                    this.isopen = false;
                }
            },
            importExcel(){

            },
            getDragTree() {
                ajax.get('core/projecttemplateconfig/templateConfigTree/',{
                    templateId : this.templateId,
                    name : this.searchParam.name,
                    stage : this.searchParam.stage,
                }).then(rs => {
                    if(rs.status === 0) {
                        if(rs.data) {
                            this.treeData.lists = rs.data
                        }
                    } else {
                        this.$message({
                            message: rs.msg,
                            type: 'error'
                        });
                    }
                });
            },
            addRootNode(){
                this.addNode(1);
            },
            addNode(data){
                this.operateType = "add";
                this.isAddRootNode = false;
                this.dialogFormVisible = true;
                this.clearValidate('ruleForm');
                if(data == 1){
                    this.isAddRootNode = true;
                    this.parentNameVisible = false;
                }else{
                    this.selectForm = data;
                    this.parentNameVisible = true;
                    this.templateConfigForm.parentName = data.name;
                }

            },
            copyNode(data){
                this.operateType = "copy";
                let _$this = this;
                let messageStr = "";
                if (data.children && data.children.length>0) {
                    messageStr = '该节点下有子节点，会统一复制，确定要复制吗？'
                } else {
                    messageStr = '确定要复制该节点吗？'
                }
                this.$confirm(messageStr ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function() {
                    _$this.copyTemplateConfig(data, _$this.treeData.lists);
                }).catch(function() {
                });
            },
            editNode(data){
                this.operateType = "edit";
                this.clearValidate('ruleForm');
                this.dialogFormVisible = true;
                if (data.parentId && data.parentId == "0"){
                    this.parentNameVisible = false;
                }else{
                    this.parentNameVisible = true;
                }
                this.selectForm = data;
                this.templateConfigForm = {
                    parentName : data.parentName,
                    name : data.name,
                    period : data.period,
                    stage : data.stage
                }

            },
            deleteNode(data){
                this.operateType = "delete";
                let _$this = this;
                let messageStr = "";
                if (data.children && data.children.length>0) {
                    messageStr = '该节点下有子节点，会统一删除，确定要删除吗？'
                } else {
                    messageStr = '确定要删除该节点吗？'
                }
                this.$confirm(messageStr ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function() {
                    _$this.deleteTemplateConfig(data, _$this.treeData.lists);
                }).catch(function() {
                });
            },
            // list:更新后的数据源
            // from: 当前被拖拽的行
            // to: 目标拖拽行
            // where: 拖拽的类型，top（上面）、center（里面）、bottom（下面）
            onTreeDataChange(list, from, to, where) {
                this.treeData.lists = list;
                this.saveTree({
                    json:JSON.stringify(this.treeData.lists)
                })
                console.log(this.treeData.lists)
            },
            // 树形结构整个保存
            saveTree(data) {
                ajax.post('core/projecttemplateconfig/saveTree',data).then(rs => {
                    if (rs.status == 0){
                        this.$message.success(rs.msg);
                        this.getDragTree();
                    } else {
                        this.$message.error(rs.msg);
                    }
                });
            },
            // 清楚弹窗内容以及警告信息
            clearValidate(form) {
                this.templateConfigForm = {
                    name:'',
                    period:'',
                    stage:'',
                }
                if(this.$refs[form]) {
                    this.$refs[form].clearValidate();
                }
            },
            ok(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        debugger;
                        if(this.operateType == 'add') {
                            this.templateConfigForm.parentId = this.isAddRootNode ? "0" : this.selectForm.id;
                            this.templateConfigForm.templateId = this.templateId;
                            this.templateConfigForm.level = this.isAddRootNode ? 1 : this.selectForm.level + 1;
                        } else {
                            this.templateConfigForm.parentId = this.selectForm.parentId;
                            this.templateConfigForm.id = this.selectForm.id
                        }
                        this.saveTemplateConfig(this.templateConfigForm);
                    } else {
                        return false;
                    }
                });
            },
            saveTemplateConfig(formData){
                ajax.post('core/projecttemplateconfig',formData).then(rs => {
                    if (rs.status == 0){
                        this.$message .success(rs.msg);
                        this.dialogFormVisible = false;
                        this.getDragTree();
                    } else {
                        this.$message.error(rs.msg);
                    }
                });
            },
            copyTemplateConfig(data, node){
                ajax.post('core/projecttemplateconfig/copyTemplateConfig',data).then(rs => {
                    if (rs.status == 0) {
                        this.$message.success(rs.msg);
                        this.getDragTree();
                    } else {
                        this.$message.error(rs.msg);
                    }
                });
            },
            deleteTemplateConfig(data){
                ajax.post('core/projecttemplateconfig/deleteTemplateConfig', data).then(rs => {
                    if (rs.status == 0) {
                        this.$message.success(rs.msg);
                        this.getDragTree();
                    } else {
                        this.$message.error(rs.msg);
                    }
                });
            },

        }
    }
</script>

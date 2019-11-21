<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <label class="control-label">项目类型</label>
            <el-select v-model="projectType" placeholder="请选择项目类型" clearable style="width:190px" @change="onChangeProjectType" :disabled="operateType == 'edit'">
                <el-option v-for="e in projectTypeList"  :key="e.value" :label="e.text" :value="e.value" ></el-option >
            </el-select>
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
        <div class="left-row">
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="submitForm()">保存</el-button>
            <el-button @click="close">返回</el-button>
        </div>

        <el-dialog title="项目计划模板" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="templateConfigForm" :rules="rules" ref="ruleForm" label-width="120px">
                <el-form-item label="工作内容" prop="name">
                    <el-input v-show="!showContent" v-model.trim="templateConfigForm.name" autocomplete="off" maxlength="50" class="overall_situation_input_icon" clearable show-word-limit></el-input>
                    <el-input v-show="showContent" v-model="templateConfigForm.name" placeholder="请输入工作内容" clearable>
                        <el-option v-for="e in contentList"  :key="e.value" :label="e.text" :value="e.text" ></el-option >
                    </el-input>

                </el-form-item>
                <el-form-item label="工期" prop="period">
                    <el-input v-model="templateConfigForm.period" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业" prop="profession">
<!--                    <el-input v-model.trim="templateConfigForm.profession" autocomplete="off" maxlength="50" class="overall_situation_input_icon" clearable show-word-limit></el-input>-->
                    <el-select v-model="templateConfigForm.profession" placeholder="请选择专业" clearable>
                        <el-option v-for="e in professionList"  :key="e.value" :label="e.text" :value="e.value" ></el-option >
                    </el-select>
                </el-form-item>
                <el-form-item label="工程阶段" prop="stage">
                    <el-select v-model="templateConfigForm.stage" placeholder="请选择项目类型" clearable>
                        <el-option v-for="e in stageList"  :key="e.value" :label="e.text" :value="e.value" ></el-option >
                    </el-select>
                </el-form-item>
                <el-form-item label="是否审批" prop="isApproval" >
                    <el-radio v-model="templateConfigForm.isApproval" :label="1" @change="changeApproval">是</el-radio>
                    <el-radio v-model="templateConfigForm.isApproval" :label="0" @change="changeApproval">否</el-radio>
                </el-form-item>
                <el-form-item label="是否上传文件" prop="isUpload">
                    <el-radio v-model="templateConfigForm.isUpload" :label="1" @change="changeUpload">是</el-radio>
                    <el-radio v-model="templateConfigForm.isUpload" :label="0" @change="changeUpload">否</el-radio>
                </el-form-item>
                <el-form-item label="是否获取位置" prop="isPosition">
                    <el-radio v-model="templateConfigForm.isPosition" :label="1" @change="changePosition">是</el-radio>
                    <el-radio v-model="templateConfigForm.isPosition" :label="0" @change="changePosition">否</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="ok">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ajax from '@/utils/request'
import { tool, ruleTool, formRule } from '@/utils/common'
import dragTreeTable from "@/components/treeTable/dragTreeTable.vue";

export default {
  mixins: [tool, ruleTool],
  components: {},
  data() {
    return {
        templateConfigForm : {
            isApproval : 1,
            isUpload : 1,
            isPosition : 1
        },
        formData : {
            name : "",
            nameType : "",
            period : null,
            profession : "",
            stage : null,
            isApproval : null,
            isUpload : null,
            isPosition :null
        },
        projectTypeList : [],
        stageList : [],
        contentList : [],
        professionList : [],
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
        showContent : false,
        newList : [],
        allList : [],
        isopen : false,
        projectTypeDisabled : false,
        addImg : require('@/styles/img/icon-img/add.png'),
        editImg : require('@/styles/img/icon-img/edit.png'),
        deletedImg : require('@/styles/img/icon-img/deleted.png'),
        operateType : "",  // 上页面传过来的操作类型
        tempType : "",     // 传给后台的操作类型
        projectType : "",
        templateId : "",
        dialogFormVisible : false,
        rules: {
            name: [
              { required: true, message: '请输入工作内容', trigger: ['blur'] }
            ],
            stage: [
              { required: true, message: '请选择工程阶段', trigger: ['change'] }
            ],
            period: [
              { required: true, message: '请输入工期', trigger: ['blur'] },
              { validator: formRule.money, message: '工期格式不正确', trigger: 'blur' }
            ],
            profession: [
              { required: true, message: '请输入专业', trigger: ['blur'] }
            ],
        }
    }
  },
  components: {
      dragTreeTable,
  },

mounted() {
    this.projectType = this.$route.query.projectType;
    this.operateType = this.$route.query.operateType;
    this.templateId = this.$route.query.templateId;
    this.tempType = this.operateType == 'edit' ? 'edit' : 'add';
    // 自定义树形表格表头 type的值为selection会显示展开收缩图标，为action指操作栏
    // 自定义树形表格表头 align单元格对齐方式left、center、right，默认居左对齐
    // 自定义树形表格表头 field单元格内容取值使用与this.treeData.lists中字段相对应
    this.treeData.columns = [
        {
            title: "操作",
            type: "action",
            width: 200,
            align: "left",
            actions: [
                {
                    text: "新增",
                    onclick: this.onAdd,
                    formatter: item => {
                        if(item.level>4){
                            return "";
                        }
                        return "<img src='" + this.addImg + "' title='新增' style='margin-right:15px;vertical-align: middle;'/>";
                    }
                },
                {
                    text: "编辑",
                    onclick: this.onEdit,
                    formatter: item => {
                        return "<img src='" + this.editImg + "' title='编辑' style='margin-right:15px;vertical-align: middle;'/>";
                    }
                },
                {
                    text: "删除",
                    onclick: this.onDelete,
                    formatter: item => {
                        return "<img src='" + this.deletedImg + "' title='删除' style='margin-right:15px;vertical-align: middle;'/>";
                    }
                },
            ]
        },
        {
            type: "selection",
            title: "工作内容",
            field: "name",
            img : this.addImg,
            onclick: this.onAddFirst,
            width: 340,
            align: "left",
        },
        {
            title: "工期",
            field: "period",
            width: 120,
            align: "center",
        },
        {
            title: "专业",
            field: "professionText",
            width: 180,
            align: "center",
        },
        {
            title: "所属阶段",
            field: "stage",
            width: 180,
            align: "center",
            isCutOut:true,
            formatter: item => {
                let str = ''
                this.stageList.forEach((data) => {
                    if(data.value==item.stage) {
                        str = data.text
                    }
                })
                return str
            }
        },
        {
            title: "是否审批",
            field: "isApproval",
            width: 120,
            align: "center",
            isCutOut:true,
            formatter: item => {
                return item.isApproval==1?'是':'否'
            }
        },
        {
            title: "是否上传文件",
            field: "isUpload",
            width: 120,
            align: "center",
            isCutOut:true,
            formatter: item => {
                return item.isUpload==1?'是':'否'
            }
        },
        {
            title: "是否获取位置",
            field: "isPosition",
            width: 120,
            align: "center",
            isCutOut:true,
            formatter: item => {
                return item.isPosition==1?'是':'否'
            }
        }
    ];
    if (this.operateType == 'edit'){
        this.getDragTree();
    }
    this.getDict();
},
methods: {
    // 获取字典
    getDict() {
        let type = 'XMLX,GCJD,GZNR,ZY';
        ajax.get("upms/dict/allType/"+type).then(rs => {
            this.projectTypeList = rs.XMLX;
            this.stageList = rs.GCJD;
            this.contentList = rs.GZNR;
            this.professionList = rs.ZY;
            console.info("111111111",this.projectTypeList);
        });
    },
    onChangeProjectType(){
        if(this.projectType){
            ajax.get('power/powerprojecttemplate/getTemplateId/'+this.projectType).then(rs => {
                if(rs.status === 0) {
                    if(rs.data) {
                        this.templateId = rs.data;
                        this.tempType = "edit";
                        this.getDragTree();
                    }else{
                        this.tempType = "add";
                        this.treeData.lists = [];
                    }
                } else {
                    this.$message({
                        message: rs.msg,
                        type: 'error'
                    });
                }
            });
        }else{
            this.treeData.lists = [];
        }

    },
    getDragTree(data) {
        ajax.get('power/powerprojecttemplateconfig/templateConfigTree/',{
            templateId : this.templateId,
            projectType : this.projectType,
        }).then(rs => {
            if(rs.status === 0) {
                if(rs.data) {
                    this.treeData.lists = rs.data;
                    if (data == 0){
                        this.isopen = true;
                    }
                }
            } else {
                this.$message({
                    message: rs.msg,
                    type: 'error'
                });
            }
        });
    },

    changeApproval(){
        if (this.templateConfigForm.isApproval == 0){
            this.templateConfigForm.isUpload = 0;
        }
    },

    changeUpload(){
        if (this.templateConfigForm.isUpload == 1){
            this.templateConfigForm.isApproval = 1;
        }
    },

    changePosition(){
        if (this.templateConfigForm.isPosition == 1){
            this.templateConfigForm.isPosition = 1;
        }
    },

    // 增加一级节点
    onAddFirst() {
        this.onAdd(1)
        // 新增并且是一级节点
        this.showContent = true;
    },
    // 增加节点
    onAdd(data) {
        this.showContent = false;
        if (!this.projectType){
            this.$message.error('请先选择项目类型！');
            return;
        }
        this.formData = {};
        this.isAddFirst = false;
        if(data === 1) {
            this.isAddFirst = true;
        } else {
            this.formData = data;
        }
        this.clearValidate('ruleForm')
        this.operationType = 'add';
        this.dialogFormVisible = true;
    },
    // 编辑节点
    onEdit(data) {
        if (data.parentId == "0"){
            this.showContent = true;
        }
        this.clearValidate('ruleForm');
        this.formData = data;
        this.operationType = 'edit';
        this.templateConfigForm = {
            name : data.name,
            nameType : data.nameType,
            period : data.period,
            profession : data.profession,
            stage : data.stage,
            isApproval : data.isApproval,
            isUpload : data.isUpload,
            isPosition :data.isPosition
        };
        this.dialogFormVisible = true;
    },
    // 删除节点
    onDelete(data) {
        let _this = this;
        let str = ''
        this.operationType = 'delete';
        if (data.children&&data.children.length>0) {
            str = '该节点下有子节点，会统一删除，确定要删除吗？';
        } else {
            str = '确定要删除该节点吗？';
        }
        this.$confirm(str ,'提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(function() {
            _this.deleteTemplateConfig(data,_this.treeData.lists)
        }).catch(function() {
        });
    },
    // list:更新后的数据源
    // from: 当前被拖拽的行
    // to: 目标拖拽行
    // where: 拖拽的类型，top（上面）、center（里面）、bottom（下面）
    onTreeDataChange(list, from, to, where) {
        this.treeData.lists = list;
        /*this.saveTemplate({
            json:JSON.stringify(this.treeData.lists)
        })
        console.log(this.treeData.lists)*/
    },
    // 点击单元格事件
    onClickCell(data) {
        console.log(data)
    },
    // 清楚弹窗内容以及警告信息
    clearValidate(formName) {
        this.templateConfigForm = {
            name : "",
            period : null,
            profession : "",
            stage : null,
            isApproval : 1,
            isUpload : 1,
            isPosition :1
        }
        if(this.$refs[formName]) {
            this.$refs[formName].clearValidate();
        }
    },
    // 确定新增或修改节点
    ok() {
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                //获取专业名称
                for (let i = 0; i <this.professionList.length ; i++) {
                    if (this.professionList[i].value ==  this.templateConfigForm.profession){
                        this.templateConfigForm.professionText = this.professionList[i].text;
                        break;
                    }
                }
                let newChild = this.templateConfigForm;
                if(this.operationType === 'add') {
                    // 新增传父级id
                    newChild.parentId = this.isAddFirst ? 0 : this.formData.id;
                    newChild.level = this.isAddFirst ? 1 : this.formData.level + 1;
                } else {
                    // 编辑传id
                    newChild.id = this.formData.id;
                }

                // 获取工作内容类型
                if (this.isAddFirst){
                    this.contentList.forEach((item) => {
                        if (item.text == this.templateConfigForm.name){
                            newChild.nameType = item.value;
                        }
                    });
                }else{
                    newChild.nameType = this.formData.nameType;
                }

                newChild.sortNum = this.getSortNum(newChild.parentId);
                this.getNodeProcessing(newChild);
            } else {
                return false;
            }
        });
    },
    getSortNum(parentId){
        if (this.treeData.lists.length == 0){
            return 1;
        }
        this.getAllList(this.treeData.lists);
        let arr = [];
        this.allList.forEach((item) => {
            if (item.parentId == parentId){
                arr.push(item.sortNum ? item.sortNum : 0);
            }
        });
        if (arr.length == 0){
            return 1;
        }
        arr.sort(function (a, b) {
            return a-b;
        });
        let maxSortNum = arr[arr.length - 1];
        return maxSortNum + 1;
    },
    // 删除节点
    deleteTemplateConfig(data,node) {
        this.getNodeProcessing(data,node)
    },
    // 前端删除和编辑节点时的处理（可以不用调查询接口），增加需调接口
    getNodeProcessing(data,node) {
        if(this.operationType === 'add') {
            data.id = new Date().getTime()
            this.$message({
                message: '新增成功',
                type: 'success'
            });
            this.dialogFormVisible = false;
            if(this.isAddFirst) {
                this.treeData.lists.push(data);
            } else {
                if (!this.formData.children) {
                    this.$set(this.formData, 'children', []);
                }
                this.formData.children.push(data);
            }
        } else if(this.operationType === 'delete') {
            node.forEach((item,index) => {
                if(item.id === data.id) {
                    node.splice(index, 1);
                } else {
                    if (item.children && item.children.length>0) {
                        this.getNodeProcessing(data,item.children)
                    }
                }
            });
        } else {
            this.$message({
                message: '编辑成功',
                type: 'success'
            });
            this.dialogFormVisible = false;
            // 弹窗表单修改的字段需要给formData中对应的字段附值
            this.formData.name = data.name;
            this.formData.nameType = data.nameType;
            this.formData.period = data.period;
            this.formData.profession = data.profession;
            this.formData.stage = data.stage;
            this.formData.isApproval = data.isApproval;
            this.formData.isUpload = data.isUpload;
            this.formData.isPosition = data.isPosition;
            this.formData.professionText = data.professionText;
        }
    },
    //保存
    submitForm() {
        if (!this.projectType || this.treeData.lists.length == 0){
            this.$message.error('数据无效，请检查！');
            return;
        }
        this.newList = [];
        this.getNewList(this.treeData.lists);
        ajax.post('power/powerprojecttemplateconfig', {
            tempType: this.tempType,
            templateId : this.templateId,
            projectType : this.projectType,
            treeDataList: this.newList
        }).then(rs => {
            if (rs.status == 0) {
                this.$message .success(rs.msg);
                this.getDragTree();
            } else {
                this.$message.error(rs.msg);
            }
        });
    },

    getNewList(list){
        list.forEach((item) => {
            this.newList.push(item);
            if (item.children && item.children.length>0) {
                this.getNewList(item.children);
            }
        });
    },
    getAllList(list){
        list.forEach((item) => {
            this.allList.push(item);
            if (item.children && item.children.length>0) {
                this.getAllList(item.children);
            }
        });
    },
    close(){
        let url ='/power/powerprojecttemplate';
        this.closeCurPage(url);
    },

},
}
</script>

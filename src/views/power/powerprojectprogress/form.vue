<template>
    <div class="app-container white-bg list-panel" v-cloak style="height: calc(100vh - 120px);padding:10px">
        <div style="padding:10px 0">
            <span style="font-size: 14px;color: #8C8C8C; font-weight: bold;">项目名称：{{projectName}}</span>
        </div>
        <div class="container clearfix">
            <gantt-add
                ref="gantt"
                class="left-container"
                v-if="isLoading"
                :tasks="tasks"
                :headerTitle="headerTitle">
            </gantt-add>
        </div>
    </div>

</template>

<script>
    import ajax from '@/utils/request'
    import { tool, ruleTool ,formRule} from '@/utils/common'
    import GanttAdd from '@/components/Gannt/add'
    import '@/components/dhtmlx-gantt'
    import "@/components/dhtmlx-gantt/codebase/locale/locale_cn"
    import Bus from "@/utils/eventBus.js"

    const addImg = require('@/styles/img/icon-img/add.png')
    const editImg = require('@/styles/img/icon-img/edit.png')
    const deletedImg = require('@/styles/img/icon-img/deleted.png')
    export default {
        mixins: [tool, ruleTool],
        components: {GanttAdd},
        data() {
            let that = this;
            return {
                dialogVisible : false,
                projectTaskList : [],
                stageList : [],
                taskId : "",
                projectId : "",
                projectName : "",
                tempArr : [],
                showSaveDraftBtn : false,
                rules: {
                    name: [
                        { required: true, message: '请输入工作内容', trigger: ['change','blur'] }
                    ],
                },
                tasks: {
                    data: [],
                    links: []
                },
                isLoading: false,
                headerTitle:[
                    {
                        name:"action",
                        label:'执行操作',
                        align: "center",
                        width:'150',
                        template:function(obj){
                            return "<a style='display:inline-block;width:50px;height:100%;color: #4781fe;'>上传</a>"+
                                "<a style='display:inline-block;width:50px;height:100%;color: #4781fe;'>查看</a>"
                        }
                    },
                    {
                        name:"action",
                        label:'关联文件',
                        align: "center",
                        width:'150',
                        template:function(obj){
                            return "<a style='display:inline-block;width:50px;height:100%;color: #4781fe;'>申请完成</a>"+
                                "<a style='display:inline-block;width:50px;height:100%;color: #4781fe;'>完成</a>"
                        }
                    },
                    {
                        name:'text',
                        label:'工作内容',
                        tree:true,
                        align: "left",
                        width:'250',
                    },
                    {
                        name:'period',
                        label:'工期(天)',
                        align: "center",
                        width:'75',
                    },
                    {
                        name:'start_date',
                        label:'开始时间',
                        align: "center",
                        width:'100',
                    },
                    {
                        name:'end_date',
                        label:'结束时间',
                        align: "center",
                        width:'100',
                    },
                    {
                        name:'stage',
                        label:'所属阶段',
                        align: "center",
                        width:'75',
                        template : function(obj){
                            let str = '';
                            that.stageList.forEach((data) => {
                                if(data.value == obj.stage) {
                                    str = data.text;
                                }
                            });
                            return str;
                        }
                    },
                    {
                        name:'principalText',
                        label:'负责人',
                        align: "center",
                        width:'100',
                        template:function(obj){
                            if (!obj.principal){
                                return ""
                            }else {
                                return obj.principalText
                            }
                        }
                    },
                    {
                        name:'profession',
                        label:'专业',
                        align: "center",
                        width:'75',
                    },
                    {
                        name:'currentStatusText',
                        label:'当前状态',
                        align: "center",
                        width:'75',
                        template : function(obj){
                            let str = "";
                            switch(obj.currentStatus) {
                                case 1:
                                    str = "未开始";
                                    break;
                                case 2:
                                    str = "进行中";
                                    break;
                                case 3:
                                    str = "延期";
                                    break;
                                case 4:
                                    str = "待审核";
                                    break;
                                case 5:
                                    str = "不合格";
                                    break;
                                case 6:
                                    str = "已完成";
                                    break;
                                default:
                                    str = "";
                            }
                            return str;
                        }
                    },
                ]
            }
        },
        created() {
            this._getTasksModel();
        },
        mounted() {
            if (this.$route.query.id){
                this.taskId = this.$route.query.id;
            }
            Bus.$on("task-updated", data => {
                if(data.operationType === 'upload') {
                    console.info("1111111",data);
                }else if (data.operationType === 'view'){
                    console.info("2222222",data);
                }else if (data.operationType === 'approvefinish'){
                    console.info("3333333",data);
                }else if(data.operationType === 'finish') {
                    console.info("4444444",data);
                }
            });
            this.getProjectTask();
            this.getStageList();
        },
        methods: {

            // 工程阶段字典
            getStageList() {
                let type = "GCJD";
                ajax.get('upms/dict/type/'+type).then(rs => {
                    if (rs.length > 0) {
                        this.stageList = rs;
                    }
                });
            },

            // 项目任务书信息
           getProjectTask(){
                if (this.taskId){
                    // 获取项目任务书对象
                    ajax.get('power/powerprojecttask/getOneById/' + this.taskId).then(rs => {
                        if (rs.status === 0){
                            this.projectId = rs.data.projectId;
                            this.projectName = rs.data.name;
                        }else{
                            this.$message({
                                message: rs.msg,
                                type: 'error'
                            });
                        }
                    });
                }
            },

            // 项目计划列表
            _getTasksModel() {
                if(this.$route.query.id){
                    ajax.get('power/powerprojectplan/getPlanTree?taskId='+this.$route.query.id).then(rs => {
                        if(rs.status === 0) {
                            if(rs.data) {
                                if (rs.data.length > 0){
                                    let obj = {};
                                    this.isLoading = true;
                                    rs.data.forEach((item)=>{
                                        item.start_date = item.planStartDate;
                                        item.end_date = item.planEndDate;
                                        item.text = item.name;
                                        item.parent = item.parentId;
                                        item.open = true;
                                    });
                                    obj.data = rs.data;
                                    this.tasks = obj;
                                }
                            }
                        } else {
                            this.$message({
                                message: rs.msg,
                                type: 'error'
                            });
                        }
                    });
                }
            },

            // 清楚弹窗内容以及警告信息
            clearValidate(formName) {
                if(this.$refs[formName]) {
                    this.$refs[formName].clearValidate();
                }
            },

            // 弹框“确定”操作
            ok(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let newChild = this.powerprojectplanform;
                        newChild.text = this.powerprojectplanform.name;
                        newChild.start_date = this.powerprojectplanform.planStartDate;
                        newChild.end_date = this.powerprojectplanform.planEndDate;
                        if(this.operationType === 'add') {
                            newChild.parent = 0;
                            newChild.level = 1;
                        } else if (this.operationType === 'inserted'){
                            newChild.parent = this.formData.id;
                            newChild.level = this.formData.level + 1;
                        } else {
                            if (this.tasks.data && this.tasks.data.length > 0){
                                this.dataArr.forEach((item,index) => {
                                    if(item.id === this.powerprojectplanform.id) {
                                        this.dataArr.splice(index, 1);
                                    }
                                });
                            }
                        }
                        //newChild.sortNum = this.getSortNum(newChild.parentId);
                        this.getNodeProcessing(newChild);
                    } else {
                        return false;
                    }
                });
            },

            // 前端删除和编辑节点时的处理（可以不用调查询接口），增加需调接口
            getNodeProcessing(data,node) {
                if(this.operationType === 'add' || this.operationType === 'inserted') {
                    data.id = new Date().getTime()
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    this.dataArr.push(data);
                    let obj = {};
                    this.isLoading = true;
                    obj.data = this.dataArr;
                    this.tasks = obj;
                } else if(this.operationType === 'deleted') {
                    if (node && node.length > 0){
                        node.forEach((item, index) => {
                            if(item && item.id == data.id) {
                                node.splice(index, 1, null);
                            } else {
                                if (item && item.parent && item.parent == data.id) {
                                    this.getNodeProcessing(item, node);
                                }
                            }
                        });
                    }
                    let newArray = [];
                    this.dataArr.forEach((item) => {
                        if (item){
                            newArray.push(item)
                        }
                    });
                    this.dataArr = newArray;
                    let obj = {};
                    this.isLoading = true;
                    obj.data = this.dataArr;
                    this.tasks = obj;
                } else {
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    debugger;
                    this.dialogVisible = false;
                    this.dataArr.push(data);
                    let obj = {};
                    this.isLoading = true;
                    obj.data = this.dataArr;
                    this.tasks = obj;
                }
            },
            //保存
            submitForm(projectStatus) {
                if (!this.taskId || this.tasks.data.length == 0){
                    this.$message.error('数据无效，请检查！');
                    return;
                }
                let newList = [];
                let obj = {};
                this.tasks.data.forEach((item) => {
                    obj = item;
                    newList.push(obj);
                });
                ajax.post('power/powerprojectplan', {
                    projectStatus : projectStatus,
                    tempType : this.tempType,
                    taskId : this.taskId,
                    projectId : this.projectId,
                    treeDataList : newList
                }).then(rs => {
                    if (rs.status == 0) {
                        this.$message.success(rs.msg);
                        this._getTasksModel();
                    } else {
                        this.$message.error(rs.msg);
                    }
                });
            },

        },
    }
</script>


<style>
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .container {
        height: 100%;
        width: 100%;
    }

    .left-container {
        overflow: hidden;
        position: relative;
        height: calc(100% - 32px);
    }

    .right-container {
        border-right: 1px solid #cecece;
        float: right;
        height: 100%;
        width: 300px;
        box-shadow: 0 0 5px 2px #aaa;
        position: relative;
        z-index:2;
    }

    .gantt-messages {
        list-style-type: none;
        height: 50%;
        margin: 0;
        overflow-x: hidden;
        overflow-y: auto;
        padding-left: 5px;
    }

    .gantt-messages > .gantt-message {
        background-color: #f4f4f4;
        box-shadow:inset 5px 0 #d69000;
        font-family: Geneva, Arial, Helvetica, sans-serif;
        font-size: 14px;
        margin: 5px 0;
        padding: 8px 0 8px 10px;
    }

    .gantt-selected-info {
        border-bottom: 1px solid #cecece;
        box-sizing: border-box;
        font-family: Geneva, Arial, Helvetica, sans-serif;
        height: 50%;
        line-height: 28px;
        padding: 10px;
    }

    .gantt-selected-info h2 {
        border-bottom: 1px solid #cecece;
    }

    .select-task-prompt h2{
        color: #d9d9d9;
    }
</style>

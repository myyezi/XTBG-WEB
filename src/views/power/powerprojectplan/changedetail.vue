<template>
  <div class="form-panel">
      <el-collapse v-model="openCollapse">
          <el-collapse-item title="计划信息" name="1">
              <template>
                  <div class="app-container white-bg list-panel" v-cloak style="height: calc(100vh - 120px);padding:10px">
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
          </el-collapse-item>
      </el-collapse>

  </div>
</template>

<script>
import ajax from '@/utils/request'
import { tool} from '@/utils/common'
import GanttAdd from '@/components/Gannt/add'
import '@/components/dhtmlx-gantt'
import "@/components/dhtmlx-gantt/codebase/locale/locale_cn"

export default {
  mixins: [tool],
  components: {GanttAdd},
  data() {
    let that = this;
    return {
        openCollapse: ["1"],
        stageList : [],
        contentList : [],
        projectId : "",
        tasks: {
            data: [],
            links: []
        },
        isLoading: false,
        headerTitle:[
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
                name:'isApproval',
                label:'是否审批',
                align: "center",
                width:'75',
                template : function(obj){
                    return obj.isApproval == 1 ? '是':'否'
                }
            },
            {
                name:'isUpload',
                label:'是否上传文件',
                align: "center",
                width:'75',
                template : function(obj){
                    return obj.isUpload == 1 ? '是':'否'
                }
            },
        ]
    }
  },
  created() {
       this._getTasksModel();
  },
  mounted() {
      this.getDict();
  },
  methods: {
    // 获取字典
    getDict() {
        let type = 'GCJD';
        ajax.get("upms/dict/allType/"+type).then(rs => {
            this.stageList = rs.GCJD;
        });
    },

    // 项目计划列表
    _getTasksModel() {
        ajax.get('power/powerprojectplan/getPlanHistoryTree',{planChangeId : this.$route.query.id}).then(rs => {
            if(rs.status === 0) {
                if(rs.data) {
                    if (rs.data.length > 0){
                        rs.data.forEach((item)=>{
                            item.start_date = item.planStartDate;
                            item.end_date = item.planEndDate;
                            item.text = item.name;
                            item.parent = item.parentId;
                            item.open = true;
                        });
                        let obj = {};
                        this.isLoading = true;
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

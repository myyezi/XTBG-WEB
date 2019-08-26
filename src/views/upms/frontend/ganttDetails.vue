<template>
  <div class="app-container white-bg list-panel" v-cloak style="height: calc(100vh - 120px);padding:10px">
    <div class="opertion-box" style="width: 100%;padding: 10px 0px 20px;margin: 0 0 10px 0;border-bottom: 1px solid #999;">
        <div class="project_title"><span>清江输变电工程项目</span> <进度概览> </div>
        <div class="project_date">计划开工/竣工日期<span>（2017-06-20 ~ 2019-08-25）</span></div>
    </div>
    <gantt-detail ref="gantt" class="left-container_detail" v-if="isLoading" :tasks="tasks"></gantt-detail>
  </div>
</template>

<script>
import GanttDetail from '@/components/Gannt/detail'
// import { ganttModelURL } from '@/api/http.js';
export default {
  components: {GanttDetail},
  data () {
    return {
      tasks: {
        data: [],
        links: []
      },
      selectedTask: null,
      messages: [],
      isLoading: false
    }
  },
  filters: {
    toPercent (val) {
      if(!val) return '0'
      return Math.round((+val) * 100)
    },
    niceDate (obj){
      return `${obj.getFullYear()} / ${obj.getMonth() + 1} / ${obj.getDate()}`
    }
  },
  created() {
      // this._getTasksModel();
  },
  mounted() {
    this._getTasksModel();
  },
  methods: {
    _getTasksModel() {
      this.isLoading = true
      this.tasks = {
        //id数据id, text任务名，start_date开始时间，end_date结束时间，duration间隔，progress进度，person负责人，parent父级id
        data: [  
          {id: 1, text: 'Task #444', start_date: '2017-04-06', end_date: '2017-04-09', overdue:true,completionType:1,progress: 0.6,parent: null, open:true},
          {id: 10, text: 'Task #2222', start_date: '2017-04-07',  end_date: '2017-04-12', overdue:false,completionType:2,progress: 0.4, open:true},
          {id: 11,parent: 1, text: 'Task #2222', start_date: '2017-04-10',end_date: '2017-04-15', completionType:3,overdue:false,progress: 0.4, open:true}
        ],

         // 任务之间的连接线
        //source根源 target目标 也就是从id为1的指向id为2的
        //type:'0'是从1任务完成到2任务开始，type:'1'是1任务开始到2任务开始，
        //type:'2'是从1任务完成到2任务完成，type:'3'是从1任务开始到2任务完成

        links: [
          {id: 1, source: 1, target: 10, type: '0'}
        ]
      }
      console.log(this.tasks)
    },
    // 选择查看一个任务 右侧显示框
    selectTask (task) {
      console.log(task)
      this.selectedTask = task
    },
    // 右侧显示框更新其实
    addMessage (message) {
      this.messages.unshift(message)
      if(this.messages.length > 40) {
        this.messages.pop()
      }
    },
  }
}
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .project_title {
      font-size: 26px;
      color: #333;
      margin-bottom: 20px;
  }
  .project_title span{
      font-weight: bold;
  }
  .project_date {
      color: #333;
      font-weight: bold;
      font-size: 16px;
  }
  .project_date span{
      
  }

  .left-container_detail {
    overflow: hidden;
    position: relative;
    height: calc(100% - 108px);
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

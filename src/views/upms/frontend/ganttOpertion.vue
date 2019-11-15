<template>
  <div class="app-container white-bg list-panel" v-cloak style="height: calc(100vh - 120px);padding:10px">
    <div class="container">
      <gantt-add ref="gantt" class="left-container" v-if="isLoading" @task-updated="logTaskUpdate" @link-updated="logLinkUpdate" @task-selected="selectTask"></gantt-add>
      <div style="margin-top:5px;float:right"><el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" size="small" @click="determine">确定</el-button></div>
    </div>
  </div>
</template>

<script>
import GanttAdd from '@/components/Gannt/add'
// import { ganttModelURL } from '@/api/http.js';
export default {
  components: {GanttAdd},
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
    },
    determine() {
      this.$refs.gantt.getParent()
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
    // 数据更新 调用后台接口保存
    logTaskUpdate (id, mode, task) {
      console.log(111)
      let text = (task && task.text ? ` (${task.text})`: '')
      let message = `Task ${mode}: ${id} ${text}`
      this.addMessage(message)
      this.tasks.data.push(task)
      console.log(this.tasks)
    },
    // 数据更新 调用后台接口保存
    logLinkUpdate (id, mode, link) {
      let message = `Link ${mode}: ${id}`
      if(link){
        message += ` ( source: ${link.source}, target: ${link.target} )`
      }
      this.addMessage(message)
      console.log(link)
    }
  }
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

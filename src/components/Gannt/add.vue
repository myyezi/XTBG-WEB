<template>
    <div ref="gantt"></div>
</template>

<script>
import '../dhtmlx-gantt'
import "../dhtmlx-gantt/codebase/locale/locale_cn";
export default {
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    }
  },
  data() {
      return {
          workData : []
      }
  },
  methods: {
    $_initGanttEvents: function () {
      if(gantt.$_eventsInitialized)
        return;
        
      gantt.attachEvent('onTaskSelected', (id) => {
        console.log(id)
        let task = gantt.getTask(id)
        this.$emit('task-selected', task)
      })

      gantt.attachEvent('onAfterTaskAdd', (id, task) => {
        this.$emit('task-updated', id, 'inserted', task)
        console.log("su")
        console.log(task)
        task.progress = task.progress || 0
        if(gantt.getSelectedId() == id) {
          this.$emit('task-selected', task)
        }
      })

      gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
        console.log(task)
        this.$emit('task-updated', id, 'updated', task)
      })

      gantt.attachEvent('onAfterTaskDelete', (id) => {
        this.$emit('task-updated', id, 'deleted')
        if(!gantt.getSelectedId()) {
          this.$emit('task-selected', null)
        }
      })

      gantt.attachEvent('onAfterLinkAdd', (id, link) => {
        this.$emit('link-updated', id, 'inserted', link)
      })

      gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
        this.$emit('link-updated', id, 'updated', link)
      })

      gantt.attachEvent('onAfterLinkDelete', (id, link) => {
        this.$emit('link-updated', id, 'deleted')
      })
      
      // gantt.eachParent(function(task){
      //   console.log(111111);
      // })

      gantt.$_eventsInitialized = true;
    },
    getParent() {
      console.log(this.workData)
    }
  },
    
  mounted () {
    console.log(gantt)
    let _this = this
    gantt.config.readonly = false;
    // 设置x轴的时间显示格式
    gantt.config.start_on_monday = true;
	  gantt.config.scale_unit = "month";
    gantt.config.date_scale = "%Y-%m";
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.scale_height = 50;
    gantt.config.subscales = [
        {unit: "week", step: 1, date: "第%w周"},
        // {unit: "day", step: 1, date: "%j, %D"}
        // {unit: "day", step: 1, date: "%j"}
    ];
    // gantt.config.task_height = 25;


    // 设置左侧任务名称
    gantt.config.columns=[
        {name:"text",       label:"任务名",  tree:true,width:'160' },
        {name:"start_date", label:"开始时间", align: "center", width:'100'},
        {name:"end_date",   label:"结束时间", align: "center", width:'100' },
        // {name:"duration",   label:"间隔",   align: "center",   width:'60'},
        // {name:"person",     label:"负责人",   align: "center",   width:'60'},
        {name:"add",        label:"" },
    ];

    // 拖拽task的时候，自动将起始时间和结束时间矫正为工作日备注：起始和结束时间遇到周末的时候，自动把时间改为工作日的时间 默认false
    gantt.config.work_time = true;
    gantt.config.correct_work_time = true;

    // 允许通过拖拽的方式新增任务依赖的线条
    // gantt.config.drag_links = false;
   //当task的长度改变时，自动调整图表坐标轴区间用于适配task的长度    
    gantt.config.fit_tasks = true; 
    // 设置弹窗内容
    gantt.config.lightbox.sections = [
       {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
       {name: "time", height: 30, map_to: "auto", type: "time" },
      // {name: "time", map_to: "auto", type: "duration"},
      // {
      //   name: "deadline", map_to: {start_date: "deadline"},
      //   type: "duration_optional",
      //   button: true,
      //   single_date: true
      // },
	  	// {name: "baseline", map_to: 'person',height:100, type: "checkbox",options: [
      // {key:"Low", label: "Low"}, 
      // {key:"Normal", label: "Normal"}, 
      // {key:"High", label: "High"} ]
      // }
  	];
  // 新增内容 baseline 对应上面的name: "baseline"
	// gantt.locale.labels.section_baseline = "负责人";

    // 设置弹窗头部和底部高度 总和是90
    gantt.config.lightbox_additional_height = 90;

    // 左侧树型结构调整时，可以任意拖动任务到任意节点下
    gantt.config.order_branch = true;
    gantt.config.order_branch_free = true;
    // 启用排序功能，点击表头可以排序
    gantt.config.sort = true;
    gantt.init(this.$refs.gantt)
    gantt.clearAll();
    gantt.parse(this.$props.tasks)
    this.$_initGanttEvents();
    var dp = gantt.createDataProcessor(function(mode, taskState, data, rowId) {
      if (localStorage[mode]) {
        _this.workData = JSON.parse(localStorage[mode]);
      }

      switch(taskState) {
        case "create":
          _this.workData.push(data);
        break;
        case "update":
          var itemIndex = _this.workData.findIndex(function(entry, index) {
            return entry.id == rowId;
          });
          _this.workData[itemIndex] = data;
        break;
        break;
        case "delete":
          var itemIndex = _this.workData.findIndex(function(entry, index) {
            return entry.id == rowId;
          });
          _this.workData.splice(itemIndex, 1);
        break;
      }
      
      localStorage[mode] = JSON.stringify(_this.workData);
    });
  }
}
</script>

<style>
  /* @import "dhtmlx-gantt/codebase/dhtmlxgantt.css";	 */
  @import "../dhtmlx-gantt/codebase/skins/dhtmlxgantt_skyblue.css";	
  /* .gantt{
      height:100%;
      width: 100%;
  } */


</style>
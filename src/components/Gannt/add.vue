<template>
  <div style="overflow:auto;">
    <div ref="gantt"></div>
  </div>
</template>

<script>
import '../dhtmlx-gantt'
import "../dhtmlx-gantt/codebase/locale/locale_cn";
import Bus from "@/utils/eventBus.js";
export default {
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    },
    headerTitle: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
      return {
          workData : []
      }
  },
  watch :{
      'tasks':function(newValue,oldValue) {
          gantt.clearAll();
          gantt.parse(newValue)
          this.$_initGanttEvents();
      }
  },
  destroyed() {
      Bus.$off("task-updated")
      Bus.$off("link-updated")
  },
  methods: {
    $_initGanttEvents: function () {
      if(gantt.$_eventsInitialized)
        return;
      gantt.attachEvent("onTaskRowClick", (id, row) => {
          if(row.outerHTML.indexOf('新增')!=-1) {
              Bus.$emit("task-updated",{id:id,operationType:'inserted'}); 
          }
          if(row.outerHTML.indexOf('编辑')!=-1) {
              Bus.$emit("task-updated",{id:id,operationType:'updated'});
          }
          if(row.outerHTML.indexOf('删除')!=-1) {
              Bus.$emit("task-updated",{id:id,operationType:'deleted'});
          }
          if(row.outerHTML.indexOf('上传')!=-1) {
              Bus.$emit("task-updated",{id:id,operationType:'upload'});
          }
          if(row.outerHTML.indexOf('查看')!=-1) {
              Bus.$emit("task-updated",{id:id,operationType:'view'});
          }
          if(row.outerHTML.indexOf('申请完成')!=-1) {
              Bus.$emit("task-updated",{id:id,operationType:'approvefinish'});
          }
          if(row.outerHTML.indexOf('完 成')!=-1) {
              Bus.$emit("task-updated",{id:id,operationType:'finish'});
          }
      });

      gantt.attachEvent("onGridHeaderClick", (name, e) => {
        if(name === 'addNode') {
            Bus.$emit("task-updated",{id:0,operationType:'add'}); 
        }
      });

      gantt.attachEvent('onAfterLinkAdd', (id, link) => {
        Bus.$emit("link-updated",{id:id,operationType:'inserted',link:link}); 
      })

      gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
        Bus.$emit("link-updated",{id:id,operationType:'updated',link:link}); 
      })

      gantt.attachEvent('onAfterLinkDelete', (id, link) => {
        Bus.$emit("link-updated",{id:id,operationType:'deleted'}); 
      })

      // gantt.eachParent(function(task){
      //   console.log(111111);
      // })

      gantt.$_eventsInitialized = true;
    },
    getConfig() {
        let _this = this
        gantt.config.readonly = false;
        // 设置x轴的时间显示格式
        gantt.config.start_on_monday = true;
        gantt.config.scale_unit = "month";
        gantt.config.date_scale = "%Y-%m";
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        gantt.config.scale_height = 50;
        gantt.config.autosize = "xy";
        // gantt.config.autosize_min_width = 100;
        gantt.config.subscales = [
            {unit: "week", step: 1, date: "第%w周"},
        ];
        gantt.config.columns = this.headerTitle
        // 拖拽task的时候，自动将起始时间和结束时间矫正为工作日备注：起始和结束时间遇到周末的时候，自动把时间改为工作日的时间 默认false
        gantt.config.work_time = false;
        gantt.config.correct_work_time = true;

        // 允许通过拖拽的方式新增任务依赖的线条
         gantt.config.drag_links = false;
      //当task的长度改变时，自动调整图表坐标轴区间用于适配task的长度    
        gantt.config.fit_tasks = true; 
        // 禁止拖拽
        gantt.config.drag_move = false;
        // 禁止双击
        gantt.config.details_on_dblclick = false;
        gantt.config.drag_resize = false;
        // 启用排序功能，点击表头可以排序
        gantt.config.sort = true;
        gantt.config.task_height = 25;
        //gantt.config.min_column_width = 150;
        gantt.init(this.$refs.gantt)
        gantt.clearAll();
        gantt.parse(this.$props.tasks)
        this.$_initGanttEvents();
      }
  },
  created() {
  },
  mounted () {
    this.getConfig()
    // var dp = gantt.createDataProcessor(function(mode, taskState, data, rowId) {
    //   if(mode === 'link') {
    //       switch(taskState) {
    //         case "create":
    //           _this.workData.push(data);
    //         break;
    //         case "update":
    //           console.log(data)
    //           var itemIndex = _this.workData.findIndex(function(entry, index) {
    //             return entry.id == rowId;
    //           });
    //           _this.workData[itemIndex] = data;
    //         break;
    //         break;
    //         case "delete":
    //           var itemIndex = _this.workData.findIndex(function(entry, index) {
    //             return entry.id == rowId;
    //           });
    //           _this.workData.splice(itemIndex, 1);
    //         break;
    //       }
    //   }
    // });
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

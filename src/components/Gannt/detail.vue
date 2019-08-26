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

  methods: {
    
  },
    
  mounted () {
    gantt.config.readonly = true;
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
        {
          name: "completionType", label: "进度完成情况", width: 100, template: function (obj) {
            if (obj.completionType == 1) {
              return '<div class="completion_success"><i></i>完成</div>';
            } else if (obj.completionType == 2) {
              return '<div class="completion_ongoing"><i></i>进行中</div>';
            } else if (obj.completionType == 3) {
              return '<div class="completion_not_started"><i></i>未开始</div>';
            } 
            return '<div></div>';
          }
        },
        {
          name: "overdue", label: "是否逾期", width: 60, template: function (obj) {
            if (obj.overdue) {
              return '<div class="overdue-indicator">是</div>';
            } 
            return '<div></div>';
          }
        },
        {
          name: "fileSituation", label: "归档情况", width: 100, template: function (obj) {
            if (obj.overdue) {
              return '<div class="situation_success"><button><i></i></button>2份</div>';
            } 
            return '<div></div>';
          }
        },
        {
          name: "riskWarning", label: "风险警示情况", width: 100, template: function (obj) {
            if (obj.overdue) {
              return '<div class="risk warning"><i></i></div>';
            } 
            return '<div></div>';
          }
        },
        // {name:"duration",   label:"间隔",   align: "center",   width:'60'},
        // {name:"person",     label:"负责人",   align: "center",   width:'60'},
    ];

   //当task的长度改变时，自动调整图表坐标轴区间用于适配task的长度    
    gantt.config.fit_tasks = true; 
    // 启用排序功能，点击表头可以排序
    gantt.config.sort = true;
    gantt.init(this.$refs.gantt)
    gantt.clearAll();
    gantt.parse(this.$props.tasks)
  }
}
</script>

<style>
  /* @import "dhtmlx-gantt/codebase/dhtmlxgantt.css";	 */
  @import "../dhtmlx-gantt/codebase/skins/dhtmlxgantt_skyblue.css";	
  .overdue-indicator {
    width: 30px;
    margin: 2px 0 0 9px;
    height: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 17px;
    color: white;
    background: rgb(255, 60, 60);
    line-height: 30px;
    text-align: center;
    font-size: 15px;
  }
  .completion_success i ,.completion_ongoing i,.completion_not_started i{
    display:inline-block;
    width:5px;
    height:5px;
    border-radius:50%;
    margin: 2px 5px;
  }
  .completion_success {
    font-size: 12px;
    color:#67c23a;
  }
  .completion_success i {
    background:#67c23a;
  }
  .completion_ongoing {
    font-size: 12px;
    color:#409eff;
  }
  .completion_ongoing i {
    background:#409eff;
  }
  .completion_not_started {
    font-size: 12px;
    color:#909399;
  }
  .completion_not_started i {
    background:#909399;
  }
  .situation_success button {
    background: #67c23a;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 20px;
    color:#fff;
  }
  .situation_success i {
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
  }
  .situation_success i:before{
    content: "\e6da";
  }
  .risk warning {

  }
  .risk warning i{
    
  }
</style>

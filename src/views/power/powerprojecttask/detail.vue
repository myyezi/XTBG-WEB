<template>
  <div class="detail-panel">
    <el-collapse v-model="openCollapse">
      <el-collapse-item title="项目任务书" name="1">
        <div class="flex-panel detail-box">
          <div class="detail-item">
            <label class="control-label">项目编号</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.code}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目名称</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.name}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目类型</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.typeText}}</span>
            </div>
          </div>
          <div class="detail-item ">
            <label class="control-label">建设单位</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.proprietorText}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">任务依据</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.sourceText}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">相关设计</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.relatedDesignText}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">协办部门</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.coDepartmentText}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">联系人</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.proprietorContactText}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目经理</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.managerName}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">下达人</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.creater}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">下达时间</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.createTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">签收人</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.signerName}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">签收时间</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.signTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目开始时间</label>
            <div class="input-group">
              <span>{{designScale}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目结束时间</label>
            <div class="input-group">
              <span>{{designRange}}</span>
            </div>
          </div>
          <div class="detail-item big">
            <label class="control-label">设计规模</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.designScale}}</span>
            </div>
          </div>
          <div class="detail-item big">
            <label class="control-label">设计规范</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.designRange}}</span>
            </div>
          </div>
          <div class="detail-item big">
            <label class="control-label">设计进度要求</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.progress}}</span>
            </div>
          </div>
          <div class="detail-item big">
            <label class="control-label">备注</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.remark}}</span>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>

</template>

<script>
import ajax from '@/utils/request'
import { tool } from '@/utils/common'

export default {
  name: "PowerProjectTaskDetail",
  mixins: [tool],
  data() {
    return {
      newCarForm: {},
      openCollapse: ["1"],//默认打开的面板
      powerprojecttaskForm:[]
    }
  },
  mounted() {
    ajax.get('project/powerprojecttask/' + this.$route.params.id).then(rs => {
      this.powerprojecttaskForm = rs.data;

    });
  },
  methods: {},

}
</script>

<template>
  <div class="detail-panel">
    <el-collapse v-model="openCollapse">
      <el-collapse-item title="项目计划模板设置" name="1">
        <div class="flex-panel detail-box">
          <div class="detail-item">
            <label class="control-label">主键id</label>
            <div class="input-group">
              <span>{{id}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">模板id</label>
            <div class="input-group">
              <span>{{templateId}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">节点名称</label>
            <div class="input-group">
              <span>{{name}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">节点级别（1- 一级，2-二级，3-三级）</label>
            <div class="input-group">
              <span>{{level}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">父节点id</label>
            <div class="input-group">
              <span>{{parentId}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">工程阶段（关联字典表，取value值）</label>
            <div class="input-group">
              <span>{{stage}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">工期</label>
            <div class="input-group">
              <span>{{period}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">专业</label>
            <div class="input-group">
              <span>{{profession}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">是否审批（0-否 1-是）</label>
            <div class="input-group">
              <span>{{isApproval}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">是否上传文件（0-否 1-是）</label>
            <div class="input-group">
              <span>{{isUpload}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">排序号</label>
            <div class="input-group">
              <span>{{sortNum}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">数据状态(0-删除，1-正常)</label>
            <div class="input-group">
              <span>{{status}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">创建人</label>
            <div class="input-group">
              <span>{{creater}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">修改人</label>
            <div class="input-group">
              <span>{{updater}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">创建时间</label>
            <div class="input-group">
              <span>{{createTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">修改时间</label>
            <div class="input-group">
              <span>{{updateTime}}</span>
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
  name: "PowerProjectTemplateConfigDetail",
  mixins: [tool],
  data() {
    return {
      newCarForm: {},
      openCollapse: ["1"],//默认打开的面板
    }
  },
  mounted() {
    ajax.get('project/powerprojecttemplateconfig/' + this.$route.params.id).then(rs => {
      this.powerprojecttemplateconfigForm = rs.data;

    });
  },
  methods: {},

}
</script>

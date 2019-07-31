<template>
  <div class="detail-panel">
    <el-collapse v-model="openCollapse">
      <el-collapse-item title="项目任务书" name="1">
        <div class="flex-panel detail-box">
          <div class="detail-item">
            <label class="control-label">主键</label>
            <div class="input-group">
              <span>{{id}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">所属管理公司(组织表管理公司id)</label>
            <div class="input-group">
              <span>{{companyId}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">编号</label>
            <div class="input-group">
              <span>{{code}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">名称</label>
            <div class="input-group">
              <span>{{name}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目类型（关联字典表，取value值）</label>
            <div class="input-group">
              <span>{{type}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">建设单位(关联业主表)</label>
            <div class="input-group">
              <span>{{proprietorId}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">联系人(关联业主联系人表)</label>
            <div class="input-group">
              <span>{{proprietorContactId}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">任务依据（1-委托书 2-招投标 3-电话委托 4-其他）</label>
            <div class="input-group">
              <span>{{source}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">相关设（关联字典表，取value值,多个逗号隔开）</label>
            <div class="input-group">
              <span>{{relatedDesign}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">协办部门(关联字典表，取value值,多个逗号隔开)</label>
            <div class="input-group">
              <span>{{coDepartment}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目经理(关联用户表)</label>
            <div class="input-group">
              <span>{{manager}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">签收状态(1-未签收 2-已签收)</label>
            <div class="input-group">
              <span>{{signStatus}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">签收人(关联用户表)</label>
            <div class="input-group">
              <span>{{signer}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">签收时间</label>
            <div class="input-group">
              <span>{{signTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">设计规模</label>
            <div class="input-group">
              <span>{{designScale}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">设计范围</label>
            <div class="input-group">
              <span>{{designRange}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目进度要求</label>
            <div class="input-group">
              <span>{{progress}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">详细地址</label>
            <div class="input-group">
              <span>{{adress}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">经度</label>
            <div class="input-group">
              <span>{{longitude}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">纬度</label>
            <div class="input-group">
              <span>{{latitude}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">备注</label>
            <div class="input-group">
              <span>{{remark}}</span>
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
            <label class="control-label">更新人</label>
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
            <label class="control-label">更新时间</label>
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
  name: "PowerProjectTaskDetail",
  mixins: [tool],
  data() {
    return {
      newCarForm: {},
      openCollapse: ["1"],//默认打开的面板
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

<template>
  <div class="detail-panel">
    <el-collapse v-model="openCollapse">
      <el-collapse-item title="安全风险预警通知单" name="1">
        <div class="flex-panel detail-box">
          <div class="detail-item">
            <label class="control-label">编号</label>
            <div class="input-group">
              <span>{{code}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目名称</label>
            <div class="input-group">
              <span>{{projectName}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">发布单位</label>
            <div class="input-group">
              <span>{{publishCompany}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">发布日期</label>
            <div class="input-group">
              <span>{{publishDate}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">接收单位</label>
            <div class="input-group">
              <span>{{receiveCompany}}</span>
            </div>
          </div>

          <div class="detail-item">
            <label class="control-label">风险级别</label>
            <div class="input-group">
              <span>{{riskLevel}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">作业内容</label>
            <div class="input-group">
              <span>{{piskProcess}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">风险分析</label>
            <div class="input-group">
              <span>{{riskResult}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">检查范围和简要内容</label>
            <div class="input-group">
              <span>{{description}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">预警计划时间</label>
            <div class="input-group">
              <span>{{planTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">预警解除时间</label>
            <div class="input-group">
              <span>{{relieveTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">签收单位</label>
            <div class="input-group">
              <span>{{issuingCompany}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">编制</label>
            <div class="input-group">
              <span>{{organizationCompany}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">签发单位</label>
            <div class="input-group">
              <span>{{signforCompany}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">报送单位</label>
            <div class="input-group">
              <span>{{submissionCompany}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">签发人</label>
            <div class="input-group">
              <span>{{signforPerson}}</span>
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
  name: "SafeWarnDetail",
  mixins: [tool],
  data() {
    return {
      newCarForm: {},
      openCollapse: ["1"],//默认打开的面板
    }
  },
  mounted() {
    ajax.get('qsm/safe/warn/' + this.$route.params.id).then(rs => {
      this.warnForm = rs.data;

    });
  },
  methods: {},

}
</script>

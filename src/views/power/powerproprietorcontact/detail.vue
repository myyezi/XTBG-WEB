<template>
  <div class="detail-panel">
    <el-collapse v-model="openCollapse">
      <el-collapse-item title="业主-联系人" name="1">
        <div class="flex-panel detail-box">
          <div class="detail-item">
            <label class="control-label">主键</label>
            <div class="input-group">
              <span>{{id}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">名称</label>
            <div class="input-group">
              <span>{{name}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">联系方式</label>
            <div class="input-group">
              <span>{{phone}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">邮箱</label>
            <div class="input-group">
              <span>{{email}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">职务</label>
            <div class="input-group">
              <span>{{post}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">部门</label>
            <div class="input-group">
              <span>{{department}}</span>
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
  name: "PowerProprietorContactDetail",
  mixins: [tool],
  data() {
    return {
      newCarForm: {},
      openCollapse: ["1"],//默认打开的面板
    }
  },
  mounted() {
    ajax.get('project/powerproprietorcontact/' + this.$route.params.id).then(rs => {
      this.powerproprietorcontactForm = rs.data;

    });
  },
  methods: {},

}
</script>

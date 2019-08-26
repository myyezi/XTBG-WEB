<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="质量检查问题整改单" name="1">
                <div class="flex-panel detail-box">
                                      <div class="detail-item">
                      <label class="control-label">主键id</label>
                      <div class="input-group">
                        <span>{{id}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">项目id</label>
                      <div class="input-group">
                        <span>{{projectId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">编号</label>
                      <div class="input-group">
                        <span>{{code}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">整改复查单位</label>
                      <div class="input-group">
                        <span>{{checkCompany}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">复查日期</label>
                      <div class="input-group">
                        <span>{{checkDate}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">复查人员</label>
                      <div class="input-group">
                        <span>{{checkUserId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">整改情况说明</label>
                      <div class="input-group">
                        <span>{{description}}</span>
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
    import {tool} from '@/utils/common'

    export default {
        name: "QualityCheckRectifyDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('qsm/quality/checkrectify/' + this.$route.params.id).then(rs => {
                this.checkrectifyForm = rs.data;

            });
        },
        methods: {},

    }
</script>

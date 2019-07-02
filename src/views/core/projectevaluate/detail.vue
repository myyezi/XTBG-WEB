<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="项目部综合评价" name="1">
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
                      <label class="control-label">父节点id</label>
                      <div class="input-group">
                        <span>{{parentId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">类型（1-业主，2-监理，3-施工）</label>
                      <div class="input-group">
                        <span>{{type}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">指标序号</label>
                      <div class="input-group">
                        <span>{{code}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">评价指标标题</label>
                      <div class="input-group">
                        <span>{{title}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">考核内容及评分标准</label>
                      <div class="input-group">
                        <span>{{content}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">指标分值</label>
                      <div class="input-group">
                        <span>{{indexScore}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">扣分</label>
                      <div class="input-group">
                        <span>{{deductScore}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">扣分原因</label>
                      <div class="input-group">
                        <span>{{deductReason}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">审核人</label>
                      <div class="input-group">
                        <span>{{auditor}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">审核状态(0-待审核，1-审核通过，2-审核不通过)</label>
                      <div class="input-group">
                        <span>{{auditStatus}}</span>
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
        name: "CoreProjectEvaluateDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('core/projectevaluate/' + this.$route.params.id).then(rs => {
                this.projectevaluateForm = rs.data;

            });
        },
        methods: {},

    }
</script>

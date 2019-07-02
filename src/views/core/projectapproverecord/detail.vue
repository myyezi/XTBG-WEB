<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="项目周报审批记录表" name="1">
                <div class="flex-panel detail-box">
                                      <div class="detail-item">
                      <label class="control-label">主键id</label>
                      <div class="input-group">
                        <span>{{id}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">周报id</label>
                      <div class="input-group">
                        <span>{{reportId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">审批状态(2-一级审批人审批通过，3-一级审批人驳回，4-二级审批人审批通过，5-二级审批人驳回)</label>
                      <div class="input-group">
                        <span>{{approveStatus}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">审批人</label>
                      <div class="input-group">
                        <span>{{approver}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">审批时间</label>
                      <div class="input-group">
                        <span>{{approveTime}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">数据状态(0-删除，1-正常)</label>
                      <div class="input-group">
                        <span>{{status}}</span>
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
        name: "CoreProjectApproveRecordDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('core/projectapproverecord/' + this.$route.params.id).then(rs => {
                this.projectapproverecordForm = rs.data;

            });
        },
        methods: {},

    }
</script>

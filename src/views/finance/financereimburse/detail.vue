<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="费用报销" name="1">
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
                      <label class="control-label">金额</label>
                      <div class="input-group">
                        <span>{{amount}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">备注</label>
                      <div class="input-group">
                        <span>{{remark}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">状态(1-审批中，2-已通过  3-已驳回 4-已作废)</label>
                      <div class="input-group">
                        <span>{{approvalStatus}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">数据状态(0-删除，1-正常)</label>
                      <div class="input-group">
                        <span>{{status}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">申请人</label>
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
                      <label class="control-label">申请时间</label>
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
        name: "FinanceReimburseDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('finance/financereimburse/' + this.$route.params.id).then(rs => {
                this.financereimburseForm = rs.data;

            });
        },
        methods: {},

    }
</script>

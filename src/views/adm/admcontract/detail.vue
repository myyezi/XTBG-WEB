<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="合同管理" name="1">
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
                      <label class="control-label">合同名称</label>
                      <div class="input-group">
                        <span>{{name}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">项目任务书ID</label>
                      <div class="input-group">
                        <span>{{projectTaskId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">金额</label>
                      <div class="input-group">
                        <span>{{amount}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">签订人(用户id)</label>
                      <div class="input-group">
                        <span>{{signer}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">签订时间</label>
                      <div class="input-group">
                        <span>{{signTime}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">收款进度</label>
                      <div class="input-group">
                        <span>{{progress}}</span>
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
        name: "AdmContractDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('adm/admcontract/' + this.$route.params.id).then(rs => {
                this.admcontractForm = rs.data;

            });
        },
        methods: {},

    }
</script>

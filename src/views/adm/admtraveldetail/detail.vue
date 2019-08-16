<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="出差明细" name="1">
                <div class="flex-panel detail-box">
                                      <div class="detail-item">
                      <label class="control-label">主键</label>
                      <div class="input-group">
                        <span>{{id}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">出差地点</label>
                      <div class="input-group">
                        <span>{{address}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">开始时间</label>
                      <div class="input-group">
                        <span>{{startTime}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">结束时间</label>
                      <div class="input-group">
                        <span>{{endTime}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">出差时长</label>
                      <div class="input-group">
                        <span>{{travelTime}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">出行方式(1-公共交通 2-出租车 3-自驾  4-公司车辆)</label>
                      <div class="input-group">
                        <span>{{type}}</span>
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
        name: "AdmTravelDetailDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('adm/admtraveldetail/' + this.$route.params.id).then(rs => {
                this.admtraveldetailForm = rs.data;

            });
        },
        methods: {},

    }
</script>

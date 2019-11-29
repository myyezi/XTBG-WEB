<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="出库管理" name="1">
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
                      <label class="control-label">采购物品（物品字典表ID）</label>
                      <div class="input-group">
                        <span>{{goodsId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">出库数量</label>
                      <div class="input-group">
                        <span>{{num}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">期望出库日期</label>
                      <div class="input-group">
                        <span>{{hopeStockOutTime}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">出库事由</label>
                      <div class="input-group">
                        <span>{{reason}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">出库人</label>
                      <div class="input-group">
                        <span>{{stockOutUser}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">出库时间</label>
                      <div class="input-group">
                        <span>{{stockOutTime}}</span>
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
        name: "AdmStockOutDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('adm/admstockout/' + this.$route.params.id).then(rs => {
                this.admstockoutForm = rs.data;

            });
        },
        methods: {},

    }
</script>

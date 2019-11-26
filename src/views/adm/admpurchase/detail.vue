<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="采购管理" name="1">
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
                      <label class="control-label">采购数量</label>
                      <div class="input-group">
                        <span>{{num}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">期望采购时间</label>
                      <div class="input-group">
                        <span>{{hopePurchaseTime}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">采购状态</label>
                      <div class="input-group">
                        <span>{{purchaseStatus}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">采购金额</label>
                      <div class="input-group">
                        <span>{{amount}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">供应商</label>
                      <div class="input-group">
                        <span>{{supplierId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">采购事由</label>
                      <div class="input-group">
                        <span>{{reason}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">入库状态</label>
                      <div class="input-group">
                        <span>{{stockInStatus}}</span>
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
        name: "AdmPurchaseDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('adm/admpurchase/' + this.$route.params.id).then(rs => {
                this.admpurchaseForm = rs.data;

            });
        },
        methods: {},

    }
</script>

<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="库存管理" name="1">
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
                      <label class="control-label">数量</label>
                      <div class="input-group">
                        <span>{{num}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">预警阀值</label>
                      <div class="input-group">
                        <span>{{warningNum}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">缺货阀值</label>
                      <div class="input-group">
                        <span>{{shortageNum}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">库存状态（1-正常，2-预警）</label>
                      <div class="input-group">
                        <span>{{stockStatus}}</span>
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
        name: "AdmStockDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('adm/admstock/' + this.$route.params.id).then(rs => {
                this.admstockForm = rs.data;

            });
        },
        methods: {},

    }
</script>

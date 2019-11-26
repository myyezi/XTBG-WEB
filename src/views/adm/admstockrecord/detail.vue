<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="库存管理_记录" name="1">
                <div class="flex-panel detail-box">
                                      <div class="detail-item">
                      <label class="control-label">主键</label>
                      <div class="input-group">
                        <span>{{id}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">库存ID</label>
                      <div class="input-group">
                        <span>{{stockId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">采购物品（物品字典表ID）</label>
                      <div class="input-group">
                        <span>{{goodsId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">库存动作(1-入库，2-出库)</label>
                      <div class="input-group">
                        <span>{{actionType}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">执行数量</label>
                      <div class="input-group">
                        <span>{{executNum}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">实时总数</label>
                      <div class="input-group">
                        <span>{{num}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">申请人</label>
                      <div class="input-group">
                        <span>{{applyer}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">申请时间</label>
                      <div class="input-group">
                        <span>{{applyTime}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">执行人</label>
                      <div class="input-group">
                        <span>{{executor}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">执行时间</label>
                      <div class="input-group">
                        <span>{{executTime}}</span>
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
        name: "AdmStockRecordDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('adm/admstockrecord/' + this.$route.params.id).then(rs => {
                this.admstockrecordForm = rs.data;

            });
        },
        methods: {},

    }
</script>

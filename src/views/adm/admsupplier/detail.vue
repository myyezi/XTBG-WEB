<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="供应商管理" name="1">
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
                      <label class="control-label">供应商名称</label>
                      <div class="input-group">
                        <span>{{name}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">省</label>
                      <div class="input-group">
                        <span>{{province}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">市</label>
                      <div class="input-group">
                        <span>{{city}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">区</label>
                      <div class="input-group">
                        <span>{{district}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">详细地址</label>
                      <div class="input-group">
                        <span>{{address}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">经度</label>
                      <div class="input-group">
                        <span>{{longitude}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">纬度</label>
                      <div class="input-group">
                        <span>{{latitude}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">备注</label>
                      <div class="input-group">
                        <span>{{remark}}</span>
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
                      <label class="control-label">更新人</label>
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
                      <label class="control-label">更新时间</label>
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
        name: "AdmSupplierDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('adm/admsupplier/' + this.$route.params.id).then(rs => {
                this.admsupplierForm = rs.data;

            });
        },
        methods: {},

    }
</script>

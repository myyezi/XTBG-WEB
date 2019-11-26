<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="考核管理_考题选项表" name="1">
                <div class="flex-panel detail-box">
                                      <div class="detail-item">
                      <label class="control-label">主键</label>
                      <div class="input-group">
                        <span>{{id}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">考核ID</label>
                      <div class="input-group">
                        <span>{{appraiseId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">选项内容</label>
                      <div class="input-group">
                        <span>{{text}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">排序</label>
                      <div class="input-group">
                        <span>{{sort}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">数据状态(0-删除，1-正常)</label>
                      <div class="input-group">
                        <span>{{status}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">选项值</label>
                      <div class="input-group">
                        <span>{{value}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">选项图片（图片地址）</label>
                      <div class="input-group">
                        <span>{{picture}}</span>
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
                                      <div class="detail-item">
                      <label class="control-label">考核题目ID</label>
                      <div class="input-group">
                        <span>{{appraiseQuestionId}}</span>
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
        name: "AdmAppraiseQuestionOptionDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('adm/admappraisequestionoption/' + this.$route.params.id).then(rs => {
                this.admappraisequestionoptionForm = rs.data;

            });
        },
        methods: {},

    }
</script>

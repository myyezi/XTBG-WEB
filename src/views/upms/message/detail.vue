<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="消息提醒" name="1">
                <div class="flex-panel detail-box">
                                      <div class="detail-item">
                      <label class="control-label">ID</label>
                      <div class="input-group">
                        <span>{{id}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">用户ID</label>
                      <div class="input-group">
                        <span>{{userId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">消息标题</label>
                      <div class="input-group">
                        <span>{{title}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">消息内容</label>
                      <div class="input-group">
                        <span>{{content}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">类型</label>
                      <div class="input-group">
                        <span>{{type}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">跳转URL</label>
                      <div class="input-group">
                        <span>{{jumpUrl}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">跳转标题</label>
                      <div class="input-group">
                        <span>{{jumpTitle}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">读取状态(0-未读，1-已读)</label>
                      <div class="input-group">
                        <span>{{readStatus}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">数据状态(0-删除，1-正常)</label>
                      <div class="input-group">
                        <span>{{status}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">创建时间</label>
                      <div class="input-group">
                        <span>{{createTime}}</span>
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
        name: "SysMessageDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('message/sysmessage/' + this.$route.params.id).then(rs => {
                this.sysmessageForm = rs.data;

            });
        },
        methods: {},

    }
</script>

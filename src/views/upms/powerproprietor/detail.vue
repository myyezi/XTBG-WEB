<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="业主" name="1">
                <div class="flex-panel detail-box">
                    <div class="detail-item">
                      <label class="control-label">业主名称</label>
                      <div class="input-group">
                        <span>{{powerproprietorForm.name}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">地区</label>
                      <div class="input-group">
                        <span>{{powerproprietorForm.districtName}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">详细地址</label>
                      <div class="input-group">
                        <span>{{powerproprietorForm.address}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">经度</label>
                      <div class="input-group">
                        <span>{{powerproprietorForm.longitude}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">纬度</label>
                      <div class="input-group">
                        <span>{{powerproprietorForm.latitude}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">创建时间</label>
                      <div class="input-group">
                        <span>{{powerproprietorForm.createTime}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">更新时间</label>
                      <div class="input-group">
                        <span>{{powerproprietorForm.updateTime}}</span>
                      </div>
                    </div>
                    <div class="detail-item big">
                        <label class="control-label">备注</label>
                        <div class="input-group">
                            <span>{{powerproprietorForm.remark}}</span>
                        </div>
                    </div>
                </div>
            </el-collapse-item>

            <el-collapse-item title="联系人信息" name="2" v-model="openCollapse">
                <el-table border :data="powerproprietorForm.contactList" style="width: 100%">
                    <el-table-column prop="name" label="联系人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="post" label="联系人职务" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="phone" label="联系人手机号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="email" label="联系人邮箱" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="department" label="联系人所在部门" show-overflow-tooltip></el-table-column>
                </el-table>
            </el-collapse-item>
        </el-collapse>
    </div>

</template>

<script>
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'

    export default {
        name: "PowerProprietorDetail",
        mixins: [tool],
        data() {
            return {
                powerproprietorForm: {
                    contactList: []
                },
                openCollapse: ["1", "2"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('upms/powerproprietor/' + this.$route.params.id).then(rs => {
                this.powerproprietorForm = rs.data;
            });
        },
        methods: {},

    }
</script>

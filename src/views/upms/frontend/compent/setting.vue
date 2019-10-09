<template>
    <el-drawer
        class="drawer_setting"
        :title="drawerTitle"
        :visible.sync="drawerShow"
        size="360px">
        <el-tabs v-model="activeName">
            <el-tab-pane label="设置发起人" name="first" v-if="drawerType == 'start'">
                <el-form label-width="80px" class="drawer_form">
            
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="设置审批人" name="first" v-if="drawerType == 'approver'">
                <el-form label-width="80px" class="drawer_form">
            
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="设置抄送人" name="first" v-if="drawerType == 'notifier'">
                <el-form label-width="80px" class="drawer_form">
            
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <div class="drawer_footer">
            <el-button @click="drawerShow = false">取消</el-button>
            <el-button type="primary">保存</el-button>
        </div>
    </el-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: ['drawerTitle','drawerType'],
    data () {
        return {
        drawerShow:false,
        activeName:'first'
        }
    },
    computed: {
        
    },
    created () {
    },
    methods: {
        open () {
            this.drawerShow = true
        },
    }
}
</script>

<style lang="scss">
    .drawer_setting {
        .el-tabs__active-bar {
            display:block;
            transform: translateX(0px) !important;
        }
        .el-tabs__item {
            padding: 5px 15px !important;
        }
        // .el-tabs--top .el-tabs__item.is-top:last-child {
        //     padding-right: 0 !important;
        // }
        // .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
        //     padding-left: 0 !important;
        // }
        .el-tabs__item.is-active {
            color: #409eff;
            background-color: #fff;
        }
        .drawer_form {
            height:calc(100vh - 150px);
            overflow:auto;
            padding: 20px calc((100% - 210px)/2) 0;
        }
    }
</style>

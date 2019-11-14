<template>
    <el-popover
        placement="right"
        trigger="click"
        v-model="popoverVisible"
        >
        <ul class="work-flow-add-node-body">
            <li class="add-node-item">
                <div class="node-item-wrapper" @click="addApprover(workData)">
                    <i class="el-icon-user-solid"></i>
                </div>
                <p>审批人</p>
            </li>
            <li class="add-node-item">
                <div class="node-item-wrapper" @click="addNotifier(workData)">
                    <i class="el-icon-s-promotion"></i>
                </div>
                <p>抄送人</p>
            </li>
            <li class="add-node-item">
                <div class="node-item-wrapper" @click="addRoute(workData)">
                    <i class="icon-unit"></i>
                </div>
                <p>条件分支</p>
            </li>
        </ul>
        <button class="btn" type="button" slot="reference">
            <i class="el-icon-plus"></i>
        </button>
    </el-popover>
</template>
<script>
    import Bus from "@/utils/eventBus.js";
    export default {
        components: {},
        props: ['workData'],
        data() {
            return {
                popoverVisible:false
            }
        },
        mounted() {
            
        },
        methods: {
            addApprover(data) {
                Bus.$emit("work-add-pprover",{workData:data}); 
                this.popoverVisible = false
            },
            addNotifier(data) {
                Bus.$emit("work-add-notifier",{workData:data}); 
                this.popoverVisible = false
            },
            addRoute(data) {
                Bus.$emit("work-add-route",{workData:data}); 
                this.popoverVisible = false
            },
        }
    }
</script>
<style lang="scss">
</style>

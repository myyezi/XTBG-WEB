<template>
    <!-- item 主体开始 -->
    <div class="node-wrap" v-if="workData.type=='start' || workData.type=='approver'">
        <div class="node-wrap-box node_sid-startevent" :class="{'start-node':workData.type=='start'}">
            <div>
                <div class="title">
                    <span class="">{{workData.name}}</span>
                </div>
                <div class="content">
                    <div class="text">所有人</div>
                    <i class="anticon el-icon-arrow-right"></i>
                </div>
            </div>
        </div>
        <div class="add-node-btn-box">
            <div class="add-node-btn">
                <button class="btn" type="button">
                    <i class="el-icon-plus"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="branch-wrap" v-else-if="workData.type=='route'">
        <div class="branch-box-wrap">
            <div class="branch-box">
                <button class="add-branch">添加条件</button>
                <div class="column—box" v-for="(item,index) in workData.conditionNodes" :key="index">
                    <div class="top-left-cover-line" v-if="index==0"></div>
                    <div class="top-right-cover-line" v-if="(index+1)==workData.conditionNodes.length"></div>
                    <div class="bottom-left-cover-line" v-if="index==0"></div>
                    <div class="bottom-right-cover-line" v-if="(index+1)==workData.conditionNodes.length"></div>
                    <div class="condition-node">
                        <div class="condition-node-box">
                            <div class="auto-judge">
                                <div class="title-wrapper">
                                    <span class="editable-title">{{item.name}}</span>
                                    <span class="priority-title">{{'优先级'+(index+1)}}</span>
                                    <i class="el-icon-close close"></i>
                                </div>
                            </div>
                            <div class="add-node-btn">
                                <button class="btn" type="button">
                                    <i class="el-icon-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <work :workData="item.childNode" v-if="item.childNode&&JSON.stringify(item.childNode) !== '{}'"></work>
                </div>
            </div>
            <div class="add-node-btn-box">
                <div class="add-node-btn">
                    <button class="btn" type="button">
                        <i class="el-icon-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
        <!-- item 主体结束 -->
</template>
<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    // import work from './work'
    export default {
        name: 'workItem',
        components: {work:()=>import('./work')},
        mixins: [tool, ruleTool],
        props: ['workData'],
        data() {
            return {
            }
        },
        mounted() {
            console.log(this.workData)
        },
        methods: {
            
        }
    }
</script>
<style lang="scss">
</style>

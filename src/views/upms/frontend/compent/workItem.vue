<template>
    <div class="work-flow-item">
        <!-- item 主体开始 -->
        <div class="node-wrap" v-if="workData.type=='start' || workData.type=='approver' || workData.type=='notifier'">
            <div class="node-wrap-box node_sid-startevent" :class="{'start-node':workData.type=='start'}">
                <div>
                    <div class="title" :class="{'notifier_title':workData.type =='notifier'}">
                        <i class="el-icon-user-solid" v-if="workData.type == 'approver'"></i>
                        <i class="el-icon-s-promotion" v-if="workData.type == 'notifier'"></i>
                        <span 
                            :class="{'editable-title':workData.type!='start'}" 
                            v-if="workData.type=='start'||(workData.properties&&workData.properties.editName)" 
                            @click.stop="workData.type!='start'?showInput(workData):''">
                            {{workData.name}}
                        </span>
                        <input v-else v-model="workData.name" @click.stop=''/>
                        <i class="el-icon-close close"></i>
                    </div>
                    <div class="content" @click="settingCount(workData)">
                        <div class="text" v-if="workData.type=='start'">请选择发起人</div>
                        <div class="text" v-if="workData.type=='approver'">请选择审批人</div>
                        <div class="text" v-if="workData.type=='notifier'">请选择抄送人</div>
                        <i class="anticon el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div class="add-node-btn-box">
                <div class="add-node-btn">
                    <el-popover
                        placement="right"
                        trigger="click"
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
                                        <span class="editable-title" v-if="item.properties&&item.properties.editName" @click.stop="showInput(item)">{{item.name}}</span>
                                        <input v-else v-model="item.name" @click.stop=''/>
                                        <span class="priority-title">{{'优先级'+(index+1)}}</span>
                                        <i class="el-icon-close close"></i>
                                    </div>
                                </div>
                                <div class="add-node-btn">
                                    <el-popover
                                        placement="right"
                                        trigger="click"
                                        >
                                        <ul class="work-flow-add-node-body">
                                            <li class="add-node-item">
                                                <div class="node-item-wrapper">
                                                    <i class="el-icon-user-solid"></i>
                                                </div>
                                                <p>审批人</p>
                                            </li>
                                            <li class="add-node-item">
                                                <div class="node-item-wrapper">
                                                    <i class="el-icon-s-promotion"></i>
                                                </div>
                                                <p>抄送人</p>
                                            </li>
                                            <li class="add-node-item">
                                                <div class="node-item-wrapper">
                                                    <i class="icon-unit"></i>
                                                </div>
                                                <p>条件分支</p>
                                            </li>
                                        </ul>
                                        <button class="btn" type="button" slot="reference">
                                            <i class="el-icon-plus"></i>
                                        </button>
                                    </el-popover>
                                </div>
                            </div>
                        </div>
                        <work-item :workData="item.childNode" v-if="item.childNode&&JSON.stringify(item.childNode) !== '{}'" />
                    </div>
                </div>
                <div class="add-node-btn-box">
                    <div class="add-node-btn">
                        <el-popover
                            placement="right"
                            trigger="click"
                            >
                            <ul class="work-flow-add-node-body">
                                <li class="add-node-item">
                                    <div class="node-item-wrapper">
                                        <i class="el-icon-user-solid"></i>
                                    </div>
                                    <p>审批人</p>
                                </li>
                                <li class="add-node-item">
                                    <div class="node-item-wrapper">
                                        <i class="el-icon-s-promotion"></i>
                                    </div>
                                    <p>抄送人</p>
                                </li>
                                <li class="add-node-item">
                                    <div class="node-item-wrapper">
                                        <i class="icon-unit"></i>
                                    </div>
                                    <p>条件分支</p>
                                </li>
                            </ul>
                            <button class="btn" type="button" slot="reference">
                                <i class="el-icon-plus"></i>
                            </button>
                        </el-popover>
                    </div>
                </div>
            </div>
        </div>
        <!-- item 主体结束 -->
        <!-- 判断流程是否存在nextNode，如果有则去递归，没有就结束 -->
        <!-- <work-item v-if="workData.childNode&&JSON.stringify(workData.childNode) !== '{}'" :workData="workData.childNode" /> -->
        <work-item v-if="workData.childNode&&JSON.stringify(workData.childNode[0]) !== '{}'" :workData="workData.childNode[0]" />
    </div>
</template>
<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    import Bus from "@/utils/eventBus.js";
    export default {
        name: 'workItem',
        // components: {work:()=>import('./work')},//自组件调用父组件方式
        mixins: [tool, ruleTool],
        props: ['workData'],
        data() {
            return {
                // showNodeName:true
            }
        },
        mounted() {
        },
        destroyed() {
            Bus.$off("transfer-station")
            Bus.$off("work-add-pprover")
            Bus.$off("work-add-notifier")
            Bus.$off("work-add-route")
            Bus.$off("setting-count")
        },
        methods: {
            showInput(data) {
                Bus.$emit("transfer-station",{workData:data,type:1}); 
                // this.$emit("transfer-station",{workData:data,type:1})
            },
            addApprover(data) {
                Bus.$emit("work-add-pprover",{workData:data}); 
            },
            addNotifier(data) {
                Bus.$emit("work-add-notifier",{workData:data}); 
            },
            addRoute(data) {
                Bus.$emit("work-add-route",{workData:data}); 
            },
            settingCount(data) {
                Bus.$emit("setting-count",{workData:data});
            }
        }
    }
</script>
<style lang="scss">
</style>

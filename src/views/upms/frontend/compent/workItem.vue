<template>
    <div class="work-flow-item">
        <!-- item 主体开始 -->
        <div class="node-wrap" v-if="workData.nodeType==1 || workData.nodeType==2 || workData.nodeType==3">
            <div class="node-wrap-box node_sid-startevent" :class="{'start-node':workData.nodeType==1}">
                <div>
                    <div class="title" :class="{'notifier_title':workData.nodeType ==3}">
                        <i class="el-icon-user-solid" v-if="workData.nodeType == 2"></i>
                        <i class="el-icon-s-promotion" v-if="workData.nodeType == 3"></i>
                        <span 
                            :class="{'editable-title':workData.nodeType!=1}" 
                            v-if="workData.nodeType==1||(!workData.properties||!workData.properties.editName)" 
                            @click.stop="workData.nodeType!=1?showInput(workData):''">
                            {{workData.name}}
                        </span>
                        <input v-else v-model="workData.name" @click.stop=''/>
                        <i class="el-icon-close close" @click.stop='deleteNode(workData)' v-if="workData.nodeType!=1"></i>
                    </div>
                    <div class="content" @click="settingCount(workData)">
                        <div class="text" v-if="workData.nodeType==1">请选择发起人</div>
                        <div class="text" v-if="workData.nodeType==2">请选择审批人</div>
                        <div class="text" v-if="workData.nodeType==3">请选择抄送人</div>
                        <i class="anticon el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div class="add-node-btn-box">
                <div class="add-node-btn">
                    <work-popover :workData="workData"/>
                </div>
            </div>
        </div>
        <div class="branch-wrap" v-else-if="workData.nodeType==5">
            <div class="branch-box-wrap">
                <div class="branch-box">
                    <button class="add-branch" @click="addOneRoute(workData)">添加条件</button>
                    <div class="column—box" v-for="(item,index) in workData.conditionList" :key="index">
                        <div class="top-left-cover-line" v-if="index==0"></div>
                        <div class="top-right-cover-line" v-if="(index+1)==workData.conditionList.length"></div>
                        <div class="bottom-left-cover-line" v-if="index==0"></div>
                        <div class="bottom-right-cover-line" v-if="(index+1)==workData.conditionList.length"></div>
                        <div class="condition-node">
                            <div class="condition-node-box">
                                <div class="auto-judge">
                                    <div class="title-wrapper">
                                        <span class="editable-title" v-if="!item.properties || !item.properties.editName" @click.stop="showInput(item)">{{item.name}}</span>
                                        <input v-else v-model="item.name" @click.stop=''/>
                                        <span class="priority-title">{{'优先级'+(index+1)}}</span>
                                        <i class="el-icon-close close" @click.stop='deleteNode(item)'></i>
                                    </div>
                                </div>
                                <div class="add-node-btn">
                                    <work-popover :workData="item"/>
                                </div>
                            </div>
                        </div>
                        <work-item :workData="item.children[0]" v-if="item.children&&item.children.length>0" />
                    </div>
                </div>
                <div class="add-node-btn-box">
                    <div class="add-node-btn">
                        <work-popover :workData="workData"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- item 主体结束 -->
        <!-- 判断流程是否存在nextNode，如果有则去递归，没有就结束 -->
        <!-- <work-item v-if="workData.childNode&&JSON.stringify(workData.childNode) !== '{}'" :workData="workData.childNode" /> -->
        <work-item :workData="workData.children[0]" v-if="workData.children&&workData.children.length>0"/>
    </div>
</template>
<script>
    import Bus from "@/utils/eventBus.js";
    import workPopover from './workPopover'
    export default {
        name: 'workItem',
        // components: {work:()=>import('./work')},//自组件调用父组件方式
        components: {workPopover},
        props: ['workData'],
        data() {
            return {
                popoverVisible:false
            }
        },
        mounted() {
        },
        destroyed() {
            // Bus.$off("transfer-station")
            // Bus.$off("setting-count")
        },
        methods: {
            showInput(data) {
                Bus.$emit("transfer-station",{workData:data,type:1}); 
                // this.$emit("transfer-station",{workData:data,type:1})
            },
            addOneRoute(data) {
                Bus.$emit("work-add-one-route",{workData:data}); 
                this.popoverVisible = false
            },
            settingCount(data) {
                Bus.$emit("setting-count",{workData:data});
            },
            deleteNode(data) {
                Bus.$emit("delete-node",{workData:data});
            }
        }
    }
</script>
<style lang="scss">
</style>

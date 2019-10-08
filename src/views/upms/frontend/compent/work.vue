<template>
    <div class="fd-nav-content">
        <div class="workflow-design" id="workflow">
            <div class="workflow-zoom">
                <i class="el-icon-remove-outline" @click="changeSize('small')"></i>
                <span>{{zoomSize}}%</span>
                <i class="el-icon-circle-plus-outline" @click="changeSize('big')"></i>
            </div>
            <div class="box-scale" @click="transferStation({workData:workData,type:2})" :style="{ transform: 'scale('+transformSize+')' }" id="workflowDesign">
                <!-- 流程主体开始 -->
                <work-item 
                    :workData="workData"
                ></work-item>
                <!-- 流程主体开始 -->
                <!-- 流程结束开始 -->
                <div class="workflow-end-node">
                    <div class="end-node-text">流程结束</div>
                </div>
                <setting ref="setting" :drawerTitle="drawerTitle"></setting>
                <!-- 流程结束结束 -->
            </div>
        </div>
    </div>
</template>
<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    import workItem from './workItem'
    import setting from './setting'
    import Bus from "@/utils/eventBus.js";
    export default {
        name: 'workFlow',
        components: {workItem,setting},
        mixins: [tool, ruleTool],
        props: ['workFlowData'],
        data() {
            return {
                workData:this.workFlowData,
                oneWorkData:{},
                workDataType:null,
                childNode:'',
                drawerTitle:'',
                transformSize:1,
                zoomSize:100
            }
        },
        mounted() {
            this.initLocation()
            Bus.$on("transfer-station",data=>{
                this.transferStation(data)
            })
            Bus.$on("work-add-pprover",data=>{
                this.workAddApprover(data)
            })
            Bus.$on("work-add-notifier",data=>{
                this.workAddNotifier(data)
            })
            Bus.$on("work-add-route",data=>{
                this.workAddRoute(data)
            })
            Bus.$on("setting-count",data=>{
                console.log(data)
                this.$refs.setting.open()
                this.drawerTitle = data.workData.name
            })
        },
        methods: {
            // 初始化流程图居中
            initLocation() {
                this.$nextTick(() => {
                    let divs = document.getElementById('workflow');
                    let div = document.getElementById('workflowDesign');
                    let iMove = (div.scrollWidth-document.body.offsetWidth)/2
                    divs.scrollTo(iMove,0)
                })
            },
            changeSize(type) {
                if(type == 'big') {
                    if(this.zoomSize < 300) {
                        this.transformSize += 0.1
                        this.zoomSize += 10
                    }
                } else {
                    if(this.zoomSize > 50) {
                        this.transformSize -= 0.1
                        this.zoomSize -= 10
                    }
                }
            },
            transferStation(data) {
                console.log(data)
                console.log(this.workData)
                if(data.type !== 2) {
                    this.oneWorkData = data.workData
                }
                this.workDataType = data.type
                let obj = Object.assign({}, this.workData)
                this.workDataHandle(obj)
                this.workData = Object.assign({}, obj);
            },
            // 修改节点名称input框展现隐藏处理
            workDataHandle(data) {
                if(data.type=='route') {
                    if(data.conditionNodes&&data.conditionNodes.length>0) {
                        data.conditionNodes.forEach((item,index)=>{
                            if(item.properties&&JSON.stringify(item.properties) !== '{}') { 
                                item.properties.editName = true
                                if(this.workDataType!==2) {
                                    if(item.nodeId == this.oneWorkData.nodeId) {
                                        if(this.workDataType === 1) {
                                            item.properties.editName = false
                                        }
                                        if(this.workDataType === 3) {
                                            item.childNode = this.childNode
                                            // this.workData = Object.assign({}, data);
                                        }
                                        return
                                    }
                                }
                            }
                            if(item.childNode&&JSON.stringify(item.childNode) !== '{}') {
                                this.workDataHandle(item.childNode)
                            }
                        })
                    }
                    if(data.childNode&&JSON.stringify(data.childNode) !== '{}') {
                        this.workDataHandle(data.childNode)
                    }
                } else {
                    if(data.properties&&JSON.stringify(data.properties) !== '{}') { 
                        data.properties.editName = true
                        if(this.workDataType!==2) {
                            if(data.nodeId == this.oneWorkData.nodeId) {
                                if(this.workDataType === 1) {
                                    data.properties.editName = false
                                }
                                if(this.workDataType === 3) {
                                    if(this.oneWorkData.childNode) {
                                        let obj = Object.assign({}, this.oneWorkData.childNode);
                                        data.childNode = this.childNode
                                        data.childNode.childNode = obj
                                    } else {
                                        data.childNode = this.childNode
                                    }
                                    // this.workData = Object.assign({}, data);
                                }
                                return
                            }
                        }
                    }
                    if(data.childNode&&JSON.stringify(data.childNode) !== '{}') {
                        this.workDataHandle(data.childNode)
                    }
                }
            },
            // 添加审批人
            workAddApprover(data) {
                let oneWorkData = data.workData
                let nodeId = this.generateUUID()
                this.childNode = {
                    name:"审批人",
                    type:"approver",
                    prevId:oneWorkData.nodeId,
                    nodeId:nodeId,
                    properties:{
                        editName:true
                    }
                }
                this.transferStation({workData:oneWorkData,type:3})
            },
            // 添加抄送人
            workAddNotifier(data) {
                let oneWorkData = data.workData
                let nodeId = this.generateUUID()
            },
            // 添加分支
            workAddRoute(data) {
                let oneWorkData = data.workData
                let nodeId = this.generateUUID()
            },
            // 得到唯一流程id标示
            generateUUID() {
                var d = new Date().getTime();
                if (window.performance && typeof window.performance.now === "function") {
                    d += performance.now(); //高精度计时器
                }
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            }
        }
    }
</script>
<style lang="scss">
.fd-nav-content {
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    // overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 30px;
}
.workflow-design {
    width: 100%;
    overflow: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: #f5f5f7;
    .workflow-zoom {
        display: flex;
        position: fixed;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        width: 125px;
        right: 40px;
        margin-top: 10px;
        z-index: 10;
        i {
            font-size: 27px;
            cursor: pointer;
        }
        span {
            font-size: 15px;
        }
    }
    .box-scale {
        transform: scale(1);
        display: inline-block;
        position: relative;
        width: 100%;
        // height: 100%;
        padding: 50px 0;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        min-width: min-content;
        background-color: #f5f5f7;//背景色
        // transform-origin: 0 0 0;
        transform-origin: 50% 0px 0px;
    }
}
.work-flow-item{
    width: 100%;
    // height:800px;
    // padding: 50px 0;
    .editable-title {
        line-height: 16px;
        height: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-bottom: 1px dashed transparent;
        &::before{
            content: "";
            position: absolute;
            top: 0;
            left: 16px;
            bottom: 0;
            right: 40px;
        }
    }
    .node-wrap {
        display: inline-flex;
        width: 100%;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 50px;
        position: relative; 
        .node-wrap-box {
            display: inline-flex;
            flex-direction: column;
            position: relative;
            width: 220px;
            min-height: 72px;
            flex-shrink: 0;
            background: #fff;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
                .close {
                    display:block;
                }
                .editable-title {
                    border-bottom: 1px dashed #fff;      
                }
                &::after {
                    border: 1px solid #3296fa;
                    box-shadow: 0 0 6px 0 rgba(50,150,250,.3);
                }
            }
            &::before{
                content: "";
                position: absolute;
                top: -12px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 4px;
                border-style: solid;
                border-width: 8px 6px 4px;
                border-color: #cacaca transparent transparent;
                background: #f5f5f7; //背景色
            }
            &::after{
                pointer-events: none;
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 2;
                border-radius: 4px;
                border: 1px solid transparent;
                transition: all .1s ease-out;
                box-shadow: 0 2px 5px 0 rgba(0,0,0,.1);
            }
            .title {
                position: relative;
                display: flex;
                align-items: center;
                padding-left: 16px;
                padding-right: 30px;
                width: 100%;
                height: 24px;
                line-height: 24px;
                font-size: 12px;
                color: #fff;
                text-align: left;
                background: #ff943e;
                border-radius: 4px 4px 0 0;
                .el-icon-user-solid {
                    font-size: 12px;
                    margin-right: 5px;
                }
                input {
                    width:139px;
                    height: 20px;
                    border-radius: 4px;
                    border: 1px solid #DCDFE6;
                    padding: 2px 5px;
                }
            }
            .content {
                position: relative;
                font-size: 14px;
                padding: 16px;
                padding-right: 30px; 
                .text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                }
                .el-icon-arrow-right {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 14px;
                    font-size: 14px;
                    color: #979797;
                }
            }
            .close {
                display:none;
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: 20px;
                font-size: 14px;
                color: #fff;
                border-radius: 50%;
                text-align: center;
                line-height: 20px;
            }
        }
        .start-node .content .text {
            display: block;
            white-space: nowrap;
        }
    }
    .add-node-btn-box {
        width: 240px;
        display: inline-flex;
        flex-shrink: 0;
        position: relative;
        &::before{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 2px;
            height: 100%;
            background-color: #cacaca;
        }
    }
    .node-wrap-box.start-node {
        &::before{
            content: none;
        }
        .title {
            background: #576a95;
        }
    }
    .branch-wrap {
        display: inline-flex;
        width: 100%;
    }
    .branch-box-wrap {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        min-height: 270px;
        width: 100%;
        flex-shrink: 0;
    }
    .branch-box {
        display: flex;
        overflow: visible;
        min-height: 180px;
        height: auto;
        border-bottom: 2px solid #ccc;
        border-top: 2px solid #ccc;
        position: relative;
        margin-top: 15px;
        .column—box {
            background: #f5f5f7;//背景色
            &::before{
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 0;
                margin: auto;
                width: 2px;
                height: 100%;
                background-color: #cacaca;
            }
        }
    }
    .column—box {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        position: relative; 
    }
    .add-branch {
        border: none;
        outline: none;
        user-select: none;
        justify-content: center;
        font-size: 12px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        color: #3296fa;
        background: #f5f5f7;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
        position: absolute;
        top: -16px;
        left: 50%;
        transform: translateX(-50%);
        transform-origin: center center;
        cursor: pointer;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        transition: all .3s ease-out;
        &:hover {
            transform: translateX(-50%) scale(1.1);
            box-shadow: 0 8px 16px 0 rgba(0,0,0,.1);
        }
    }
    .add-node-btn {
        user-select: none;
        width: 240px;
        padding: 20px 0 32px;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        flex-shrink: 0;
        -webkit-box-flex: 1;
        flex-grow: 1;
        .btn {
            cursor: pointer;
            outline: none;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
            width: 30px;
            height: 30px;
            background: #3296fa;
            border-radius: 50%;
            position: relative;
            border: none;
            line-height: 30px;
            transition: all .3s ease-out;
            .el-icon-plus {
                color: #fff;
                font-size: 16px;
            }
            &:hover {
                transform: scale(1.3);
                box-shadow: 0 13px 27px 0 rgba(0,0,0,.1);
            }
        }
    }
    .top-left-cover-line, .top-right-cover-line {
        position: absolute;
        height: 3px;
        width: 50%;
        background-color: #f5f5f7;//背景色
        top: -2px;
    }
    .top-left-cover-line,.bottom-left-cover-line{
        left: -1px;
    }
    .top-right-cover-line,.bottom-right-cover-line{
        right: -1px;
    }
    .bottom-left-cover-line, .bottom-right-cover-line {
        position: absolute;
        height: 3px;
        width: 50%;
        background-color: #f5f5f7;//背景色
        bottom: -2px;
    }
    .condition-node {
        display: inline-flex;
        flex-direction: column;
        min-height: 220px;
    }
    .condition-node-box {
        display: inline-flex;
        flex-direction: column;
        padding-top: 30px;
        padding-right: 50px;
        padding-left: 50px;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        position: relative;
        &::before{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 2px;
            height: 100%;
            background-color: #cacaca;
        }
    }
    .auto-judge {
        position: relative;
        width: 220px;
        min-height: 72px;
        background: #fff;
        border-radius: 4px;
        padding: 14px 19px;
        cursor: pointer;
        &:hover {
            .close {
                display:block;
            }
            .title-wrapper {
                .editable-title {
                    border-bottom: 1px dashed #15bc83;      
                }
            }
            &::after{
                border: 1px solid #3296fa;
                box-shadow: 0 0 6px 0 rgba(50,150,250,.3);
            }
        }
        &::after {
            pointer-events: none;
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
            border-radius: 4px;
            border: 1px solid transparent;
            transition: all .1s ease-out;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.1); 
        }
        .title-wrapper {
            position: relative;
            font-size: 12px;
            color: #15bc83;
            text-align: left;
            line-height: 16px;
            .editable-title {
                display: inline-block;
                max-width: 120px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            input {
                width:110px;
                height: 20px;
                border-radius: 4px;
                border: 1px solid #DCDFE6;
                padding: 2px 5px;
            }
            .priority-title {
                display: inline-block;
                float: right;
                margin-right: 10px;
                color: rgba(25,31,37,.56);
            }
        }
        .close{
            display:none;
            position: absolute;
            right: -10px;
            top: -10px;
            width: 20px;
            height: 20px;
            font-size: 14px;
            color: rgba(0,0,0,.25);
            border-radius: 50%;
            text-align: center;
            line-height: 20px;
            z-index: 2;
        }
    } 
}
.work-flow-add-node-body {
    display: flex;
    width: 300px;
    min-height: 160px;
    align-items: center;
    .add-node-item {
        cursor: pointer;
        text-align: center;
        flex: 1;
        color: #333;
        .node-item-wrapper {
            user-select: none;
            display: inline-block;
            width: 80px;
            height: 80px;
            margin-bottom: 5px;
            background: #fff;
            border: 1px solid #e2e2e2;
            border-radius: 50%;
            transition: all .3s ease-out;
            i{
                font-size: 35px;
                line-height: 80px;
            }
            .el-icon-user-solid {
                color:#ff943e
            }
            .el-icon-s-promotion {
                color:#3296fa
            }
            .icon-unit {
                color:#15bc83;
                font-size: 30px;
            }
        }
        &:hover {
            outline: 0;
            .node-item-wrapper {
                background: #3296fa;
                box-shadow: 0 10px 20px 0 rgba(50,150,250,.4);
                i {
                    color:#fff;
                }
            }
        }
    }
}
.workflow-end-node {
    display:flex;
    justify-content:center;
    font-size:14px;
    color:#999;
    .end-node-text{
        text-align: center;
        width: 70px;
        height: 70px;
        border: 2px solid #909399;
        line-height: 66px;
        border-radius: 50%;
    }
}
</style>

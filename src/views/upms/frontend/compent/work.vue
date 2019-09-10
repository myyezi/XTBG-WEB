<template>
    <!-- <div class="work-flow-item"> -->
        <!-- 判断流程是否是分支，是的话循环分支内部节点 -->
        <!-- <div v-if="workData.type == 2" class="work-flow-conditionNodes">
            <work-item v-if="workData.nextNode" :workData="workData.nextNode"></work-item>
        </div> -->
        <!-- item 主体开始 -->
        <!-- <work-item :workData="workData"></work-item> -->
        <!-- item 主体结束 -->
        <!-- 判断流程是否存在nextNode，如果有则去递归，没有就结束 -->
        <!-- <work-item :workData="workData.childNode" v-if="workData.childNode"></work-item> -->
        <work v-if="workData.childNode&&JSON.stringify(workData.childNode) !== '{}'" :workData="workData.childNode">
            <work-item :workData="workData.childNode"></work-item>
        </work>
    <!-- </div> -->
</template>
<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    import workItem from './workItem'
    export default {
        name: 'work',
        components: {workItem},
        mixins: [tool, ruleTool],
        props: ['workData'],
        data() {
            return {
            }
        },
        mounted() {
            console.log(typeof this.workData.childNode)
        },
        methods: {
            
        }
    }
</script>
<style lang="scss">
.work-flow-item{
    width: 100%;
    // height:800px;
    // padding: 50px 0;
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
                background: #fff;
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
                transition: all .1s cubic-bezier(.645,.045,.355,1);
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
        }
        .start-node .content .text {
            display: block;
            white-space: nowrap;
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
        transition: all .3s cubic-bezier(.645,.045,.355,1);
    }
    .column—box {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        position: relative;
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
            outline: none;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
            width: 30px;
            height: 30px;
            background: #3296fa;
            border-radius: 50%;
            position: relative;
            border: none;
            line-height: 30px;
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            .el-icon-plus {
                color: #fff;
                font-size: 16px;
            }
        }
    }
    .top-left-cover-line, .top-right-cover-line {
        position: absolute;
        height: 3px;
        width: 50%;
        background-color: #fff;
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
        background-color: #fff;
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
            transition: all .1s cubic-bezier(.645,.045,.355,1);
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.1); 
        }
    }
}
</style>

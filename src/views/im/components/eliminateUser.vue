<template>
    <div>
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="userName" class="im_chat_group_input"></el-input>
        <div class="transfer_group_count">
            <el-checkbox-group v-model="checkList" v-if="groupUserListCopy.length>0">
                <el-checkbox :label="item.memberId" v-for="(item,index) in groupUserListCopy" :key="index" class="li_user" v-if="item.memberId != chat.owner">
                    <img :src="item.portrait?item.portrait:defaultPic"/>
                    <span>{{item.alias}}</span>
                </el-checkbox>
            </el-checkbox-group>
            <div v-else class="no_groupUser">
                暂无该成员
            </div>
        </div>
        <div class="clearfix transfer_group_footer">
            <el-button size="small" @click="back" style="float:left">取消</el-button>
            <el-button size="small" type="primary" @click="onSubmit()" style="float:left" :disabled="checkList.length<1">剔除</el-button>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import Bus from "@/utils/eventBus.js";
    import ajax from '@/utils/request'
    const {ChatListUtils } = require('../../../utils/imUtils/ChatUtils');
    export default {
        props: ['chat','groupUserList'],
        data() {
            return {
                groupUser:'',
                checkList:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                defaultPic:require('@/styles/img/morentx.png'),
                groupForm:{
                    name:''
                },
                imageUrl: '',
                accept:"png,jpg,jpeg,gif",
                groupUserLists:this.groupUserList,
                groupUserListCopy:[],
                userName:'',
            };
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        watch: {
            userName:function(newvalue,oldvalue) { 
                if (newvalue) { 
                    this.groupUserListCopy = this.groupUserLists.filter((item) => {
                        return item.alias.indexOf(newvalue)>-1
                    })
                } else {
                    this.groupUserLists = Object.assign([],this.groupUserList);
                    this.groupUserListCopy = Object.assign([],this.groupUserLists);
                }
            }
        },
        created() {
            this.groupUserListCopy = Object.assign([],this.groupUserLists);
        },
        methods: {
            back() {
                this.$emit('close-add-user')
            },
            onSubmit() {
                let userNameString = ''
                this.groupUserListCopy.forEach((item)=>{
                    this.checkList.forEach((items)=>{
                        if(items == item.memberId) {
                            userNameString += item.alias+','
                        }
                    })
                })
                this.$confirm('是否移除选中群成员?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let groupId = ''
                    let notifyContent = {
                        type:1,
                        content:this.user.name+'将' + userNameString +'移除了群聊',
                        pushContent:this.user.name+'将' + userNameString +'移除了群聊',
                    }
                    let obj ={
                        groupId:this.chat.targetId,
                        removedMemberList:this.checkList,
                        notifyContent:notifyContent
                    }
                    let objArr = {
                        obj:obj,
                        subTopic:'GKM'
                    }
                    this.$store.commit('sendMessage', objArr);
                    let arr =[]
                    this.groupUserList.forEach((item)=>{
                        let flag = false
                        this.checkList.forEach((items)=>{
                            if(items==item.memberId){
                                flag = true
                            }
                        })
                        if(!flag) {
                            arr.push(item)
                        }
                    })
                    this.groupUserListCopy = arr
                    this.$emit('close-add-user',{
                        groupMembers:this.groupUserListCopy,
                        type:2
                    })
                }).catch(() => {
                });
            },
        }
    };
</script>
<style lang="scss">
    .transfer_group_count {
        height: 500px;
        overflow: auto;
        margin-top: 20px;
        .li_user {
            width: 500px;
            height:50px;
            line-height:50px;
            img {
                width:36px;
                height:36px;
                vertical-align: middle;
            }
        }
        .no_groupUser {
            text-align: center;
            height:60px;
            line-height:60px;
        }
    }
    .transfer_group_footer {
        width:125px;
        margin:20px auto 0
    }
</style>

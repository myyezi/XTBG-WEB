<template>
    <div>
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="groupUser" class="im_chat_group_input"></el-input>
        <div class="transfer_group_count">
            <el-checkbox-group v-model="checkList" @change="handleCheckChange">
                <el-checkbox :label="item.memberId" v-for="(item,index) in groupUserList" :key="index" class="li_user" v-if="item.memberId != chat.owner">
                    <img :src="item.portrait?item.portrait:defaultPic"/>
                    <span>{{item.alias}}</span>
                </el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="clearfix transfer_group_footer">
            <el-button size="small" @click="back" style="float:left">取消</el-button>
            <el-button size="small" type="primary" @click="onSubmit()" style="float:left" :disabled="checkList.length<1">转移</el-button>
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
                accept:"png,jpg,jpeg,gif"
            };
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        watch: {
            groupUser(val) {
                this.$refs.tree.filter(val);
            }
        },
        created() {
        },
        methods: {
            handleCheckChange(val) {
                if(val[val.length-1]) {
                    this.checkList = [val[val.length-1]]
                } else {
                    this.checkList = []
                }
            },
            back() {
                this.$emit('close-add-user')
            },
            onSubmit() {
                let userNameString = ''
                this.groupUserList.forEach((item)=>{
                    if(this.checkList[0] == item.memberId) {
                        userNameString = item.alias
                    }
                })
                this.$confirm('是否转移该群给'+userNameString+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let groupId = ''
                    let notifyContent = {
                        type:1,
                        content:this.user.name+'将群转移给了' + userNameString,
                        pushContent:this.user.name+'将群转移给了' + userNameString, 
                    }
                    let obj ={
                        groupId:this.chat.targetId,
                        newOwner:this.checkList[0],
                        notifyContent:notifyContent
                    }
                    let objArr = {
                        obj:obj,
                        subTopic:'GTG'
                    }
                    console.log(objArr)
                    this.$store.commit('sendMessage', objArr);
                    this.groupUserList.forEach((item)=>{
                        if(item.type=2) {
                            item.type=0
                        }
                        if(this.checkList[0] == item.memberId) {
                            item.type=2
                        }
                    })
                    this.updateSession()
                }).catch(() => {
                });
            },
            updateSession() {
                let groupList = ChatListUtils.getGroupList(this.user.userId)
                let sessionList = ChatListUtils.getSessionList(this.user.userId)
                groupList.forEach((item)=>{
                    if(this.chat.targetId == item.targetId) {
                        item.owner = this.checkList[0]
                    }
                })
                sessionList.forEach((item)=>{
                    if(this.chat.targetId == item.targetId) {
                        item.owner = this.checkList[0]
                    }
                })
                ChatListUtils.setGroupList(this.user.userId, groupList);
                ChatListUtils.setSessionList(this.user.userId, sessionList);
                this.$emit('close-add-user')
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
    }
    .transfer_group_footer {
        width:125px;
        margin:20px auto 0
    }
</style>

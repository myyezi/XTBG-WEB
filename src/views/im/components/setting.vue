<template>
    <div class="im_chat_setting_count" @click="showEdit=false" v-loading="loading">
        <div class="im_chat_setting_title clearfix">
            <div class="im_chat_setting_title_left">
                <img :src="chats.portrait?chats.portrait:defaultPic" v-if="chats.owner != this.user.userId"/>
                <el-upload
                    v-else
                    :action="uploadUrl"
                    :headers="headers"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img  :src="chats.portrait?chats.portrait:defaultPic">
                </el-upload>
            </div>
            <div class="im_chat_setting_title_right clearfix">
                <span v-if="!showEdit">{{chats.targetName}}</span>
                <input v-else v-model="chats.targetName" @click.stop=''/>
                <!-- <span>内部群</span> -->
                <i class="el-icon-edit" title="编辑群名称" @click.stop="showEdit=!showEdit" v-if="chats.owner == this.user.userId"></i>
            </div>
        </div>
        <div class="im_chat_setting_user">
            <div class="setting_user_title clearfix">
                <span>群成员{{groupUserLists.length}}人</span>
                <el-input style="width: 399px;;margin-left:20px" suffix-icon="el-icon-search" placeholder="请输入成员名称" v-model="userName"></el-input>
                <i class="el-icon-plus" @click="showAddUser = true"></i> 
            </div>
            <ul v-if="groupUserListSearch.length>0" class="clearfix">
                <li v-for="(item,index) in groupUserListCopy" :key="index" :title="item.type == 2?'群主':item.type == 1?'管理员':''">
                    <img :src="item.portrait?item.portrait:defaultPic"/>
                    <i class="icon-qunzhu" v-if="item.type == 2"></i>
                    <i class="icon-qunzhu" v-if="item.type == 1" style="color:#67c23a"></i>
                    <p>{{item.alias}}</p>
                </li>
            </ul>
            <div v-else class="no_groupUser">
                暂无该成员
            </div>
            <div class="check_more" v-if="groupUserListSearch.length>10" @click="checkMore">{{showText}}</div>
        </div>
        <div class="im_chat_setting_operation">
            <ul>
                <!-- <li class="clearfix">
                    <span>清空聊天记录</span>
                    <i class="el-icon-arrow-right"></i>
                </li> -->
                <li class="clearfix" @click="dissolutionGroup">
                    <span v-if="user.userId == chats.owner">解散群聊</span>
                    <span v-else>退出群聊</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="clearfix" @click="transferGroup" v-if="user.userId == chats.owner">
                    <span>转移群聊</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="clearfix" @click="eliminateUser" v-if="user.userId == chats.owner">
                    <span>剔除成员</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
            </ul>
        </div>
        <el-dialog :visible.sync="showAddUser" width="600px"  top="calc((100vh - 716px)/2)"  :close-on-press-escape="false" :append-to-body="true" :modal="false" class="im_chat_add_user">
            <div slot="title">
                <span > 选择联系人 </span>
            </div>
            <add-user @close-add-user="closeAddUser" :groupUserList="groupUserLists" :chat="chats" v-if="showAddUser"></add-user>
        </el-dialog>
        <el-dialog :visible.sync="showTransferUser" width="600px"  top="calc((100vh - 716px)/2)"  :close-on-press-escape="false" :append-to-body="true" :modal="false" class="im_chat_add_user">
            <div slot="title">
                <span > 转移群聊 </span>
            </div>
            <transfer-group @close-add-user="closeAddUser" :groupUserList="groupUserLists" :chat="chats" v-if="showTransferUser"></transfer-group>
        </el-dialog>
        <el-dialog :visible.sync="showEliminateUser" width="600px"  top="calc((100vh - 716px)/2)"  :close-on-press-escape="false" :append-to-body="true" :modal="false" class="im_chat_add_user">
            <div slot="title">
                <span > 剔除群成员 </span>
            </div>
            <eliminate-user @close-add-user="closeAddUser" :groupUserList="groupUserLists" :chat="chats" v-if="showEliminateUser"></eliminate-user>
        </el-dialog>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import addUser from '../components/addUser.vue';
    import transferGroup from '../components/transferGroup.vue';
    import eliminateUser from '../components/eliminateUser.vue';
    import Bus from "@/utils/eventBus.js";
    const { ChatListUtils } = require('../../../utils/imUtils/ChatUtils');
    export default {
        props: ['chat','groupUserList'],
        components: {
            addUser,
            transferGroup,
            eliminateUser
        },
        data() {
        return {
            uploadUrl: process.env.BASE_API + "file/upload/multipart",
            headers:{
                "Authorization": 'Bearer ' + this.$store.getters.token
            },
            defaultPic:require('@/styles/img/morentx.png'),
            groupUserListSearch: [],
            groupUserListSearchCopy:[],
            groupUserListCopy:[],
            groupUserLists:this.groupUserList,
            chats:this.chat,
            targetName:this.chat.targetName,
            userName:'',
            showText:'展开更多',
            showAddUser:false,
            showTransferUser:false,
            showEliminateUser:false,
            showEdit:false,
            loading: false,
        };
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        watch: {
            userName:function(newvalue,oldvalue) {
                if (!newvalue) {
                    this.groupUserListSearch = this.groupUserListSearchCopy
                    if(this.showText == '展开更多') {
                        this.groupUserListCopy = this.groupUserListSearch.slice(0,10)
                    } else {
                        this.groupUserListCopy = this.groupUserListSearch.slice(0,this.groupUserListSearch.length)
                    }
                    return true
                };
                this.groupUserListSearch = this.groupUserListSearchCopy.filter((item) => {
                    return item.alias.indexOf(newvalue)>-1
                })
                if(this.showText == '展开更多') {
                    this.groupUserListCopy = this.groupUserListSearch.slice(0,10)
                } else {
                    this.groupUserListCopy = this.groupUserListSearch.slice(0,this.groupUserListSearch.length)
                }
            },
            showEdit:function(newvalue,oldvalue) { 
                if(this.targetName != this.chats.targetName) {
                    this.targetName = this.chats.targetName
                    this.updateGroupInformation('GMI',1)
                }
            },
            showTransferUser:function(newvalue,oldvalue) { 
                if(!newvalue) {
                    let sessionList = ChatListUtils.getSessionList(this.user.userId)
                    sessionList.forEach(item => {
                        if(item.targetId == this.chat.targetId) {
                            this.chats = item
                        }
                    });
                }
            }
        },
        created() {
            this.groupUserListSearchCopy = Object.assign([],this.groupUserLists);
            this.groupUserListSearch = this.groupUserListSearchCopy 
            this.groupUserListCopy = this.groupUserListSearch.slice(0,10)
            console.log(this.chat)
        },
        methods: {
            // 上传群图像
            beforeAvatarUpload(file) {
                // 限制20M
                if(this.accept && this.accept.toLowerCase().indexOf(file.name.toLowerCase().split(".")[(file.name.toLowerCase().split(".").length - 1)]) == -1) {
                    this.$message("请上传 "+this.accept+" 的文件");
                    return false;
                } else if(file.size > 1024*1024*2){
                    this.$message("请上传2M以下的文件");
                    return false;
                }  else {
                    this.loading = true;
                    return true;
                }
            },
            // 上传头像成功
            handleAvatarSuccess(res, file) {
                this.loading = false;
                if(res.status == 0){
                    this.chats.portrait = res.data.filedomain + res.data.path
                    this.updateGroupInformation('GMI',2)
                }
            },
            // 展开收起
            checkMore() {
                if(this.showText == '展开更多') {
                    this.groupUserListCopy = this.groupUserListSearch.slice(0,this.groupUserListSearch.length)
                    this.showText = '收起'
                } else {
                    this.groupUserListCopy = this.groupUserListSearch.slice(0,10)
                    this.showText = '展开更多'
                }
            },
            closeAddUser(data) {
                if(data) {
                    this.userName = ''
                    if(data.type == 1) {
                        this.groupUserLists = this.groupUserLists.concat(data.groupMembers)
                    } else if(data.type == 2) {
                        this.groupUserLists = data.groupMembers
                    }
                    this.restGroupUserList()
                }
                this.showAddUser = false
                this.showTransferUser = false
                this.showEliminateUser = false
            }, 
            // 解散或者退出群聊
            dissolutionGroup() {
                let string =''
                let subTopic = ''
                if(this.user.userId == this.chats.owner) {
                    string = '解散'
                    subTopic = 'GD'
                } else {
                    string = '退出'
                    subTopic = 'GQ'
                }
                this.$confirm('是否'+string+'该群?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.updateGroupInformation(subTopic,3,string)
                    Bus.$emit("close-show");
                }).catch(() => {
                
                });
            },
            // 转移群聊
            transferGroup() {
                this.showTransferUser = true
            },
            // 剔除群成员
            eliminateUser() {
                this.showEliminateUser = true
            },
            // 更新群信息
            updateGroupInformation(subTopic,type,string) {
                let notifyContent = {
                    type:1
                }
                let obj ={
                    groupId:this.chats.targetId,
                }
                if(type == 1) {
                    notifyContent.content = this.user.name+'将群的名称修改为' + this.chats.targetName,
                    notifyContent.pushContent = this.user.name+'将群的名称修改为' + this.chats.targetName
                    obj.type = 0 // 0为修改名称，1为修改群头像
                    obj.value = this.chats.targetName
                } else if(type == 2) {
                    notifyContent.content = this.user.name+'修改了群聊头像',
                    notifyContent.pushContent = this.user.name+'修改了群聊头像'
                    obj.type = 1
                    obj.value = this.chats.portrait 
                } else if(type == 3) {
                    notifyContent.content = this.user.name+string+'了该群',
                    notifyContent.pushContent = this.user.name+string+'了该群'
                }
                obj.notifyContent = notifyContent
                let objArr = {
                    obj:obj,
                    subTopic:subTopic
                }
                console.log(objArr)
                this.$store.commit('sendMessage', objArr);
            },
            // 重置群成员列表
            restGroupUserList() {
                this.groupUserListSearchCopy = Object.assign([],this.groupUserLists);
                this.groupUserListSearch = this.groupUserListSearchCopy 
                this.groupUserListCopy  = this.groupUserListSearch.slice(0,10)
                this.showText = '展开更多'
            }
        }
    };
</script>
<style lang="scss">
    .im_chat_setting_count {
        padding: 0 30px 0 10px;
        .im_chat_setting_title {
            padding-bottom: 5px;
            border-bottom: 1px solid #ccc;
            .im_chat_setting_title_left {
                float: left;
                height:3rem;
                img {
                    width:3rem;
                    height:3rem;
                }
            }
            .im_chat_setting_title_right {
                float: left;
                margin: 5px 0 0 5px;
                span:nth-child(1) {
                    float: left;
                    font-size: 16px;
                    font-weight: bold;
                    height: 26px;
                    line-height: 26px;
                    margin-right: 5px;
                }
                span:nth-child(2) {
                    float: left;
                    font-size: 12px;
                    width: 45px;
                    height: 26px;
                    line-height: 24px;
                    border: 1px solid #2781de;
                    color: #2781de;
                    text-align: center;
                    border-radius: 5px;
                }
                input {
                    border: 1px solid #DCDFE6;
                    border-radius: 4px;
                    padding:5px;
                }
                .el-icon-edit {
                    cursor: pointer;
                    font-size: 16px;
                    margin: 5px 0 0 5px;
                }
            }
        }
        .im_chat_setting_user {
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
            .setting_user_title {
                margin-bottom: 10px;
                .el-icon-plus{
                    float: right;
                    font-size: 20px;
                    margin-top: 7px;
                    cursor: pointer;
                }
            }
            ul {
                max-height: 390px;
                overflow: auto;
                li {
                    float: left;
                    position: relative;
                    width:100px;
                    text-align: center;
                    margin-bottom: 15px;
                    img {
                        width:3rem;
                        height:3rem;
                        border-radius: 50%;
                    }
                    .icon-qunzhu{
                        position: absolute;
                        right: 20px;
                        top: 5px;
                        color: #409eff;
                    }
                }
            }
            .no_groupUser {
                text-align: center;
                height:60px;
                line-height:60px;
            }
            .check_more {
                text-align: center;
                color: #2781de;
                margin-top: 10px;
                cursor: pointer;
            }
        }
        .im_chat_setting_operation {
            ul {
                li {
                    height: 50px;
                    line-height: 50px;
                    border-bottom: 1px solid #ccc;
                    cursor: pointer;
                    span {
                        float: left;
                    }
                    i {
                        float: right;
                        font-size: 16px;
                        margin-top: 17px;
                    }
                }
            }
        }
    }
</style>

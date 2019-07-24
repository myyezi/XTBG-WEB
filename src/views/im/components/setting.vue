<template>
    <div class="im_chat_setting_count">
        <div class="im_chat_setting_title clearfix">
            <div class="im_chat_setting_title_left">
                <img :src="chat.portrait?chat.portrait:defaultPic"/>
            </div>
            <div class="im_chat_setting_title_right clearfix">
                <span>{{chat.targetName}}</span>
                <span>内部群</span>
            </div>
        </div>
        <div class="im_chat_setting_user">
            <div class="setting_user_title clearfix">
                <span>群成员{{groupUserList.length}}人</span>
                <el-input style="width: 360px;;margin-left:20px" suffix-icon="el-icon-search" placeholder="请输入成员名称" v-model="userName"></el-input>
                <i class="el-icon-plus" @click="showAddUser = true"></i> 
            </div>
            <ul v-if="groupUserListSearch.length>0" class="clearfix">
                <li v-for="(item,index) in groupUserListCopy" :key="index">
                      <img :src="item.portrait?item.portrait:defaultPic"/>
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
                    <span v-if="user.userId == chat.owner">解散群聊</span>
                    <span v-else>退出群聊</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="clearfix" @click="transferGroup">
                    <span v-if="user.userId == chat.owner">转移群聊</span>
                    <i class="el-icon-arrow-right"></i>
                </li>
            </ul>
        </div>
        <el-dialog :visible.sync="showAddUser" width="560px"  top="calc((100vh - 716px)/2)"  :close-on-press-escape="false" :append-to-body="true" :modal="false" class="im_chat_add_user">
            <div slot="title">
                <span > 选择联系人 </span>
            </div>
            <add-user @close-add-user="closeAddUser" :groupUserList="groupUserList" :chat="chat"></add-user>
        </el-dialog>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import addUser from '../components/addUser.vue';
  const { imageLoad, transform, ChatListUtils } = require('../../../utils/imUtils/ChatUtils');
  export default {
    props: ['chat','groupUserList'],
    components: {
        addUser
    },
    data() {
      return {
          defaultPic:require('@/styles/img/morentx.png'),
          groupUserListSearch: [],
          groupUserListSearchCopy:[],
          groupUserListCopy:[],
          userName:'',
          showText:'展开更多',
          showAddUser:false
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
    },
    created() {
        this.groupUserListSearchCopy = Object.assign([],this.groupUserList);
        this.groupUserListSearch = this.groupUserListSearchCopy 
        this.groupUserListCopy = this.groupUserListSearch.slice(0,10)
    },
    methods: {
        checkMore() {
            if(this.showText == '展开更多') {
                this.groupUserListCopy = this.groupUserListSearch.slice(0,this.groupUserListSearch.length)
                this.showText = '收起'
            } else {
                this.groupUserListCopy = this.groupUserListSearch.slice(0,10)
                this.showText = '展开更多'
            }
        },
        closeAddUser() {
            this.showAddUser = false
        }, 
        // 解散或者退出群聊
        dissolutionGroup() {

        },
         // 转移群聊
        transferGroup() {
            // let groupMembers = []
            // let userNameString = ''
            // this.seleteUserList.forEach((item)=>{
            //     let flag = false
            //     this.groupUserListCopy.forEach((items)=>{
            //         if(item.id == items.memberId) {
            //             flag = true
            //         }
            //     })
            //     if(!flag) {
            //         groupMembers.push({
            //             memberId:item.id,
            //             alias:item.name,
            //             type:1
            //         })
            //         userNameString += item.name +','
            //     }
            // })
            // let notifyContent = {
            //     type:1,
            //     content:this.user.name+'将群转移给了' + userNameString,
            //     pushContent:this.user.name+'拉取了'+ userNameString 
            // }
            // let obj ={
            //     groupId:this.chat.targetId,
            //     newOwner:groupMembers,
            //     notifyContent:notifyContent
            // }
            // let objArr = {
            //     obj:obj,
            //     subTopic:'GTG'
            // }
            // this.$store.commit('sendMessage', objArr);
        }
    }
  };
</script>
<style lang="scss">
    .im_chat_setting_count {
        padding-right: 20px;
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
                margin: 8px 0 0 5px;
                span:nth-child(1) {
                    float: left;
                    font-size: 16px;
                    font-weight: bold;
                    height: 20px;
                    line-height: 20px;
                    margin-right: 5px;
                }
                span:nth-child(2) {
                    float: left;
                    font-size: 12px;
                    width: 45px;
                    height: 20px;
                    line-height: 18px;
                    border: 1px solid #2781de;
                    color: #2781de;
                    text-align: center;
                    border-radius: 5px;
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
                    width:100px;
                    text-align: center;
                    margin-bottom: 15px;
                    img {
                        width:3rem;
                        height:3rem;
                    }
                    P {

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

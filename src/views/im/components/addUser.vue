<template>
    <div v-loading="loading">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="groupUser" class="im_chat_group_input"></el-input>
      <div class="clearfix" >
            <el-tree
              :data="userFriendList"
              show-checkbox
              default-expand-all
              :default-checked-keys = "seletedKeys"
              node-key="id"
              :filter-node-method="filterNode"
              ref="tree"
              class="user_tree"
              @check-change="handleCheckChange"
              :props="defaultProps">
              <span class="custom-tree-node clearfix" slot-scope="{ node, data }">
                  <img :src="data.portrait?data.portrait:defaultPic" v-if="data.type === 1">
                  <span>{{ node.label }}</span>
              </span>
          </el-tree>
      </div>
      <div class="clearfix im_chat_group_footer">
          <el-button size="small" @click="back" style="float:left">取消</el-button>
          <el-button size="small" style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF;float:left" @click="onSubmit('groupForm')"  :disabled="seleteUserList.length<=groupUserListCopy.length">新增</el-button>
      </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Bus from "@/utils/eventBus.js";
  import ajax from '@/utils/request'
  const {ChatListUtils } = require('../../../utils/imUtils/ChatUtils');
  export default {
    props: ['groupUserList','chat'],
    data() {
      return {
          groupUser:'',
          userFriendList:[],
          seleteUserList:[],
          groupUserListCopy:[],
          seletedKeys:[],
          defaultProps: {
              children: 'children',
              label: 'name'
          },
          loading: true,
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
        this.groupUserListCopy = Object.assign([],this.groupUserList);
        this.getAllOrganization()
    },
    methods: {
        handleCheckChange(data, checked, indeterminate) {
            let objArr = this.$refs.tree.getCheckedNodes()
            this.seleteUserList = objArr.filter((item)=> {
                return item.type === 1
            })
        },
        back() {
            this.$emit('close-add-user')
        },
        onSubmit() {
            let groupMembers = []
            let userNameString = ''
            let memberIdArr = []
            this.seleteUserList.forEach((item)=>{
                let flag = false
                this.groupUserListCopy.forEach((items)=>{
                    if(item.id == items.memberId) {
                        flag = true
                    }
                })
                if(!flag) {
                    if(memberIdArr.indexOf(item.id)<0) {
                        memberIdArr.push(item.id)
                        groupMembers.push({
                            memberId:item.id,
                            alias:item.name,
                            type:0
                        })
                        userNameString += item.name +','
                    }
                }
            })
            let notifyContent = {
                type:1,
                content:this.user.name+'拉取了' + userNameString.substring(0,userNameString.length-1)  + '进群',
                pushContent:this.user.name+'拉取了'+ userNameString.substring(0,userNameString.length-1) + '进群',
            }
            let obj ={
                groupId:this.chat.targetId,
                groupMembers:groupMembers,
                notifyContent:notifyContent
            }
            let objArr = {
                obj:obj,
                subTopic:'GAM'
            }
            this.$store.commit('sendMessage', objArr);
            this.$emit('close-add-user',{
                groupMembers:groupMembers,
                type:1
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        getAllOrganization() {
            ajax.get('/upms/organization/orgUserTree/').then(rs => {
                if(rs.status === 0) {
                    this.userFriendList = rs.data
                    this.groupUserListCopy.forEach((item)=>{
                        this.seletedKeys.push(item.memberId)
                        this.getDisabledData(item.memberId,this.userFriendList)
                    })
                    console.log(this.userFriendList)
                    this.loading = false
                }
            });
        },
        getDisabledData(id,data) {
            data.forEach((item)=>{
                if(item.id == id) {
                    item.disabled = true
                } else {
                    if(item.children&&item.children.length>0) {
                        this.getDisabledData(id,item.children)
                    }
                }
            })
        }
    }
  };
</script>
<style lang="scss">
    .user_tree {
      margin: 20px auto 0;
      height: 500px;
      overflow: auto;
      .el-tree-node__content {
        height:30px
      }
      .custom-tree-node{
          img {
            float:left;
            width:26px;
            height:26px;
            margin-right:5px;
            border-radius: 50%;
          }
          span {
            float:left;
            height: 26px;
            line-height: 26px;
          }
      }
    }
    .im_chat_group_footer {
      width:125px;
      margin:20px auto 0
    }
</style>

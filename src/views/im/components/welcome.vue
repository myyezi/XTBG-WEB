<template>
    <div class="welcome-message" v-if="chatObj&&JSON.stringify(chatObj) !== '{}'">
        <div class="im-chat—detail-top" >
            <span>{{ chatObj.name }}</span>
        </div>
        <div v-if="chatObj.type === 0" v-loading="loading">
            <el-tree 
                :data="userFriendList" 
                :props="defaultProps" 
                default-expand-all
                @node-click="handleNodeClick" 
                :filter-node-method="filterNode"
                ref="tree"
                class="user_tree">
                <span class="custom-tree-node clearfix" slot-scope="{ node, data }">
                    <img :src="chatObj.portrait?chatObj.portrait:defaultPic" v-if="data.type === 1">
                    <span>{{ node.label }}</span>
                </span>
            </el-tree>
        </div>
        <div v-else style="height:calc(100% - 30px);padding-top: 100px;">
            <el-form  label-width="80px" style="width:200px;height:300px;margin:0 auto;">
                <div class="detail_pic"><img :src="chatObj.portrait?chatObj.portrait:defaultPic"></div>
                <el-form-item label="姓名:">
                  <span>{{chatObj.name}}</span>
                </el-form-item>
                <el-form-item label="手机号码:">
                  <span>{{chatObj.phone?chatObj.phone:'暂无'}}</span>
                </el-form-item>
                <el-form-item label="部门:">
                  <span>{{chatObj.userOrganizations?chatObj.userOrganizations:'暂无'}}</span>
                </el-form-item>
                <el-form-item label-width="30px" class="clearfix">
                  <el-button size="small" @click="back" style="margin:0 10px 0 0;float:left">返回</el-button>
                  <el-button size="small" type="primary" @click="onSubmit" style="float:left">发消息</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Bus from "@/utils/eventBus.js";
import ajax from '@/utils/request'
export default {
  name: 'welcome',
  props: ['chat'],
  data() {
      return {
        urseData:{},
        cacheSession:{},
        userFriendList: [],
        defaultProps: {
            children: 'children',
            label: 'name'
        },
        chatObj:this.chat,
        defaultPic:require('@/styles/img/morentx.png'),
        loading: true
      };
  },
  computed: {
    ...mapGetters([
        'user',
    ])
  },
  watch: {
      chat: function(newvalue,oldvalue) {
          this.chatObj = newvalue
          if(newvalue.type === 0) {
              this.loading = true
              this.userFriendList = []
              this.getOrganization()
          }
      },
  },
  destroyed() {
      Bus.$off("sessione-updata")
  },
  created () {
    this.cacheSession = JSON.parse(localStorage.getItem(this.user.userId+'session'))
    if(this.chatObj&&this.chatObj.type === 0) {
        this.getOrganization()
    }
  },
  methods: {
    back() {
        this.chatObj = this.chat
    },
    handleNodeClick(data) {
        if(data.type!==0) {
            this.chatObj = data
            console.log(this.chatObj)
        }
    },
    filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
    },
    onSubmit() {
        let currentSession = {
          portrait: this.chatObj.portrait, // 接收人头像
          targetId: this.chatObj.id, //接收人id
          targetName:this.chatObj.name, //接收人名称
          type: 1, //消息类别 1、单聊 2、群聊
          content: {
            type:0, //发送信息类型 1、文本 2、语音 3、图片 4、定位 5、文件 6、视频
            content:'' // 发送消息内容
          },
        };
        this.$store.commit('addSession', currentSession);
        Bus.$emit("sessione-updata",{targetId:this.chatObj.id}); 
    },
    // 根据组织得到用户
    getOrganization() {
        ajax.get('/upms/organization/orgUserTree/'+this.chatObj.id).then(rs => {
            if(rs.status === 0) {
                this.userFriendList = rs.data
                this.loading = false
            }
        });
    }
  }
};
</script>

<style lang="scss">
.welcome-message {
    height: calc(100% - 48px);
    margin-top: 48px;
    .im-chat—detail-top {
        border-bottom: 1px solid #cccccc;
        color: #666666;
        padding: 0 0 0 10px;
        font-size: 1.6rem;
        font-weight: bold;
        height: 33px;
    }
    .detail_pic {
        text-align: center;
        margin-bottom: 20px;
        img {
          width:3rem;
          height:3rem;
        }
    }
    .user_tree {
        background: #f8f8f8;
        padding-top: 20px;
        margin: 0 auto;
        height: 520px;
        width: 300px;
        overflow: auto;
        .custom-tree-node{
            img {
              float:left;
              width:26px;
              height:26px;
              margin-right:5px;
            }
            span {
              float:left;
              height: 26px;
              line-height: 26px;
            }
        }
    }
}
</style>

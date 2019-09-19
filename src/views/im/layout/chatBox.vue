<template>
  <div class="chat-panel">
    <div class="chat-box-list">
      <div class="search-box-content clearfix">
          <el-input v-model="filterText" placeholder="搜索" size="small" class="search-box" clearable></el-input>
          <i class="el-icon-circle-plus-outline" @click="addGroup"></i>
      </div>
      <div class="net_eror" v-if="netStaus" @click="updateNet"><i class="el-icon-refresh"></i>网络链接断开！请点击刷新网络</div>
      <div class="group-box">
        <ul class="user-list">
          <li class="user" :class="{'user_active':chat.active}" v-for="(chat,index) in sessionListCopy" :key="index" @click="showChat(chat)" @contextmenu.prevent="rightEvent(chat,$event)">
            <a href="javascript:" :class="currentChat&&currentChat.targetId===chat.targetId?'active':''">
              <i v-if="chat.unReadCount&&chat.unReadCount>0" class="un_read_count">{{ chat.unReadCount }}</i>
              <i class="icon-qun1 group_identification" v-if="chat.type==1"></i>
              <img :src="chat.portrait?chat.portrait:defaultPic">
              <b>{{ chat.targetName?chat.targetName:'test' }}</b>
              <span>{{ chat.serverTimestamp?dateStr(chat.serverTimestamp):''}}</span>
              <p v-html="chat.content.content?transform(chat.content.content):''"></p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="chat-box">
      <Top></Top>
      <UserChat :chat="currentChat" :chatDialogVisible="chatDialogVisible"></UserChat>
    </div>
    <ul v-show="visibleBox" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
        <li @click.stop="deleteCurrent">删除当前</li>
        <li @click.stop="deleteAll">删除全部</li>
    </ul>
    <el-dialog :visible.sync="showAddGroup" width="640px"  top="calc((100vh - 716px)/2)"  :close-on-press-escape="false" :append-to-body="true" :modal="false" class="im_chat_add_group">
        <div slot="title" class="im_chat_record_title clearfix">
          <span > 创建群组 </span>
        </div>
        <add-group @close-add-group="closeAddGroup" v-if="showAddGroup"></add-group>
    </el-dialog>
  </div>
</template>
<script>
import {getToken} from '@/utils/cookie' // 验权
import {mapGetters} from 'vuex'
import Top from '../components/top.vue';
import UserChat from '../components/chat.vue';
import addGroup from '../components/addGroup.vue';
import Bus from "@/utils/eventBus.js";
import { ChatListUtils, imageLoad ,transform} from '@/utils/imUtils/ChatUtils';

export default {
  components: {
    Top,
    UserChat,
    addGroup
  },
  props:['chatDialogVisible'],
  data() {
    return {
      // netStaus:true,
      visibleBox:false,
      showAddGroup:false,
      filterText: '',
      currentChat:{},
      rightSeleteChat:[],
      top: 0,
      left: 0,
      defaultPic:require('@/styles/img/morentx.png'),
      transform:transform,
      sessionListCopy:[]
    };
  },
  watch:{
      filterText:function(newvalue,oldvalue) {
        if(newvalue) {
            let arr = []
            if(this.sessionList&&this.sessionList.length>0) {
                this.sessionList.forEach((item,index)=>{
                  if(item.targetName.indexOf(newvalue)>=0 || item.content.content.indexOf(newvalue)>=0) {
                      arr.push(item)
                  }
                })
            }
            this.sessionListCopy = arr
        } else {
            this.sessionListCopy = this.sessionList
        }
      },
      sessionList :function(newvalue,oldvalue) {
        if(!newvalue||newvalue.length==0) {
            this.sessionListCopy = []
            this.currentChat = {}
        } else {
          if(newvalue.length != oldvalue.length) {
              this.visibleBox = false
              this.getSessionList()
          } else {
            let arr = []
            if(newvalue&&newvalue.length>0) {
                newvalue.forEach((item,index)=>{
                  if(item.targetName.indexOf(this.filterText)>=0 || item.content.content.indexOf(this.filterText)>=0) {
                      arr.push(item)
                  }
                })
            }
            this.sessionListCopy = arr
          }
        }
      },
  },
  computed: {
    ...mapGetters([
        'user',
    ]),
    sessionList: {
      get: function() {
        return this.$store.state.im.sessionList;
      },
      set: function(sessionList) {
        this.$store.commit('setSessionList', sessionList);
      }
    },
    netStaus: {
      get: function() {
        return this.$store.state.im.netStaus;
      },
      set: function(netStaus) {
        this.$store.commit('updateNet', netStaus);
      }
    }
  },
  methods: {
    updateNet() {
        this.$store.dispatch('getWebsocket', {
            ip: process.env.BASE_IP,
            port: process.env.BASE_HOST,
            token: getToken(),
            username: this.$store.state.user.user.userId
        })
    },
    closeAddGroup() {
        this.showAddGroup = false
    },
    // 添加群组
    addGroup() {
        this.showAddGroup = true
    },
    // 会话鼠标右键事件
    rightEvent(chat,e) {
      if(this.sessionList&&this.sessionList.length>0) {
        this.sessionList.forEach(items => {
          this.$set(items,'active',false);
        });
      }
      if(chat === 1) {
          this.visibleBox = false
      } else {
          const offsetLeft = this.$el.getBoundingClientRect().left
          const offsetTop = this.$el.getBoundingClientRect().top
          this.visibleBox = true
          this.rightSeleteChat = chat // 右键选中的会话
          this.$set(chat,'active',true);
          this.left = e.clientX - offsetLeft + 50
          this.top = e.clientY - offsetTop
      }
    },
    showChat(chat) {
      if(chat.type ==1) {
        let groupList = ChatListUtils.getGroupList(this.user.userId);
        let flag = false
        groupList.forEach((item)=>{
            if(item.targetId == chat.targetId) {
                flag = true
            }
        })
        if(flag) {
            this.currentChat = chat;
            this.currentChat.unReadCount = 0
            this.$store.commit('setReadCount', this.currentChat);
        } else {
            this.$confirm('你已不存在该群', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$store.commit('delSession', chat);
            }).catch(() => {
            });
        }
      } else {
        this.currentChat = chat;
        this.currentChat.unReadCount = 0
        this.$store.commit('setReadCount', this.currentChat);
      }
    },
    // 删除当前会话
    deleteCurrent() {
      this.$store.commit('delSession', this.rightSeleteChat);
      this.visibleBox = false
      this.getSessionList()
    },
    // 删除所有会话
    deleteAll() {
      this.$store.commit('delAllSession');
      this.visibleBox = false
      this.getSessionList()
    },
    // 得到会话列表
    getSessionList() {
      let self = this;
      let cacheSession = []
      self.filterText = ''
      // 从内存中获取会话记录
      cacheSession = self.$store.state.im.sessionList;
      if(!cacheSession||cacheSession.length === 0) {
        // 从缓存中取会话记录
        cacheSession = ChatListUtils.getSessionList(this.user.userId)
        if(cacheSession&&cacheSession.length>0) {
            self.$store.commit('setSessionList', cacheSession);
        }
      }
      self.sessionList = cacheSession
      self.sessionListCopy = self.sessionList
      if(self.sessionList&&self.sessionList.length>0) {
          let flag = false
          if(self.currentChat&&JSON.stringify(self.currentChat) !== '{}') {
              self.sessionList.forEach((item)=>{
                  if(item.targetId == self.currentChat.targetId) {
                      flag = true
                      self.currentChat = item
                      self.showChat(self.currentChat)
                      return
                  }
              })
          }
          if(!flag) {
              self.currentChat = self.sessionList[0]
              self.showChat(self.currentChat)
          }
      } else {
        self.currentChat = {}
      }
    }
  },
  created: function () {
      this.getSessionList()
  },
  mounted: function () {
    
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/imCss/theme";

.ivu-tabs-content {
  height: 100%;
}

.chat-panel {
  width: 26rem;
  background-color: $color-light-gray;
  height: 100%;
  display: flex;
  flex-direction: row;

  .chat-box {
    flex: 1;
    background-color: $color-box-bg;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .chat-box-list {
    height: 100%;
    width: 22rem;
    display: flex;
    flex-direction: column;
    .search-box-content {
      padding: 1.5rem 8px;
      width: 100%;
      .el-icon-circle-plus-outline {
          float:right;
          font-size: 2.5rem;
          margin: 3.5px 0 0 0;
          cursor: pointer;
      }
    }
    .net_eror {
      height: 30px;
      line-height: 30px;
      background: #f7d5a3;
      text-align: center;
      margin: 0 8px 5px;
      cursor: pointer;
      .el-icon-refresh {
        margin-right:5px;
      }
    }
    .search-box {
      width: calc(19rem - 16px);
      float:left;
    }
    .group-box {
      height: 100%;
      overflow-y: scroll;

      .user-list {
        width:22rem;
      }
      li {
        list-style: none;
        position: relative;
        font-size: 1.2rem;
        cursor: pointer;
        font-weight: 200;
        margin-bottom: 2rem;

        h5 {
          padding: 0.5rem 0;
          cursor: pointer;
          font-size: 1.3rem;
          font-weight: 200;

          i {
            vertical-align: baseline;
          }
        }

        img {
          width: 4.5rem;
          height: 4.5rem;
          position: absolute;
          top: 0.5rem;
          left: 2rem;
        }

        b {
          position: absolute;
          font-size: 1.3rem;
          left: 7.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 600;
          top: 0.6rem;
          white-space: nowrap;
          width: 6rem;
        }
        span {
          position: absolute;
          font-size: 1.3rem;
          right: 1.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 600;
          top: 0.6rem;
          color:#333;
        }
        p {
          position: absolute;
          left: 7.5rem;
          bottom: 0.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 75%;
          font-size: 1.1rem;
          color: #333;
          height:2rem;
          line-height: 2rem;
          display: flex;
        }
      }

      .user {
        margin: 0 8px;
        height: 5.5rem;
        position: relative;

        a {
          display: block;
          width: 100%;
          height: 100%;
          color: $color-default;
          position: relative;

          .un_read_count {
            display: inline-block;
            width: 1.6rem;
            height: 1.6rem;
            line-height: 1.6rem;
            font-size: 12px;
            background-color: #F56C6C;
            border-radius: 50%;
            color: #FFF;
            text-align: center;
            font-style: normal;
            position: absolute;
            left: 5.5rem;
            top: 0.1rem;
            z-index: 99999999999;
          }
          .group_identification {
              display: inline-block;
              width: 1.5rem;
              height: 1.5rem;
              font-size: 1.5rem;
              color: #e6a23c;
              position: absolute;
              top: 0.5rem;
              left: 0.3rem;
              z-index: 99999999999;
          }
          p {
            width: 12rem;
          }
        }

        &:hover {
          background-color: $color-gray !important;
          border-radius: 5px;

          & > i {
            color: $color-default;
            background-color: $color-write;
          }
        }

        .active {
          background-color: $color-gray !important;
          border-radius: 5px;
        }

        & > i {
          position: absolute;
          right: 1rem;
          bottom: 1.6rem;
          cursor: pointer;
          border-radius: 50%;
          padding: 0.2rem;
          text-align: center;
          color: $color-light-gray;

          &:hover {
            color: $color-default;
            background-color: $color-write;
          }
        }
      }
    }
  }
}
.contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
            background: #eee;
        }
    }
}
.user_active {
  border: 1px solid #a7a2a2;
  border-radius: 5px;
}
</style>

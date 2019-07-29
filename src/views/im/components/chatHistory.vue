<template>
    <div>
        <el-input placeholder="请输入聊天内容" prefix-icon="el-icon-search" v-model="chatRecord" class="im_chat_record_input"></el-input>
        <div class="im_chat_record" id="im_chat_record">
            <ul v-if="historyMessageList.length>0">
                <li v-for="(item,index) in historyMessageList" :key="index" class="clearfix">
                    <div class="im_chat_record_user_pic">
                      <img v-if="item.fromUserId == user.userId" :src="user.portrait?user.portrait:defaultPic"/>
                      <img v-else :src="chat.portrait?chat.portrait:defaultPic"/>
                    </div>
                    <div class="im_chat_record_user">
                        <p>{{ user.name }}<i>{{ item.serverTimestamp }}</i></p>
                        <div class="im_chat_record_text">
                          <pre v-html="item.content.content" v-on:click="openImageProxy($event)"></pre>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="im_chat_record_nodata" v-else>
              <i class="el-icon-tickets"></i>
              <p>暂无<span v-if="chatRecord">与"{{chatRecord}}"相关的</span>聊天记录</p>
            </div>
        </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  const { imageLoad, transform, ChatListUtils } = require('../../../utils/imUtils/ChatUtils');
  export default {
    props: ['messageList'],
    data() {
      return {
          defaultPic:require('@/styles/img/morentx.png'),
          historyMessageList: [],
          historyMessageListCopy:[],
          chatRecord:'',
      };
    },
    computed: {
      ...mapGetters([
          'user',
      ])
    },
    watch: {
        chatRecord:function(newvalue,oldvalue) {
          if (!newvalue) {
              this.historyMessageList = this.historyMessageListCopy
              this.$nextTick(() => {
                imageLoad('im_chat_record');
              });
              return true
          };
          this.updataCurrentMessageList(newvalue)
      },
    },
    created() {
      console.log(this.messageList)
        this.historyMessageListCopy = Object.assign([],this.messageList);
        this.historyMessageList = this.historyMessageListCopy
        this.$nextTick(() => {
          imageLoad('im_chat_record');
        });
    },
    methods: {
        updataCurrentMessageList(value) {
            this.historyMessageList = this.historyMessageListCopy.filter((item) => {
                return item.content.content.indexOf(value)>-1
            })
            this.$nextTick(() => {
              imageLoad('im_chat_record');
            });
        },
    }
  };
</script>
<style lang="scss">
    .im_chat_record_dialog {
      .el-dialog__body {
        padding:10px 0 20px 20px
      }
      .im_chat_record_input {
        margin-bottom:20px;
        padding-right:20px;
      }
    }
    .im_chat_record_title {
        line-height: 3.2rem;
        margin-top: -6px;
        img {
          float:left;
          width: 3.2rem;
          height: 3.2rem;
        }
        span {
          float:left;
          margin-left: 10px;
        }
    }
    .im_chat_record {
        width:100%;
        height:600px;
        overflow: auto;
        padding-right: 20px;
        ul {
          li {
            margin-top: 10px;
            .im_chat_record_user_pic {
                float:left;
                img {
                  width: 3.2rem;
                  height: 3.2rem;
                }
            }
            .im_chat_record_user {
                width:calc(100% - 3.5rem);
                float:left;
                border-bottom: 1px solid #d6cece;
                padding-bottom: 10px;
                margin-left: 0.3rem;
                p {
                    color:#999;
                    margin-top: 3px;
                    i {
                      float: right;
                    }
                }
                .im_chat_record_text {
                  color:#000;
                  margin-top: 10px;
                }
            }
          }
          li:nth-child(1) {
            margin-top: 0px;
          }
        }
        .im_chat_record_nodata {
          text-align: center;
          margin-top: 200px;
          i {
              font-size:64px;
          }
          p {
            height:30px;
            line-height:30px;
            margin-top: 10px;
          }
        }
    }
</style>

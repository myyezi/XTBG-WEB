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
                          <img class="message-img" v-if="item.content.type == 3" :src='JSON.parse(item.content.content).filedomain+JSON.parse(item.content.content).path' alt="消息图片不能加载"  @click="openImageProxy(item)">
                          <pre v-html="transform(item.content.content,item.content.type)" v-else></pre>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="im_chat_record_nodata" v-else>
              <i class="el-icon-tickets"></i>
              <p>暂无<span v-if="chatRecord">与"{{chatRecord}}"相关的</span>聊天记录</p>
            </div>
        </div>
        <!-- 大图预览 -->
        <img-previewer :list="previewerImgList" selector=".message-img" :options="options" @on-close="closePic" ref="previewer"></img-previewer>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import ImgPreviewer from '@/components/ImgPreviewer/index.js'
  const { imageLoad, transform, ChatListUtils } = require('../../../utils/imUtils/ChatUtils');
  export default {
    components: {ImgPreviewer},
    props: ['messageList','chat','messageImgList'],
    data() {
      return {
          defaultPic:require('@/styles/img/morentx.png'),
          historyMessageList: [],
          historyMessageListCopy:[],
          chatRecord:'',
          transform:transform,
          options: {
              shareEl: false,
              closeEl: true,
              fullscreenEl: false
          },
          previewerImgList:[],//预览的图片集合
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
        this.historyMessageListCopy = Object.assign([],this.messageList);
        this.historyMessageList = this.historyMessageListCopy
        this.$nextTick(() => {
          imageLoad('im_chat_record');
        });
    },
    methods: {
      // 更新历史消息
      updataCurrentMessageList(value) {
          this.historyMessageList = this.historyMessageListCopy.filter((item) => {
              return item.content.content.indexOf(value)>-1
          })
          this.$nextTick(() => {
            imageLoad('im_chat_record');
          });
      },
        // 图片预览
      openImageProxy: function(item) {
        let path = JSON.parse(item.content.content).filedomain+JSON.parse(item.content.content).path
        this.previewerImgList = Object.assign([], this.messageImgList) 
        this.messageImgList.forEach((item,index)=>{
            if(item.src == path) {
                this.$refs.previewer.curIndex = index
            }
        }) 
      },
      // 关闭预览
      closePic () {
          this.$emit && this.$emit("onClose")
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
                  img {
                      max-width: 20rem;
                      cursor: pointer;
                  }
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

<template>
  <div class="chat-panel">
    <div class="chat-scrollbar">
      <ul class="chat-info-list">
        <li class="chat-info" v-for="info in chatInfoList" :key="info.id">
          <a href="javascript:" @click="showChat(info)" :class="currentChat&&currentChat.id===info.id?'active':''">
            <i v-if="info.unReadCount>0">{{ info.unReadCount }}</i>
            <img :src="info.avatar" alt="头像">
            <b>{{ info.name }}</b>
            <p>{{ info.sign }}</p>
          </a>
          <Icon type="md-close" @click="delChat(chat)"></Icon>
        </li>
      </ul>
    </div>
    <div class="chat-main">
      <div class="chat-main-box messages">
        <ul>
          <li v-for="item in messageList" :class="{'chat-mine': item.mine}" :key="item.id">
            <div class="chat-user">
              <img :src="item.avatar" alt="头像">
              <cite v-if="item.mine"><i>{{ item.serverTimestamp }}</i>{{ item.username }}</cite>
              <cite v-if="!item.mine">{{ item.username }}<i>{{ item.serverTimestamp }}</i></cite>
            </div>
            <div class="chat-text">
              <pre v-html="item.content"></pre>
            </div>
          </li>
        </ul>
      </div>
      <div class="chat-main-footer">
        <div class="chat-footer-tool">
          <el-button size="mini" icon="el-icon-edit"></el-button>
        </div>
        <el-input type="textarea" rows="3" placeholder="请输入内容" resize="none" v-model="messageContent" maxlength="2000" show-word-limit @keyup.enter="mineSend()">
        </el-input>
        <div class="chat-send">
          <el-button @click="mineSend()">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChatPanel",
  data() {
    return {
      messageContent: "",
      chatInfoList: [
        {
          id: "1",
          unReadCount: 10,
          avatar: "../../../styles/img/skin_img2.png",
          sign: "ssssssss"
        },
        {
          id: "2",
          unReadCount: 10,
          avatar: null,
          sign: "ssssssss"
        },
        {
          id: "3",
          unReadCount: 10,
          avatar: null,
          sign: "ssssssss"
        }
      ],
      messageList: [
        {
          id: "1",
          avatar: "",
          mine: true,
          serverTimestamp: '2019-07-02 17:00',
          username: "xxx",
          content: "ssssssssssssss"
        },
        {
          id: "2",
          avatar: "",
          mine: false,
          serverTimestamp: '2019-07-02 17:10',
          username: "aaaa",
          content: "ssssssssssssss"
        }
      ]
    }
  }
}
</script>
<style scoped>
.chat-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.chat-panel .chat-scrollbar {
  height: 100%;
  min-height: 550px;
  width: 15rem;
  min-width: 15rem;
  display: flex;
  background: #f2f6fc;
  flex-direction: column;
}
.chat-panel .chat-main {
  flex: 1;
  display: flex;
  width: 15rem;
  flex-direction: column;
  position: relative;
}
.chat-main .chat-main-box {
  height: 100%;
  min-height: 400px;
}
.chat-main .chat-main-footer {
  height: 150px;
}
.chat-scrollbar .chat-info-list {
  margin: 0;
}
.chat-scrollbar .chat-info-list li {
  list-style: none;
  position: relative;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 200;
  margin-bottom: 0.1rem;
}
.chat-info {
  height: 3.5rem;
  position: relative;
}
.chat-info a {
  display: block;
  width: 100%;
  height: 100%;
  background: #e4e7ed;
  position: relative;
}
.chat-info a b {
  position: absolute;
  font-size: 1.3rem;
  left: 7.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  top: 0.6rem;
}

.chat-info a p {
  position: absolute;
  left: 7.5rem;
  bottom: 0.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 75%;
  font-size: 1.1rem;
  color: #aaaaaa;
}
.chat-info a i {
  display: inline-block;
  width: 1.4rem;
  height: 1.2rem;
  background-color: #ff0000;
  border-radius: 50%;
  text-align: center;
  font-style: normal;
  position: absolute;
  left: 2rem;
  top: 0;
  z-index: 9999;
}
.chat-info a p {
  width: 12rem;
}
.chat-info img,
.chat-main-box img {
  width: 52px;
  height: 52px;
  position: absolute;
  top: 1px;
  left: 5px;
}
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: row;
  height: calc(100% - 40px);
}
.chat-main .chat-main-box {
  flex: 1;
  padding-top: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.messages {
  width: 100%;
  height: calc(100% - 3rem);
  overflow-y: scroll;
}
.messages ul {
  width: 100%;
}
.messages ul li {
  position: relative;
  font-size: 0;
  margin-bottom: 10px;
  padding-left: 60px;
  min-height: 68px;
}
.messages ul li chat-text {
  position: relative;
  line-height: 22px;
  margin-top: 25px;
  padding: 0.8rem 1.5rem;
  background-color: #e2e2e2;
  border-radius: 3px;
  color: #333;
  word-break: break-all;
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
}
.messages ul li chat-text::after {
  content: "";
  position: absolute;
  left: -10px;
  top: 13px;
  width: 0;
  height: 0;
  border-style: solid dashed dashed;
  border-color: #e2e2e2 transparent transparent;
  overflow: hidden;
  border-width: 10px;
}
.messages ul li chat-text pre {
  width: 100%;
  white-space: pre-wrap;
  word-break: break-all;
}
.messages .chat-user {
  width: 4rem;
  height: 4rem;
  position: absolute;
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  left: 3px;
  right: auto;
}
.messages .chat-user cite {
  position: absolute;
  left: 60px;
  top: -2px;
  width: 500px;
  line-height: 24px;
  font-size: 12px;
  white-space: nowrap;
  color: #999;
  text-align: left;
  font-style: normal;
}
.messages .chat-user cite i {
  font-style: normal;
  padding-left: 15px;
}
.messages .chat-user img {
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
}
.messages .chat-mine {
  text-align: right;
  padding-left: 0;
  padding-right: 60px;
}
.messages .chat-mine .chat-text {
  margin-left: 0;
  text-align: left;
  background-color: #e4e7ed;
  color: #fff;
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
}
.messages .chat-mine .chat-text::after {
  left: auto;
  right: -10px;
  border-top-color: #e4e7ed;
}
.messages .chat-mine .chat-user {
  left: auto;
  right: 3px;
}
.messages .chat-mine .chat-user cite {
  left: auto;
  right: 60px;
  text-align: right;
}
.messages .chat-mine .chat-user cite i {
  padding-left: 0;
  padding-right: 15px;
}
.chat-main-footer {
  border-top: 1px solid #f2f2f2;
  height: 15rem;
  display: flex;
  flex-direction: column;
}
.chat-main-footer .chat-footer-tool {
  padding: 0.5rem 1rem;
  height: 3.4rem;
  position: relative;
}
.chat-main-footer .el-textarea textarea {
  border: 0 !important;
}
.chat-main-footer .el-textarea .el-textarea__inner {
  border: 0 !important;

  background-color: #e4e7ed !important;
}
.chat-main-footer .el-textarea .el-textarea__inner:focus {
  border: 0 !important;
}
.chat-main-footer .chat-send {
  height: 4rem;
  text-align: right;
  padding: 0 1rem 1rem 0;
}
</style>



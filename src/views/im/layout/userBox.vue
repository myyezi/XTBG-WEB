<template>
    <div class="user-box">
        <div class="user-box-list">
            <el-input v-model="filterText" placeholder="搜索" size="small" suffix-icon="el-icon-search" class="search-box"></el-input>
            <div class="group-organization-box">
                <el-tree 
                    :data="treeDataList" 
                    :props="defaultProps" 
                    @node-click="handleNodeClick" 
                    :filter-node-method="filterNode"
                    ref="tree"
                    class="organization_tree">
                    <span class="custom-tree-node clearfix" slot-scope="{ node, data }">
                        <!-- <el-tooltip class="item" effect="dark" :content="node.label" placement="top-start"> -->
                            <img :src="data.portrait?data.portrait:defaultPic" alt="头像" >
                            <span>{{ node.label }}</span>
                        <!-- </el-tooltip> -->
                    </span>
                </el-tree>
                <!-- <div class="group-list">
                    <ul>
                        <li v-for="(item,index) in groupList" :key="index" class="clearfix">
                            <img :src="item.portrait?item.portrait:defaultPic" alt="头像">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div> -->
            </div>
        </div>
        <div class="chat-box">
            <Top></Top>
            <Welcome :chat="currentChat" ref="welcomeDedail"></Welcome>
        </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Top from '../components/top.vue';
  import Welcome from '../components/welcome.vue';
  import ajax from '@/utils/request'
  import Bus from "@/utils/eventBus.js";
  const { ChatListUtils } = require('../../../utils/imUtils/ChatUtils.js');

  export default {
    components: {
        Top,
        Welcome,
    },
    computed: {
        ...mapGetters([
            'user',
        ]),
        chatGroupList: {
            get: function() {
                return this.$store.state.im.chatGroupList;
            }
        },
        userFriendList: {
            get: function() {
                return this.$store.state.im.userFriendList;
            }
        }
    },
    data() {
        return {
            defaultPic:require('@/styles/img/morentx.png'),
            companyPortrait:require('@/styles/img/icon_company.png'),
            groupPortrait:require('@/styles/img/icon_group.png'),
            friendPortrait:require('@/styles/img/icon_friend.png'),
            currentChat:{},
            showChat:false,
            filterText: '',
            treeDataList:[],
            organizationList: [],
            organizationTreeList:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            groupList:[],
            friendList:[]
        };
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        chatGroupList:function(newvalue,oldvalue) {
            this.getGroupList()
        },
        userFriendList:function(newvalue,oldvalue) {
            this.getGroupList()
        }
    },
    destroyed() {
        Bus.$off("sessione-updata")
    },
    created() {
        this.getOrganization()
    },
    methods: {
        handleNodeClick(data) {
            if(data.owner) {
                let currentSession = {
                portrait: data.portrait, // 接收人头像
                targetId: data.targetId, //接收人id
                targetName:data.name, //接收人名称
                type: 1, //消息类别 0、单聊 1、群聊
                owner:data.owner,
                content: {
                    type:0, //发送信息类型 1、文本 2、语音 3、图片 4、定位 5、文件 6、视频
                    content:'' // 发送消息内容
                },
                };
                this.$store.commit('addSession', currentSession);
                Bus.$emit("sessione-updata",{targetId:data.targetId}); 
            } else {
                if(!data.children || data.children.length==0) {
                    if(data.name != '我的群组') {
                        this.showChat = true
                        this.currentChat = data
                        this.$refs.welcomeDedail.back()
                    }
                }
            }
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        getOrganization() {
            ajax.get('/upms/organization/companyTree').then(rs => {
                if(rs.status === 0) {
                    this.organizationList = rs.data
                    this.organizationList[0].portrait = this.companyPortrait
                    this.getGroupList()
                }
            });
        },
        // 得到群组列表
        getGroupList() {
            let self = this;
            let cacheSession = []
            let myGroupList =[]
            self.treeDataList = []
            self.groupList = [];
            // 从内存中获取群组列表记录
            cacheSession = self.$store.state.im.chatGroupList;
            if(!cacheSession||cacheSession.length === 0) {
                // 从缓存中取群组列表记录
                cacheSession = ChatListUtils.getGroupList(this.user.userId)
                if(cacheSession&&cacheSession.length>0) {
                    self.$store.commit('setChatGroupList', cacheSession);
                }
            }
            self.groupList = cacheSession
            myGroupList.push({
                name:'我的群组',
                children:self.groupList,
                portrait:self.groupPortrait
            })
            this.treeDataList = this.organizationList.concat(myGroupList)
            this.getFriendList()
        },
        // 得到好友列表
        getFriendList() {
            let self = this;
            let cacheSession = []
            let myFriendList =[]
            self.friendList = [];
            // 从内存中获取好友列表记录
            cacheSession = self.$store.state.im.userFriendList;
            if(!cacheSession||cacheSession.length === 0) {
                // 从缓存中取好友列表记录
                cacheSession = ChatListUtils.getFriendList(this.user.userId)
                if(cacheSession&&cacheSession.length>0) {
                    self.$store.commit('setUserFriendList', cacheSession);
                }
            }
            self.friendList = cacheSession
            myFriendList.push({
                name:'我的好友',
                children:self.friendList,
                portrait:self.friendPortrait
            })
            this.treeDataList = this.treeDataList.concat(myFriendList)
            console.log(this.treeDataList)
        }
    }
};
</script>
<style lang="scss">
    @import '../../../styles/imCss/theme';

    .ivu-tabs-content {
        height: 100%;
    }

    .user-box {
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

        .user-box-list {
            height: 100%;
            width: 22rem;
            display: flex;
            flex-direction: column;

            .search-box {
                margin: 24px 8px;
                width: calc(100% - 16px);
            }
            .group-organization-box {
                height: calc(100% - 80px);
                overflow: auto;
            }
            .organization_tree {
                background: #eeeeee;
                .el-tree-node__content {
                    height:60px;
                    border-top: 1px solid #cccccc;
                }
                .custom-tree-node {
                    img {
                        float:left;
                        width:36px;
                        height:36px;
                    }
                    span {
                        float:left;
                        margin: 10px;
                    }
                }
                .el-tree-node__children {
                    .el-tree-node__content {
                        height:36px;
                        border-top: 0;
                        padding: 5px 0;
                    }
                    .custom-tree-node {
                        img {
                            float:left;
                                width: 26px;
                                height: 26px;
                                margin-right: 5px;
                        }
                        span {
                            float:left;
                            margin: 5px;
                            width: 13rem;
                            white-space:nowrap;
                            overflow:hidden;
                            text-overflow:ellipsis;
                        }
                    }
                }
            }
            .group-list {
                ul {
                    margin-left: 16px;
                    li {
                        height: 36px;
                        line-height: 36px;
                        margin-bottom: 5px;
                        cursor: pointer;
                        img {
                            float:left;
                            width:36px;
                            height:36px;
                        }
                        span {
                            float:left;
                        }
                    }
                }
            }
        }
    }
</style>

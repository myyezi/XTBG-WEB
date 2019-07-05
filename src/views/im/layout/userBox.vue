<template>
    <div class="user-box">
        <div class="user-box-list">
            <el-input v-model="filterText" placeholder="搜索" size="small" suffix-icon="el-icon-search" @on-focus="showSearch()" class="search-box"></el-input>
            <div class="group-box">
                <el-tree 
                    :data="userFriendList" 
                    :props="defaultProps" 
                    @node-click="handleNodeClick" 
                    :filter-node-method="filterNode"
                    ref="tree"
                    class="user_tree">
                </el-tree>
            </div>
        </div>
        <div class="chat-box">
            <Top></Top>
            <Welcome v-if="!showChat"></Welcome>
            <UserChat :chat="currentChat" v-else></UserChat>
        </div>
    </div>
</template>
<script>
  import Top from '../components/top.vue';
  import Welcome from '../components/welcome.vue';
  import UserChat from '../components/chat.vue';
  import conf from '../conf';

  const { ChatListUtils } = require('../../../utils/imUtils/ChatUtils.js');

  export default {
    components: {
        Top,
        Welcome,
        UserChat
    },
    computed: {
    },
    data() {
        return {
            currentChat:{},
            showChat:false,
            filterText: '',
            userFriendList: [
                {
                    label: '研发部',
                    children: [
                        {
                            id:1,
                            label: '王一',
                            name:'王一'
                        },
                        {
                            id:2,
                            label: '王二',
                            name:'王二'
                        },
                        {
                            id:3,
                            label: '王三',
                            name:'王三'
                        },
                    ]
                }, {
                    label: '测试部',
                    children: [
                        {
                            id:4,
                            label: '李一',
                            name:'李一'
                        },
                        {
                            id:5,
                            label: '李二',
                            name:'李二'
                        }
                    ]
                }, {
                    label: '产品部',
                    children: [
                        {
                            id:6,
                            label: '刘一',
                            name:'刘一'
                        },
                        {
                            id:7,
                            label: '刘二',
                            name:'刘二'
                        },
                    ]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
        };
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        handleNodeClick(data) {
            if(!data.children) {
                this.showChat = true
                this.currentChat = data
                console.log(data);
            }
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    }
};
</script>
<style lang="scss" scoped>
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
                margin: 1.5rem;
                width: 19rem;
            }
            .user_tree {
                background: #eeeeee;
                margin-left: 1.5rem;
            }
            .group-box {
                overflow-y: scroll;
                flex: 1;

                .group-list {
                    margin: 0 1rem;

                    .count {
                        color: #aaaaaa;
                    }

                    li {
                        list-style: none;
                        position: relative;
                        font-size: 1.2rem;
                        cursor: pointer;
                        font-weight: 200;

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
                            width: 4.4rem;
                            height: 4.4rem;
                            border-radius: 50%;
                            position: absolute;
                            top: 0.4rem;
                            left: 2.5rem;
                        }

                        .outline {
                            filter: grayscale(100%);
                        }

                        b {
                            position: absolute;
                            font-size: 1.3rem;
                            left: 7.5rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-weight: 600;
                            top: 0.6rem;
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
                            color: #aaaaaa;
                        }
                    }

                    .user {
                        padding-left: 1.3rem;
                        height: 5.2rem;

                        a {
                            display: block;
                            width: 100%;
                            height: 100%;
                            color: $color-default;
                        }
                    }

                    > li:hover {
                        /*background-color: #efefef;*/
                    }

                    > li > ul {
                        /*background-color: #ffffff;*/
                    }

                    li.user:hover {
                        /*background-color: #efefef;*/
                    }
                }
            }
        }
    }
</style>

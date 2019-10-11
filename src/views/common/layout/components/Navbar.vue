<template>
    <el-menu class="navbar" mode="horizontal" :style="{'background':navbarColor}">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened" :sizeColor="sizeColor"></hamburger>
        <breadcrumb :sizeColor="sizeColor"></breadcrumb>
        <el-dropdown class="avatar-container" size="small" trigger="click" :style="{'color':sizeColor}">
            <div class="avatar-wrapper">
                <span style="margin-right: 10px;font-size: 14px" :title="nowDate">{{nowTime}}</span>
                <span v-if="nowText">{{nowText}}好，{{user.name}}</span>
                <span v-else>{{user.name}}</span>
                <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
                <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <el-dropdown-item @click.native="openForm">修改密码</el-dropdown-item>
                <el-dropdown-item divided>
                    <span @click="logout" style="display:block;">退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="navbar_tools">
            <ul class="clearfix">
                <li class="clearfix"  @click="openImChat">
                    <img :src="communicationPic" />
                    <span :style="{'color':sizeColor}">通讯</span>
                    <el-badge class="message_number" :value="unReadNum" v-if="unReadNum>0"/>
                </li>
                <el-dropdown trigger="click" :hide-on-click="false" class="clearfix">
                    <span class="el-dropdown-link">
                        <img :src="skinPic" />
                        <span :style="{'color':sizeColor}">换肤</span>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="color_count">
                        <el-dropdown-item v-for="(item,index) in colorList" :key="index" @click.native="getColor(item)" :style="{'background-image':'url('+item.backgroundImg+')'}" :class="{'color_active':item.active}"></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </ul>
        </div>
        <el-select v-model="companyId" filterable placeholder="切换所属公司" @change="changeCompany()" style="float:right;width: 200px;margin-right:10px">
            <el-option v-for="(item,index) in companys"
                    :key="index"
                    :label="item.name"
                    :value="item.id"></el-option>
        </el-select>        
        <IMChat ref="imChat"></IMChat>
        <UpdPassword ref="form"></UpdPassword>
    </el-menu>
</template>

<script>
    import {mapGetters} from 'vuex'
    import UpdPassword from './UpdPassword'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'
    import IMChat from '@/views/im/index2.vue';
    import ajax from '@/utils/request'
    export default {
        data(){
            return {
                companyId: '',
                companys: [],
                unReadNum:0,
                nowDate: new Date().format('yyyy-MM-dd'),
                nowText: this.getDateText(),
                nowTime: new Date().format('hh:mm'),
                messagePic:require('@/styles/img/message.png'),
                skinPic:require('@/styles/img/skin.png'),
                communicationPic:require('@/styles/img/communication.png'),
                colorList: [
                    {sidebarColor:'#1d9389',navbarColor:'#29c9bb',logColor:'#24bbae',sizeColor:'#fff',backgroundImg:require('@/styles/img/skin_img.png')},
                    {sidebarColor:'#242e44',navbarColor:'#4781fe',logColor:'#3567d1',sizeColor:'#fff',backgroundImg:require('@/styles/img/skin_img1.png')},
                    {sidebarColor:'#8873c2',navbarColor:'#ac8ed8',logColor:'#7964b1',sizeColor:'#fff',backgroundImg:require('@/styles/img/skin_img2.png')},
                    {sidebarColor:'#2c4230',navbarColor:'#50833b',logColor:'#3f682e',sizeColor:'#fff',backgroundImg:require('@/styles/img/skin_img3.png')},
                    {sidebarColor:'#061c46',navbarColor:'#5c66d4',logColor:'#444eb5',sizeColor:'#fff',backgroundImg:require('@/styles/img/skin_img4.png')},
                    {sidebarColor:'#3b4966',navbarColor:'#45c8dc',logColor:'#34a2b3',sizeColor:'#fff',backgroundImg:require('@/styles/img/skin_img5.png')},
                ],
                navbarColor:'#29c9bb',
                sizeColor:'#fff'
            }
        },
        components: { UpdPassword, Breadcrumb, Hamburger ,IMChat},
        computed: {
            ...mapGetters([
                'user',
                'sidebar',
                'avatar'
            ]),
            sessionList: {
                get: function() {
                    return this.$store.state.im.sessionList;
                }
            }
        },
        watch:{
            sessionList :function(newvalue,oldvalue) {
                if(newvalue&&newvalue.length>0) {
                    this.unReadNum = 0
                    newvalue.forEach((item)=>{
                        this.unReadNum += item.unReadCount
                    })
                } else {
                    this.unReadNum = 0
                }
            },
        },
        created() {
            this.$set(this.colorList[0],'active',true);
        },
        methods: {
            getCompanys() {
                ajax.get('upms/organization/getCompanyByUserId').then(result => {
                    this.companys = result.data;
                    console.log(this.user.managementCompanyId);
                    this.companyId = this.user.managementCompanyId;
                });
            },
            changeCompany() {
                ajax.get('upms/user/changeCustomCompany/'+ this.companyId).then(response => {
                    this.$store.commit('SET_MENU', [])
                    this.$store.commit('SET_RELOAD', true)
                    localStorage.setItem("isReload", true);
                    this.$store.dispatch('delAllViews')
                    location.reload()
                })
            },

            openImChat(){
                this.$refs.imChat.handleOpen();
            },
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar')
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    localStorage.clear();
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            },
            openForm(){
                this.$refs.form.open();
            },
            getDateText(date=new Date()){
                let h = date.getHours();
                if(h>=0&&h<6){
                    return "凌晨";
                }else if(h>=6&&h<9){
                    return "早上";
                }else if(h>=9&&h<12){
                    return "上午";
                }else if(h>=12&&h<14){
                    return "中午";
                }else if(h>=14&&h<18){
                    return "下午";
                }else if(h>=18&&h<24){
                    return "晚上";
                }
            },
            getPath(item) {
                if(item.isPath) {
                    this.$router.push({
                        path: item.path
                    })
                }
            },
            getColor(item) {
                console.log(item)
                this.colorList.forEach(items => {
                    this.$set(items,'active',false);
                });
                this.$set(item,'active',true);
                if(item.navbarColor !== '#fff') {
                    this.messagePic = require('@/styles/img/message.png')
                    this.skinPic = require('@/styles/img/skin.png')
                    this.communicationPic = require('@/styles/img/communication.png')
                } else {
                    this.messagePic = require('@/styles/img/message1.png')
                    this.skinPic = require('@/styles/img/skin1.png')
                    this.communicationPic = require('@/styles/img/communication1.png')
                }
                this.navbarColor = item.navbarColor
                this.sizeColor = item.sizeColor
                this.$emit('childByValue', {sidebarColor:item.sidebarColor,sizeColor:item.sizeColor,logColor:item.logColor}) //传值给父组件
            },
        },
        mounted(){
            this.getCompanys();
            window.setInterval(() => {
                let date = new Date();
                this.nowDate = date.format('yyyy-MM-dd');
                this.nowText = this.getDateText(date);
                this.nowTime = date.format('hh:mm');
            }, 10 * 1000);
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .el-dropdown-menu {
        top: 35px !important;
    }
    .navbar {
        background-color: #4781fe;
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px 0 20px;
        }
        .navbar_tools {
            float:right;
            ul {
                li {
                    cursor:pointer;
                    float:left;
                    margin-right: 15px;
                    img {
                        float:left;
                        width:20px;
                        height:20px;
                        margin:15px 5px 0 0;
                    }
                    span {
                        float:left;
                    }
                    .message_number {
                        margin: -10px 0 0 -5px;
                    }
                }
                .el-dropdown {
                    float:left;
                    margin-right: 15px;
                    img {
                        float:left;
                        width:20px;
                        height:20px;
                        margin:15px 5px 0 0;
                    }
                    span {
                        float:left;
                    }
                }
            }
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .avatar-container {
            height: 50px;
            float:right;
            margin-right:35px;
            color:#fff;
            .avatar-wrapper {
                cursor: pointer;
                margin-right: 20px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 18px;
                    font-size: 12px;
                }
            }
        }
    }
    .color_count {
        width:561px;
        max-height: 1000px;
        padding:20px 20px 30px;
        // height: 240px;
        .el-dropdown-menu__item {
            float:left;
            width:133px;
            height:117px;
            margin:20px 20px 0;
            cursor:pointer;
            transition: All 0.3s ease-in-out;
            background: no-repeat center;
            background-size: 133px 117px;
            padding:0;
        }
        .color_active{
            transform: scale(1.2);
        }
    }
</style>


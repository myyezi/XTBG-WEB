<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="project_statistics_swtich clearfix">
            <ul class="clearfix">
                <li v-for="(item,index) in companyList" :key="index" :class="{'company_active':item.active}" @click="companyClick(item,1)">{{item.text}}</li>
            </ul>
            <div class="swtich_search">
                <el-input v-model="projectName" placeholder="请输入项目名称"></el-input>
                <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-search" size="medium">搜索</el-button>
            </div>
        </div>
        <div class="project_statistics">
            <div class="statistics_title">年度统计</div>
            <ul v-if="value ==4 " class="project_year_statistics clearfix">
                <li v-for="(item,index) in yearStatisticsList" :key="index" >
                    <img :src="item.img" alt="">
                    <span class="year_statistics_title">{{item.year}}年</span>
                    <span class="year_statistics_num">{{item.num}}</span>
                </li>
            </ul>
            <ul v-if="value ==3 " class="project_year_statistics clearfix">
                <li v-for="(item,index) in yearStatisticsList" :key="index" >
                    <img :src="item.img" alt="">
                    <span class="year_statistics_title">{{item.year}}</span>
                    <span class="year_statistics_num">{{item.num}}</span>
                </li>
            </ul>

            <ul v-if="value ==2 " class="project_year_statistics_2 clearfix">
<!--                <el-row v-if="value ==2 " class="project_year_statistics_2">-->
<!--                    <el-col :span="6"v-for="(item,index) in yearStatisticsList" :key="index">-->
<!--                        <img :src="item.img" alt="">-->
<!--                        <span class="year_statistics_title_2">{{item.year}}年</span>-->
<!--                        <span class="year_statistics_num_2">{{item.num}}</span>-->
<!--                    </el-col>-->
<!--                </el-row>-->
                <li v-for="(item,index) in yearStatisticsList" :key="index" >
                    <img :src="item.img" alt="">
                    <span class="year_statistics_title_2">{{item.year}}</span>
                    <span class="year_statistics_num_2">{{item.num}}</span>
                </li>
            </ul>

            <ul v-if="value ==1 " class="project_year_statistics clearfix">
                <li v-for="(item,index) in yearStatisticsList" :key="index" >
                    <img :src="item.img" alt="">
                    <span class="year_statistics_title">{{item.year}}年</span>
                    <span class="year_statistics_num">{{item.num}}</span>
                </li>
            </ul>
        </div>
        <div class="project_statistics">
            <div class="statistics_title">类型统计</div>
            <ul class="project_type_statistics clearfix">
                <li v-for="(item,index) in typeStatisticsList" :key="index" class="clearfix" >
                    <p>
                        <span>{{item.name}}</span>
                        <span>{{item.num}}</span>
                    </p>
                    <p>
                        <img :src="item.img" alt="">
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Bus from "@/utils/eventBus.js";
import ajax from '@/utils/request'

export default {
    components: {},
    computed: {

    },
    watch:{

    },
    data() {
        return {
            defaultPic:require('@/styles/img/morentx.png'),
            companyList:[],
            yearStatisticsList:[],
            typeStatisticsList:[],
            projectName:'',
            companyName:'能源公司',
            value:''
        };
    },

    methods: {
        // 切换公司事件
        companyClick(item,type) {
            console.log(item,type)
            this.companyList.forEach(items => {
                if(type == 2&&items.name == item.name) {
                    this.$set(items,'active',true);
                } else {
                    this.$set(items,'active',false);
                }
            });
            if(type == 1) {
                this.$set(item,'active',true);
            }
            this.getProjectYearStatistics(item.value)
            this.getProjectTypeStatistics(item.value)
        },
        getProjectYearStatistics(value){
            this.value = value;
                ajax.get('power/powerproject/getProjectYearStatistics',{value:value}).then(rs => {
                    rs.data.forEach((item)=>{
                        switch (item.zodiac) {
                            case 1 : item.img = require('@/styles/img/zodiac/zodiac_shu_'+this.value+'.png');
                                     break;
                            case 2 : item.img = require('@/styles/img/zodiac/zodiac_niu_'+this.value+'.png');
                                     break;
                            case 3 : item.img = require('@/styles/img/zodiac/zodiac_hu_'+this.value+'.png');
                                break;
                            case 4 : item.img = require('@/styles/img/zodiac/zodiac_tu_'+this.value+'.png');
                                break;
                            case 5 : item.img = require('@/styles/img/zodiac/zodiac_long_'+this.value+'.png');
                                break;
                            case 6 : item.img = require('@/styles/img/zodiac/zodiac_she_'+this.value+'.png');
                                break;
                            case 7 : item.img = require('@/styles/img/zodiac/zodiac_ma_'+this.value+'.png');
                                break;
                            case 8 : item.img = require('@/styles/img/zodiac/zodiac_yang_'+this.value+'.png');
                                break;
                            case 9 : item.img = require('@/styles/img/zodiac/zodiac_hou_'+this.value+'.png');
                                break;
                            case 10 : item.img = require('@/styles/img/zodiac/zodiac_ji_'+this.value+'.png');
                                break;
                            case 11 : item.img = require('@/styles/img/zodiac/zodiac_gou_'+this.value+'.png');
                                break;
                            case 12 : item.img = require('@/styles/img/zodiac/zodiac_zhu_'+this.value+'.png');
                                break;
                            // default :
                            //         item.img = require('@/styles/img/zodiac/zodiac_yang_'+this.value+'.png');
                            //         break
                        }

                    })
                    this.yearStatisticsList = rs.data;
                });
            },
        getProjectTypeStatistics(value){
            ajax.get('power/powerproject/getProjectTypeStatistics',{value:value}).then(rs => {
                rs.data.forEach((item)=>{
                    switch (item.type) {
                        case 'B' : item.img = require('@/styles/img/zodiac/biandian.png');
                            break;
                        case 'P' : item.img = require('@/styles/img/zodiac/peidian.png');
                            break;
                        case 'PW': item.img = require('@/styles/img/zodiac/peiwang.png');
                            break;
                        case 'Q' : item.img = require('@/styles/img/zodiac/qita.png');
                            break;
                        case 'S' : item.img = require('@/styles/img/zodiac/shudian.png');
                            break;
                        case 'X' : item.img = require('@/styles/img/zodiac/xitongguihua.png');
                            break;
                    }

                })
                this.typeStatisticsList = rs.data;
            });
        },
        getCompany(){
            ajax.get('power/powerproject/getBelongCompanyList').then(rs => {
                this.companyList = rs.data;
                rs.data.forEach((item)=>{
                    if(item.text == this.companyName){
                        item.active = true
                    }
                })
            });

        }
    },
    created: function () {
         console.log(this.$route.query.items)
         let data = this.$route.query.items;
         this.companyName = data.text?data.text:'能源公司'
         this.companyClick(data,2)
    },
    mounted: function () {
        // this.getProjectYearStatistics()
        // this.getProjectTypeStatistics()
        //获取归属公司
        this.getCompany();
    }
};
</script>
<style lang="scss">
    .project_statistics_swtich {
        padding-top:20px;
        ul {
            float: left;
            li {
                float: left;
                text-align: center;
                height: 40px;
                line-height: 40px;
                margin: 0 20px;
                cursor: pointer;
            }
            .company_active {
                color:#29c9bb;
                border-bottom: 2px solid #29c9bb;
            }
        }
        .swtich_search {
            float: left;
            margin-left:30px;
            width: 300px;
            .el-input {
                display:inline-block;
                width: 200px;
            }
            .el-button {
                padding:9px 20px;
                border: 1px solid #29c9bb;
                background:#29c9bb;
            }
        }
    }
    .project_statistics {
        .statistics_title {
            position: relative;
            padding:30px 20px 30px 30px;
            line-height:20px;
            font-size: 15px;
            color: #333;
            &::before{
                content: "";
                position: absolute;
                top: 37px;
                left: 20px;
                background: #29c9bb;
                width: 6px;
                height: 6px;
                border-radius: 50%;
            }
        }
    }
    .project_year_statistics {
        width:100%;
        li {
            position: relative;
            width:16.666%;
            // min-width:228px;
            float: left;
            text-align: center;
            img {
                width: 100%;
                max-width:228px;
                // height:284px;
            }
            .year_statistics_title {
                position: absolute;
                top: 20px;
                left: 50%;
                width: 50px;
                margin-left: -25px;
                font-size: 15px;
                color: #333;
            }
            .year_statistics_num {
                position: absolute;
                bottom: 30px;
                left: 50%;
                width: 50px;
                margin-left: -25px;
                font-size: 15px;
                color: #333;
            }
        }
    }

    .project_year_statistics_2 {
        width:100%;
        li {
            position: relative;
            width:25%;
            // min-width:228px;
            float: left;
            text-align: center;
            img {
                width: 100%;
                max-width:334px;
                height:284px;
            }
            .year_statistics_title_2 {
                position: absolute;
                top: 20px;
                left: 50%;
                width: 50px;
                margin-left: -25px;
                font-size: 15px;
                color: #333;
            }
            .year_statistics_num_2 {
                position: absolute;
                bottom: 30px;
                left: 50%;
                width: 50px;
                margin-left: -25px;
                font-size: 15px;
                color: #333;
            }
        }
    }
    .project_type_statistics {
        width:100%;
        padding:0 40px;
        li {
            position: relative;
            width: 31.3%;
            min-width: 270px;
            float: left;
            height: 148px;
            margin: 0 1% 20px;
            // line-height: 148px;
            // border: 1px solid #6c7e8f;
            box-shadow: #6c7e8f 0px 0px 6px;
            p:nth-child(1) {
                float: left;
                padding:39px 0 0 30px;
                height: 100%;
                width: 120px;
                span {
                    display: block;
                    height: 36px;
                    line-height:36px;
                }
            }
            p:nth-child(2) {
                float: right;
                margin:30px;
                img {
                    width:88px;
                    height:88px;
                }
            }
        }
    }
</style>


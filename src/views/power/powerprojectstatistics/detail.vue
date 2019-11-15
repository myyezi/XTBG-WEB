<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="project_statistics_swtich clearfix">
            <ul class="clearfix">
                <li v-for="(item,index) in companyList" :key="index" :class="{'company_active':item.active}" @click="companyClick(item,1)">{{item.name}}</li>
            </ul>
            <div class="swtich_search">
                <el-input v-model="projectName" placeholder="请输入项目名称"></el-input>
                <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-search" size="medium">搜索</el-button>
            </div>
        </div>
        <div class="project_statistics">
            <div class="statistics_title">年度统计</div>
            <ul class="project_year_statistics clearfix">
                <li v-for="(item,index) in yearStatisticsList" :key="index" >
                    <img :src="item.img" alt="">
                    <span class="year_statistics_title">{{item.year}}</span>
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

export default {
    components: {},
    computed: {

    },
    watch:{

    },
    data() {
        return {
            defaultPic:require('@/styles/img/morentx.png'),
            companyList:[{
                name:'能源公司',
                active:true
            },{
                name:'科技公司'
            },{
                name:'运营公司'
            },{
                name:'建筑公司'
            },],
            yearStatisticsList:[{
                img:require('@/styles/img/zodiac/zodiac_zhu.png'),
                year:2019,
                num:1000
            },{
                img:require('@/styles/img/zodiac/zodiac_gou.png'),
                year:2018,
                num:1000
            },{
                img:require('@/styles/img/zodiac/zodiac_ji.png'),
                year:2017,
                num:1000
            },{
                img:require('@/styles/img/zodiac/zodiac_hou.png'),
                year:2016,
                num:1000
            },{
                img:require('@/styles/img/zodiac/zodiac_yang.png'),
                year:2015,
                num:1000
            },{
                img:require('@/styles/img/zodiac/zodiac_ma.png'),
                year:2014,
                num:1000
            },{
                img:require('@/styles/img/zodiac/zodiac_she.png'),
                year:2013,
                num:1000
            },{
                img:require('@/styles/img/zodiac/zodiac_long.png'),
                year:2012,
                num:1000
            },{
                img:require('@/styles/img/zodiac/zodiac_tu.png'),
                year:2011,
                num:1000
            },{
                img:require('@/styles/img/zodiac/zodiac_hu.png'),
                year:2010,
                num:1000
            },{
                img:require('@/styles/img/zodiac/zodiac_niu.png'),
                year:2009,
                num:1000
            },{
                img:require('@/styles/img/zodiac/zodiac_shu.png'),
                year:2008,
                num:1000
            }],
            typeStatisticsList:[{
                img:require('@/styles/img/zodiac/peidian.png'),
                name:'配电',
                num:123414234
            },{
                img:require('@/styles/img/zodiac/peiwang.png'),
                name:'配网',
                num:123414234
            },{
                img:require('@/styles/img/zodiac/shudian.png'),
                name:'输电',
                num:123414234
            },{
                img:require('@/styles/img/zodiac/biandian.png'),
                name:'变电',
                num:123414234
            },{
                img:require('@/styles/img/zodiac/xitongguihua.png'),
                name:'系统规划统计',
                num:123414234
            },{
                img:require('@/styles/img/zodiac/qita.png'),
                name:'其它',
                num:123414234
            }],
            projectName:'',
            companyName:'能源公司'
        };
    },
    methods: {
        // 切换公司事件
        companyClick(item,type) {
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
        },
    },
    created: function () {
        this.companyName = this.$route.query.name?this.$route.query.name:'能源公司'
        this.companyClick({name:this.companyName},2)
    },
    mounted: function () {

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


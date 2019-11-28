<template>
    <div class="app-container white-bg list-panel" :style="{backgroundImage:'url('+require('@/styles/img/zodiac/projectbg.png')+')'}" v-cloak>
        
        <div class="project_company_statistics">
            <ul class="clearfix">
                <!-- <li v-for="(item,index) in typeStatisticsList" :key="index"  :class="{'company_statistics_active':item.active}" @click="companyClick(item)" @mouseover="selectStyle(item)" @mouseout="outStyle(item)">
                    <img :src="item.img" alt="">
                    <p class="company_statistics_title">{{item.text}}</p>
                </li> -->
                <li class="jianzhu" @click="companyClick(2)" @mouseover="selectStyle(2)" @mouseout="outStyle(2)"><img src="@/styles/img/zodiac/company_jianzhu.png" alt=""></li>
                <li class="nengyuan" @click="companyClick(1)" @mouseover="selectStyle(1)" @mouseout="outStyle(1)"><img src="@/styles/img/zodiac/company_nengyuan.png" alt=""></li>
                <li class="yunying" @click="companyClick(4)" @mouseover="selectStyle(4)" @mouseout="outStyle(4)"><img src="@/styles/img/zodiac/company_yunying.png" alt=""></li>
                <li class="keji" @click="companyClick(3)" @mouseover="selectStyle(3)" @mouseout="outStyle(3)"><img src="@/styles/img/zodiac/company_keji.png" alt=""></li>
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
            typeStatisticsList:[{
                img:require('@/styles/img/zodiac/company_nengyuan.png'),
                name:'能源公司',
            },{
                img:require('@/styles/img/zodiac/company_keji.png'),
                name:'科技公司',
            },{
                img:require('@/styles/img/zodiac/company_jianzhu.png'),
                name:'建筑公司',
            },{
                img:require('@/styles/img/zodiac/company_yunying.png'),
                name:'运营公司',
            }],
            projectName:''
        };
    },
    methods: {
        // getCompany(){
        //     ajax.get('power/powerproject/getBelongCompanyList').then(rs => {
        //             rs.data.forEach((item)=>{
        //                 switch (item.text) {
        //                     case '能源公司' : item.img = require('@/styles/img/zodiac/company_nengyuan.png');
        //                         break;
        //                     case '建筑公司' : item.img = require('@/styles/img/zodiac/company_jianzhu.png');
        //                         break;
        //                     case '科技公司':  item.img = require('@/styles/img/zodiac/company_keji.png');
        //                         break;
        //                     case '运营公司' : item.img = require('@/styles/img/zodiac/company_yunying.png');
        //                         break;
        //                 }
        //             })
        //             this.typeStatisticsList = rs.data;
        //         })
        // },
        // 切换公司事件
        companyClick(item) {
            this.typeStatisticsList.forEach(items => {
                this.$set(items,'active',false);
            });
            this.$router.push({path: '/power/powerprojectstatistics/detail', query: {items: item}});
        },
        selectStyle (item) {
            let _this=this;
            this.$nextTick(()=> {
                this.typeStatisticsList.forEach(items => {
                    _this.$set(items,'active',false);
                });
                _this.$set(item,'active',true);
            });
        },
        outStyle (item) {
            this.$set(item,'active',false);
        }
    },
    created: function () {
    },
    mounted: function () {
    //    this.getCompany();
    }
};
</script>
<style lang="scss">
    .project_company_swtich {
        padding-top:20px;
        .swtich_search {
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
    .list-panel {
        background-position: center;
        background-repeat: inherit;
    }
    .project_company_statistics {
        padding:0 9%;
        ul {
            padding: 4% 0 0 0;
            .jianzhu{
                margin-top: 180px;
                img {
                    width: 75%;
                }
            }
            .nengyuan{
                margin-top: 30px;
            }
            .yunying{
                margin-top: 280px;
                img {
                    width: 72%;
                }
            }
            li {
                width:25%;
                // min-width:228px;
                float: left;
                text-align: center;
                margin-top: 100px;
                cursor: pointer;
                img {
                    width: 90%;
                    // height:80%;
                    margin-bottom:16px;
                }
            }
            .company_statistics_active img{
                animation:myfirst 2s ease-in-out infinite;
            }
        }
    }
    @keyframes myfirst
    {
        0%{
            transform: scale(1);  /*开始为原始大小*/
        }
        25%{
            transform: scale(1.2); /*放大1.1倍*/
        }
        50%{
            transform: scale(1);
        }
        75%{
            transform: scale(1.1);
        }
    }
</style>


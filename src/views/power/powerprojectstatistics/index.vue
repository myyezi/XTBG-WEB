<template>
    <div class="app-container white-bg list-panel" :style="{backgroundImage:'url('+require('@/styles/img/zodiac/projectbg.png')+')'}" v-cloak>
        
        <div class="project_company_statistics">
            <ul class="clearfix">
                <li v-for="(item,index) in typeStatisticsList" :key="index"  :class="{'company_statistics_active' :item.active}" @click="companyClick(item)" @mouseover="selectStyle(item)" @mouseout="outStyle(item)">
                    <img :src="item.img" alt="">
                    <!-- <p class="company_statistics_title">{{item.text}}</p> -->
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
            typeStatisticsList:[{
                img:require('@/styles/img/zodiac/company_jianzhu.png'),
                name:'建筑公司',
            },{
                img:require('@/styles/img/zodiac/company_nengyuan.png'),
                name:'能源公司',
            },{
                img:require('@/styles/img/zodiac/company_yunying.png'),
                name:'运营公司',
            },{
                img:require('@/styles/img/zodiac/company_keji.png'),
                name:'科技公司',
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
            console.log(item);
            this.$router.push({path: '/power/powerprojectstatistics/detail', query: {items: item}});
        },
        // getList(){
        //     ajax.get("/url").then(re=>{
        //         this.typeStatisticsList = re.data;
        //     })
        //},
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
      // this.getCompany();
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
            li:nth-child(1){
                margin-top: 180px;
            }
            li:nth-child(3){
                margin-top: 280px;
            }
            li {
                width:25%;
                // min-width:228px;
                float: left;
                text-align: center;
                margin-top: 100px;
                cursor: pointer;
                img {
                    margin-bottom:16px;
                    width: 60%;
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


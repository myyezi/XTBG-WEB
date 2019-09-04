<template>
    <div class="header_bar clearfix">
        <div class="header_left" @click="toPath('/login')"><img :src="titleImg"></div>
        <!-- <div class="header_right" @click="toPath"><i>?</i><span>帮助</span></div> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
    	data(){
            return{
                titleImg:require('@/styles/img/header.png'),
            }
        },
        created () {
        },
        mounted(){
        },
        computed: {
        },
        methods: {
            toPath(path) {
                this.$router.push({path: path})
            },
        },

    }

</script>

<style lang="scss">
    .header_bar {
        height: 110px;
        background: #0aa0a9;
        padding:0 185px;
        cursor: pointer;
        .header_left {
            float:left;
            padding-top:35px;
            img {
                width:520px;
                height:40px;
            }
        }
        .header_right {
            float:right;
            padding-top:46px;
            color: #fff;
            cursor: pointer;
            i {
                width: 18px;
                height: 18px;
                display: inline-block;
                border-radius: 50%;
                border: 1px solid #fff;
                text-align: center;
                line-height: 18px;
                margin-right:5px;
            }
            span {
                font-size:16px;
            }
        }
    }
</style>

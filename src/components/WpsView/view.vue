<template>
    <div id="viewFile"></div>
</template>
<script>
    import store from '@/store'
    export default {
        props:['wpsUrl'],
        data(){
            return{}
        },
        mounted(){
            this.openWps(this.wpsUrl);
        },
        methods:{
            openWps(url){
                let wps = this.wps.config({
                    mount: document.querySelector('#viewFile'),
                    wpsUrl: url
                });
                wps.setToken({"token":store.getters.token});
            }
        }
    }
</script>

<style>
    body #viewFile #wps-iframe{
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        height: 100%;
        /* 防止双击缩放 */
        touch-action: manipulation;
    }
</style>

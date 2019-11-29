<template>
    <viewFile v-bind:wpsUrl="jwpsUrl"/>
</template>
<script>
    import viewFile from '@/components/WpsView/view'
    export default {
        data(){
            return{
                jwpsUrl:'',
          }
        },
        created() {
            this.jwpsUrl = sessionStorage.wpsUrl;
        },
        components: {
            viewFile
        }
    }
</script>

<style>
    #viewFile{
        height: 100%;
    }
</style>

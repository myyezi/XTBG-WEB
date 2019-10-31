<template>
    <div class="doc_icon_type">
        <img :src="iconObj.cad" v-if="cadType.indexOf(iconType)>=0"/>
        <img :src="iconObj.pic" v-else-if="picType.indexOf(iconType)>=0"/>
        <img :src="iconObj.pdf" v-else-if="pdfType.indexOf(iconType)>=0"/>
        <img :src="iconObj.excel" v-else-if="excelType.indexOf(iconType)>=0"/>
        <img :src="iconObj.ppt" v-else-if="pptType.indexOf(iconType)>=0"/>
        <img :src="iconObj.text" v-else-if="textType.indexOf(iconType)>=0"/>
        <img :src="iconObj.word" v-else-if="wordType.indexOf(iconType)>=0"/>
        <img :src="iconObj.zip" v-else-if="zipType.indexOf(iconType)>=0"/>
        <img :src="iconObj.other" v-else/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            iconObj:{
                cad:require('@/styles/img/icon-img/cad.png'),
                pic:require('@/styles/img/icon-img/pic.png'),
                pdf:require('@/styles/img/icon-img/pdf.png'),
                excel:require('@/styles/img/icon-img/excel.png'),
                ppt:require('@/styles/img/icon-img/ppt.png'),
                text:require('@/styles/img/icon-img/text.png'),
                word:require('@/styles/img/icon-img/word.png'),
                zip:require('@/styles/img/icon-img/zip.png'),
                other:require('@/styles/img/icon-img/other.png'),
            },
            cadType:['dwg'],
            picType:['png','jpg','jpeg','bmp','gif'],
            pdfType:['pdf'],
            excelType:['xls','xlsx'],
            pptType:['ppt','pptx'],
            textType:['txt','chm','wdl'],
            wordType:['doc','docx','dot','dotx','docm'],
            zipType:['zip','rar'],
        }
    },
    components: {},
    computed: {
    },
    props: ['iconType'],
    methods: {
        
    }
}
</script>

<style scoped lang="scss">
    .doc_icon_type {
        display: inline-block;
        vertical-align: middle;
        height: 28px;
        img {
            width:24px;
            height:24px;
        }
    }
</style>

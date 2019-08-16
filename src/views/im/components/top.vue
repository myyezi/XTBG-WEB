<template>
    <div class="im-top" style="-webkit-app-region: drag">
        <!-- <a href="javascript:void(0)" @click="close" style="-webkit-app-region: no-drag;">
            <i  class="el-icon-close"></i>
        </a> -->
        <a href="javascript:void(0)" @click="max" style="-webkit-app-region: no-drag;">
            <i  :class="icon"></i>
        </a>
        <a href="javascript:void(0)" @click="min" style="-webkit-app-region: no-drag">
            <i class="el-icon-minus"></i>
        </a>
    </div>
</template>
<script>
  import Bus from "@/utils/eventBus.js";
  export default {
    data() {
      return {
        // 默认选中的值
        icon: 'el-icon-full-screen'
      };
    },
    methods: {
      min() {
        Bus.$emit("close",{}); 
      },
      max() {
        Bus.$emit("max",{}); 
        this.icon = this.icon === 'el-icon-full-screen' ? 'icon-shousuo' : 'el-icon-full-screen';
      },
      close() {
        Bus.$emit("close",{}); 
      }
    }
  };
</script>
<style lang="scss">
    @import '../../../styles/imCss/theme';
    .im-top {
        height: 50px;
        padding: 0.5rem;
        position: absolute;
        z-index: 2;
        right: 0;
        width: 100%;

        a {
            color: $color-write;
            float: right;
            margin-left:10px;
            i {
                color: $color-default;
                font-size: 1.4rem;
                font-weight: bolder;
            }
        }
    }
</style>

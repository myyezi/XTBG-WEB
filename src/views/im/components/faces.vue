<template>
    <div class="faces_count">
      <el-tabs tab-position="bottom" type="card">
        <el-tab-pane>
          <span slot="label"><i class="icon-biaoqing1"></i></span>
          <ul class="faces clearfix">
              <li v-for="(item,index1) in emojiList" :key="index1">
                <span @click="insertFace(item,1)">{{item}}</span>
                  <!-- <img :src="faceMap[item]" :alt="item" :title="item" @click="insertFace(item)"/> -->
              </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="icon-gif"></i></span>
          <ul class="faces clearfix">
              <li v-for="(item,index2) in faceList" :key="emojiList.length+index2">
                  <img :src="faceMap[item]" :alt="item" :title="item" @click="insertFace(item,2)"/>
              </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>
const { faceUtils } = require('../../../utils/imUtils/ChatUtils');

export default {
  name: 'faces',
  components: {},
  data() {
    return {
      emojiList:faceUtils.emoji,
      faceList: faceUtils.alt,
      faceMap: faceUtils.faces()
    };
  },
  methods: {
    insertFace: function(item,type) {
      this.$emit('insertFace', {item:item,type:type});
    }
  }
};
</script>

<style lang="scss">
.faces_count {
    .el-tabs__item.is-active{
        background-color: #e4e7ed;
        border-bottom: none;
    }
    .icon-biaoqing1{
        font-size: 30px;
        color: #ffcd00;
        vertical-align: middle;
    }
    .icon-gif{
        font-size: 30px;
        color: #fc7e7e;
        vertical-align: middle;
    }
    .faces {
      width: 30.5rem;
      list-style: none;
      background-color: #ffffff;
      // border: 1px solid #f0f5ff;
      display: block;
      height: 25rem;
      // padding: 1rem;
      overflow: auto;
      & > li {
        width: 3rem !important;
        height: 3rem !important;
        padding: 8px;
        margin: 2px;
        display: inline-block;
        float: left;
        cursor: pointer;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
    }
}
</style>

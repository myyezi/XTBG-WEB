<template>
  <section class="app-main" :class="{'app-main_default':$store.getters.nomenu}">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
    <audio ref="mmAudio" src="../../../../../static/audio/msg.mp3"></audio>
    <!-- <IMChat></IMChat> -->
  </section>
</template>

<script>
import IMChat from '@/views/im/index2.vue';
import {removeToken} from '@/utils/cookie' // 验权
export default {
  name: 'AppMain',
  components: { IMChat },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    },
    messageCount() {
      return this.$store.state.im.messageCount;
    },
    loginStaus: {
      get: function() {
        return this.$store.state.im.loginStaus;
      }
    },
  },
  watch: {
    messageCount: function () {
      this.aplayAudio()
    },
    loginStaus: function (newvalue,oldvalue) {
      if(!newvalue) {
        removeToken()
        this.$confirm('你的账号已在其它地方登录！需退出重新登录！！！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showClose:false,
          showCancelButton:false,
          closeOnClickModal:false
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
            localStorage.clear();
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }).catch(() => {
        });
      }
    }
  },
  methods: {
    aplayAudio () {
      this.$nextTick(() => this.$refs.mmAudio.play())
    }
  }
}
</script>

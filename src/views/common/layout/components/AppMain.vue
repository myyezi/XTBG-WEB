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
  },
  watch: {
    messageCount: function () {
      this.aplayAudio()
    }
  },
  methods: {
    aplayAudio () {
      this.$nextTick(() => this.$refs.mmAudio.play())
    }
  }
}
</script>

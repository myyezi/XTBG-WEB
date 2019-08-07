<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
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
    }
  }
}
</script>

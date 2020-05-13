<template>
<el-scrollbar wrap-class="scrollbar-wrapper">
<el-backtop></el-backtop>
  <transition name="fade-transform" mode="out-in">
    <keep-alive>
      <router-view :path="key" ></router-view>
    </keep-alive>
  </transition>
</el-scrollbar>
</template>
<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

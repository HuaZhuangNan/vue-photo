<template>
<el-breadcrumb separator-class="el-icon-arrow-right" class="nav-bread">
  <el-breadcrumb-item
    v-for="(item, index) in navList"
    :key="index"
    :to="item"
  >
    {{item.name}}
  </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      navList: [],
    };
  },
  watch: {
    $route() {
      this.navView();
    },
  },
  mounted() {
    this.navView();
  },
  methods: {
    navView() {
      this.navList = Object.assign([], this.$route.matched);
      // 确认首页
      if (this.navList[0].redirect && this.navList[0].redirect === this.navList[1].path) {
        this.navList.splice(1, 1); // 直接显示home
      }
    },
  },
};
</script>

<style lang="scss" scoped>


</style>

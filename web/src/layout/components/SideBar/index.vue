<template>
<aside>
<el-scrollbar wrap-class="scrollbar-wrapper" >
<el-menu class="menu-container"
  :default-active="$route.path"
  :router="true"
  :unique-opened="false"
  :collapse-transition="false"
  :collapse="isCollapse">
  <template v-for="(item, index) in routes">
    <el-submenu v-if="item.children"
      :key="index"
      :index="`${basePath}${item.path}`">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.name}}</span>
      </template>
      <el-menu-item v-for="(cItem,cIndex) in item.children"
        :key="cIndex"
        :index="`${basePath}${item.path}/${cItem.path}`">
        <i :class="cItem.meta.icon"></i>
        <span slot="title">{{cItem.name}}</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item v-else
      :key="index"
      :index="`${basePath}${item.path}`">
      <i :class="item.meta.icon"></i>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>
  </template>

</el-menu>
</el-scrollbar>
</aside>
</template>
<script>

export default {
  name: 'SideBar',
  computed: {
    isCollapse() {
      return !this.$store.getters.sidebar;
    },
    basePath() {
      return `/${this.$store.getters.username}/`;
    },
  },
  data() {
    return {
      routes: this.$store.getters.routes,
    };
  },
  mounted() {
    // console.log(this.$route.path);
    // console.log(this.routes);
  },
  methods: {

  },
};
</script>

<style lang="scss">
.menu-container {
  width: 210px;
  min-height: 100%;
}
.el-menu--collapse {
  width: 64px !important;
}
.el-scrollbar__view {
  height: 100%;
}
</style>

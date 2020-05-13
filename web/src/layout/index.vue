<template>
<el-container class="layout-container">
  <side-bar />
  <el-container>
    <el-header height="auto" class="header-container">
      <nav-bar />
      <tags-bar />
    </el-header>
    <el-main class="main-container">
      <app-main />
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import TagsBar from './components/TagsBar';
import AppMain from './components/AppMain';

export default {
  name: 'Layout',
  components: {
    SideBar,
    NavBar,
    TagsBar,
    AppMain,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/scss/var.scss';
.layout-container {
  width: 100%;
  height: 100%;
}
.section-container {
  height: 100%;
  flex: 1;
}
.header-container {
  width: 100%;
  padding: 0;
}
.main-container {
  background-color: #f0f2f5;
}

</style>

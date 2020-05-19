<template>
<nav class="nav-container">
  <div class="nav-left">
    <i :class="sidebar?'el-icon-s-fold':'el-icon-s-unfold'" @click.prevent="toggleSideBar"></i>
    <Breadcrumb />
  </div>
  <div class="nav-right">
    <LangSelect />
    <UserDown />
  </div>
</nav>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import LangSelect from '@/components/LangSelect';
import UserDown from '@/components/UserDown';

export default {
  name: 'NavBar',
  components: {
    Breadcrumb,
    LangSelect,
    UserDown,
  },
  computed: {
    sidebar() {
      return this.$store.getters.sidebar;
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('user/toggleSideBar');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/scss/var.scss';
$height: 55px;

.nav-container {
  display: flex;
  height: $height;
  line-height: $height;
  justify-content: space-between;
  box-shadow: 0 1px 3px map-get($colors, 'deep');
  border-bottom: 1px solid map-get($colors, 'deep');
  .nav-left {
    flex: 1;
    height: $height;
    & i {
      display: block;
      float: left;
      line-height: $height;
      font-size: 26px;
      margin: 0 10px;
      cursor: pointer;
    }
    & .nav-bread {
      line-height: $height;
    }
  }
  .nav-right {
    height: $height;
    padding-right: 10px;
  }
}
</style>

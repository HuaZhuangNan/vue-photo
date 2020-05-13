<template>
<aside class="tags-container">
  <el-scrollbar wrap-class="scrollbar-wrapper" class="scroll-container">
    <router-link v-for="(to, index) in tagList"
      :key="to.path"
      :to="to.path"
      v-slot="{ href, route, navigate, isActive, isExactActive }"
    >
      <!-- 保留最后一个不被删除 -->
      <el-tag :closable="tagList.length !==1 "
        :effect="isExactActive?'light' : 'plain'"
        size="medium" class="tag" @click="navigate" @close="closeTag(index)" >
        <a :href="href" ></a>{{ to.name }}
      </el-tag>
    </router-link>
  </el-scrollbar>
</aside>
</template>

<script>
export default {
  name: 'TagsBar',
  data() {
    return {
      tagList: [],
    };
  },
  mounted() {
    this.initTags(); // 初始化第一个路径
  },
  watch: {
    $route(to) {
      this.addTag(to);
    },
  },
  methods: {
    initTags() {
      this.tagLiat = [];
      this.addTag(this.$route);
    },
    addTag(to) {
      // 判断是否存在
      const isHave = this.tagList.some(item => item.path === to.path);
      if (isHave) return;
      this.tagList.push(to);
    },
    closeTag(index) {
      const indexPath = this.tagList[index].path; // 获取点击路由的路径
      const toIndex = index === 0 ? 0 : index - 1;
      // 删除路由
      this.tagList.splice(index, 1);
      // 删除当期路由就跳前一个或者后一个
      if (this.$route.path === indexPath) {
        this.$router.push(this.tagList[toIndex]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/scss/var.scss';

$height: 36px;
.scroll-container {
  white-space: nowrap;
  height: $height;
  max-height: $height;
}
.tags-container {
  width: 100%;
  box-shadow: 0 1px 3px map-get($colors, 'deep');
  .tag {
    cursor: pointer;
    margin: 5px;
  }
  // .tag:hover {
  //   color: map-get($colors, 'light');
  //   background-color: $--color-primary;
  // }
}
</style>>

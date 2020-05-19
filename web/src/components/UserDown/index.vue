<template>
<el-dropdown  @command="handleCommand">
  <div class="el-dropaown-link">
    <img :src="avatar" class="avatar">
    <i class="el-icon-arrow-down el-icon--right" />
  </div>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item :command="{type:'route',name:'user'}">
      {{ $t('userDown.userInfo') }}
    </el-dropdown-item>
    <el-dropdown-item divided command="logout">
      {{ $t('userDown.logout') }}
    </el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</template>

<script>
export default {
  name: 'UserDown',
  computed: {
    avatar() {
      return `${process.env.VUE_APP_BASE_URL}/${this.$store.getters.avatar}`;
    },
  },
  methods: {
    handleCommand(command) {
      if (typeof command === 'object') this.$router.replace({ name: command.name });
      else {
        // 登录
        this.$store.dispatch(`user/${command}`, this.loginForm)
          .then(() => {
            this.$message('succes');
          })
          .catch(() => {
            this.$message('ERROR');
          });
      }
    },
  },
};
</script>

<style lang="scss">
  .avatar{
    float: left;
    width: 30px;
    margin-top: 10px;
    height: 30px;
    cursor: pointer;
    background: rgba(0,21,41,.08);
    border-radius: 50%;
    &:hover {
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
    }
  }
</style>

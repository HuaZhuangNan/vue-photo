<template>
  <el-dropdown trigger="click"  class="language" @command="handleSetLanguage" >
    <div>
      <svg-icon class-name="languagel-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown" class="language-menu">
      <el-dropdown-item v-for="(item, index) in languageList" :key="index"
        :disabled="language===item.lang" :command="item.lang">
        {{ item.type }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'LangSelect',
  computed: {
    languageList() {
      const result = [];
      const msg = this.$i18n.messages;
      Object.keys(msg).forEach(item => {
        result.push({ lang: item, type: msg[item].type || item });
      });
      return result;
    },
    language() {
      return this.$store.getters.language;
    },
  },
  methods: {
    handleSetLanguage(language) {
      this.$store.dispatch('user/setLanguage', language);
    },
  },
};
</script>

<style>
.language {
  margin: 0 10px;
}
.languagel-icon {
  cursor: pointer;
  font-size: 24px;
}
.language-menu {
  border: none;
}
</style>

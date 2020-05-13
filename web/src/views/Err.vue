<template>
<section class="err-box">
  <main class="err-container">
    <div class="err-text err-40">{{ code }}</div>
    <div class="err-text err-not">{{ msg }}</div>
    <button class="err-back" @click="back()"> {{ $t('err.go') }}</button>
  </main>
</section>
</template>

<script>
export default {
  name: 'Err',
  data() {
    return {
      code: this.$route.meta.title,
      msg: this.$i18n.t(`route.${this.$route.meta.title}`),
    };
  },
  methods: {
    back() {
      const path = this.$store.getters.history || '/';
      this.$router.push({ path });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/scss/var.scss';

$deep: rgba(map-get($colors, 'deep'), .3);
$light: map-get($colors, 'light');

.err-box {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(map-get($colors, 'primary'),.8) ;
}
.err-container {
  width: 5rem;
  height: 5rem;
  line-height: 1.4;
  color: $light;
  user-select: none;
  .err-text {
    text-align: center;
    text-shadow:  -2px -2px $deep,
                  -3px -3px $deep,
                  -4px -4px $deep,
                  -5px -5px $deep,
                  -6px -6px $deep;
    }
    .err-40 {
      font-size: 1.5rem;
      text-indent: .4rem;
      letter-spacing: .3rem;
      border-radius: 10%;
      background-color: map-get($colors, 'danger');
      clip-path: polygon(20% 0%, 0% 20%,
      30% 50%, 0% 80%, 20% 100%,
      50% 70%, 80% 100%, 100% 80%,
      70% 50%, 100% 20%, 80% 0%, 50% 30%);
    }
    .err-not {
      margin-top: .3rem;
      font-size: .5rem;
      text-indent: .1rem;
      letter-spacing: .1rem;
      text-shadow:  1px 1px $deep,
                  2px 2px $deep;
    }
    .err-back {
      width: 3rem;
      height: .4rem;
      margin: 0 1rem;
      margin-top: .4rem;
      text-align: center;
      font-weight: 700;
      font-size: .2rem;
      text-indent: .4rem;
      letter-spacing: .4rem;
      color: $light;
      border-radius: .3rem;
      border: 1px solid $light;
      background-color: transparent;
      &:hover {
        text-indent: .2rem;
        letter-spacing: .2rem;
      }
    }
}
</style>

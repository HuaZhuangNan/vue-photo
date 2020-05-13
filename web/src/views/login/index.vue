<template>
<section class="login-box">
<main class="login-container">
  <header class="login-header">
    <h1>{{ $t('route.login') }} - {{ $t('config.title') }}</h1>
    <LangSelect class="login-svg" />
  </header>
  <el-form class="login-form"
    :model="loginData"
    :rules="loginRules"
    status-icon
    ref="loginForm"
    label-width="auto"
    label-position="right">


    <el-form-item :label="$t('login.user')"  prop="user" ref="user">
      <el-tooltip effect="dark" placement="top"
        :content="$t('login.user-tip')" >
        <el-input type="text" v-model="loginData.user"
          :placeholder="$t('login.user-tip')"
          maxlength="20" show-word-limit
          autocomplete="off" @focus="clearValidate('user')">
        </el-input>
      </el-tooltip>
    </el-form-item>


    <el-form-item :label="$t('login.pass')" prop="pass" ref="pass">
      <el-tooltip effect="dark" placement="top"
        :content="$t('login.pass-tip')" >
        <el-input type="password" v-model="loginData.pass"
          :placeholder="$t('login.pass-tip')"
          show-password  maxlength="20"
          autocomplete="off" @focus="clearValidate('pass')" >
        </el-input>
      </el-tooltip>
    </el-form-item>

    <el-form-item :label="$t('login.code')" prop="code" ref="code">
      <el-tooltip effect="dark" placement="top"
        :content="$t('login.code-tip')" >
        <el-input type="text" class="login-code"
          v-model="loginData.code"
          :placeholder="$t('login.code-tip')"
          autocomplete="off" @focus="clearValidate('code')" >
        </el-input>
      </el-tooltip>
      <el-tooltip effect="dark" placement="top"
        :content="$t('login.code-refresh')" >
        <el-image class="login-img" :src="codeImgSrc"
          :alt="$t('login.code')" :title="$t('login.code-refresh')"
          @click="taggerImg">
        </el-image>
      </el-tooltip>
    </el-form-item>

    <el-form-item :label="$t('login.rem')">
      <el-tooltip effect="dark" placement="right"
        :content="$t('login.rem-tip')" >
        <el-switch v-model="loginData.rem" ></el-switch>
      </el-tooltip>
    </el-form-item>

    <el-button type="primary" class="login-sum"
      :loading="loading" @click.prevent="subData"
    >
      {{ $t('login.sum-btn') }}
    </el-button>
  </el-form>
  <footer class="login-footer">
      &copy; {{ new Date().getFullYear() }} {{ $t('config.title') }} {{ $t('config.copy') }}
  </footer>
</main>
</section>
</template>
<script>
import LangSelect from '@/components/LangSelect';
import { validUserName, validPassword, validCode } from '@/utils/validate';

export default {
  name: 'Login',
  components: {
    LangSelect,
  },
  data() {
    const validateUser = (rule, value, callback) => {
      if (validUserName(value)) callback();
      else callback(this.errInfo('user'));
    };
    const validatePass = (rule, value, callback) => {
      if (validPassword(value)) callback();
      else callback(this.errInfo('pass'));
    };
    const validateRandomCode = (rule, value, callback) => {
      if (validCode(value)) callback();
      else callback(this.errInfo('code'));
    };
    return {
      codeImgSrc: `${this.$store.getters.code_img}?t=${new Date().getTime()}`,
      loading: false,
      loginData: {
        user: '',
        pass: '',
        code: '',
        rem: false,
        time: new Date().getTime(),
      },
      loginRules: {
        user: [
          { required: true, validator: validateUser, trigger: 'blur' },
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        code: [
          { required: true, validator: validateRandomCode, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    taggerImg() {
      this.codeImgSrc = `${this.$store.getters.code_img}?t=${new Date().getTime()}`;
    },
    clearValidate(target) {
      this.$refs[target].clearValidate();
    },
    errInfo(val) {
      return new Error(this.$i18n.t(`login.${val}-tip`));
    },
    subData() {
      this.loading = true;
      // 验证表单
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // TODO 登录啦
          await this.$store.dispatch('user/login', this.loginData)
            .then(res => {
              this.$message({
                showClose: true,
                type: 'success',
                message: res.msg,
              });
              // 路由跳转
              this.$router.push({ name: 'Dashboard' });
            }).catch(() => {});
        }
        this.loading = false; // 加载状态
        this.taggerImg(); // 验证码
      });
    },
  },
  watch: {
    '$i18n.locale': function () {
      this.$refs.loginForm.clearValidate();
    },
  },
};
</script>

<style lang="scss" scope>
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.login-container {
    height: 100%;
    height: 100%;
    flex: 1;
    box-sizing: border-box;
    padding: 0.2rem 0.3rem;
    flex-direction: column;
  }
  .login-header {
    height: 0.6rem;
    h1{
      float: left;
      width: 86%;
      margin: 0;
      line-height: 0.6rem;
      font-size: 0.2rem;
      text-align: center;
    }
    .login-svg {
      margin-top: 0.18rem;
      font-size: 0.12rem;
    }
  }
  .login-form {
    flex: 1;
    box-sizing: border-box;
    .login-code {
      width: 55%;
    }
    .login-img {
      cursor: pointer;
      width: 45%;
      height: 0.4rem;
      float: right;
    }
    .login-sum {
      width: 100%;
    }
  }
  .login-footer {
    line-height: 0.6rem;
    text-align: center;
  }
  @media (min-height: 580px) and (min-width: 768px) {
    .login-container {
      margin-top: -15%;
    }
  }
  @media (min-width: 768px){
    .login-container {
      width: 4.2rem;
      height: 4.2rem;
      flex: none;
      border-radius: 0.2rem;
      box-shadow: 0 0 0.2rem #eaeaea;
    }
    .login-header  {
      h1 {
        text-indent: 20%;
      }
    }
  }
</style>

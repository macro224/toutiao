<template>
  <div class="login">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <ttinput placeholder="请输入手机号" class="input" type="text" v-model="username"/>
        <ttinput placeholder="密码" class="input" type="password" v-model="password" />
      </div>
      <p class="tips">
        没有账号？
        <a href="#/zhuce" class>去注册</a>
      </p>
      <ttbutton class="button" txt="登录" @click="login"></ttbutton>
    </div>
  </div>
</template>

<script>
import ttbutton from '@/components/tt_button.vue'
import ttinput from '@/components/tt_input.vue'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    ttbutton, ttinput
  },
  methods: {
    login () {
      console.log(12)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>

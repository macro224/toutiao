<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <ttinput
          placeholder="手机号码"
          class="input"
          v-model="user.username"
        />
        <ttinput
          placeholder="昵称"
          class="input"
          v-model="user.nickname"
        />
        <ttinput
          placeholder="密码"
          class="input"
          type="password"
          v-model="user.password"
        />
      </div>
      <p class="tips">
        有账号？
        <a href="#/login" class>去登录</a>
      </p>
      <ttbutton class="button" txt="注册" @click="zhuce">注册</ttbutton>
    </div>
  </div>
</template>

<script>
import { postZhuce } from '@/api/user.js'
import ttinput from '@/components/tt_input.vue'
import ttbutton from '@/components/tt_button.vue'
export default {
  components: {
    ttinput, ttbutton
  },
  data () {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      }
    }
  },
  methods: {
    async zhuce () {
      let res = await postZhuce(this.user)
      if (res.data.message === '注册成功') {
        this.$router.push({ name: 'login' })
      }
      this.$toast.success(res.data.message)
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

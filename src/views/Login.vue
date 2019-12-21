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
        <ttinput placeholder="请输入手机号" class="input" type="text" v-model="users.username"/>
        <ttinput placeholder="密码" class="input" type="password" v-model="users.password" />
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
// 引入组件
import ttbutton from '@/components/tt_button.vue'
import ttinput from '@/components/tt_input.vue'
// 引入接口
import { postDenglu } from '@/api/user.js'

export default {
  data () {
    return {
      users: {
        username: '10086',
        password: '123'
      }
    }
  },
  components: {
    ttbutton, ttinput
  },
  methods: {
    async login () {
      let res = await postDenglu(this.users)
      if (res.data.message === '登录成功') {
        // 将令牌存储在本地
        localStorage.setItem('toutiao', res.data.data.token)
        // 跳转页面
        this.$router.push({ path: `/about/${res.data.data.user.id}` })
      }
      // 给出提示
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

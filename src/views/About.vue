<template>
  <div class="about">
    <router-link :to="`/editAbout/${user.id}`">
      <div class="profile">
        <img :src="locaimg+user.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{user.nickname}}
          </div>
          <div class="time">{{user.create_date|dataFormat()}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <ttcell left="我的关注" right="关注的用户"></ttcell>
    <ttcell left="我的跟帖" right="跟帖 / 回复"></ttcell>
    <ttcell left="我的收藏" right="文章 / 视频"></ttcell>
    <ttcell left="设置" ></ttcell>
    <div class="box">
      <ttbutton txt="进入首页" @click="$router.push({name:'index'})"></ttbutton>
      <ttbutton txt="退出" @click="tuichu"></ttbutton>
    </div>
  </div>
</template>

<script>
import ttcell from '@/components/tt_cell.vue'
import ttbutton from '@/components/tt_button.vue'
import { getUser } from '@/api/user.js'
import { dataFormat } from '@/utils/myfilers.js'
export default {
  data () {
    return {
      // 定义用户信息
      user: '',
      // 基地址
      locaimg: localStorage.getItem('locaimg')
    }
  },
  components: {
    ttcell, ttbutton
  },
  filters: {
    dataFormat
  },
  async mounted () {
    // 根据用户id获取用户信息
    let res = await getUser(this.$route.params.id)
    if (res.status === 200) {
      // 将获取到的赋值给定义的用户信息来进行页面渲染
      this.user = res.data.data
    }
  },
  methods: {
    // 点击退出按钮
    tuichu () {
      // 提示退出成功
      this.$toast.success('退出成功！')
      // 删除本地存储中的令牌token
      localStorage.removeItem('toutiao')
      // 跳转回登录页面
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang='less' scoped>
.about{
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  .box{
    margin-top: 45vw*100/360;
    text-align: center;
    .btn{
      width: 45%;
      margin: 0 8vw*100/360;
      display: inline-block;
    }
  }
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;
  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }
  .profile-center {
    flex: 1;
    padding: 0 10px;
  }
  .name {
    span {
      color: #75b9eb;
    }
  }
  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }

}

</style>

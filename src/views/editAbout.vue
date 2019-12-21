<template>
  <div class="edit">
    <ttheader title="编辑资料">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </ttheader>
    <div class="head">
      <img alt :src="locaimg+user.head_img" />
    </div>
    <ttcell left="昵称" :right="user.nickname"></ttcell>
    <ttcell left="密码" right="******"></ttcell>
    <ttcell left="性别" :right="user.gender===1?'男':'女'"></ttcell>
  </div>
</template>

<script>

import ttheader from '@/components/tt_header.vue'
import ttcell from '@/components/tt_cell.vue'
import { getUser } from '@/api/user.js'
export default {
  data () {
    return {
      // 定义的用户信息
      user: '',
      locaimg: localStorage.getItem('locaimg')
    }
  },
  components: {
    ttheader, ttcell
  },
  async mounted () {
    let res = await getUser(this.$route.params.id)
    if (res.status === 200) {
      this.user = res.data.data
    }
    console.log(res)
  }
}
</script>

<style lang="less" scoped>
.edit{
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
}
// 修改元素的大小
/deep/.van-uploader__upload {
  width: 100 / 360 * 100vw;
  height: 100 / 360 * 100vw;
}
// 设置元素的对齐方式
/deep/.van-uploader {
  // 实现任意元素居中
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
</style>

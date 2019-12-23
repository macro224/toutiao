<template>
  <div class="edit">
    <ttheader title="编辑资料">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </ttheader>
    <div class="head">
      <img alt :src="locaimg+user.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <ttcell left="昵称" :right="user.nickname" @click="nameshow=!nameshow"></ttcell>
    <ttcell left="密码" right="******" @click="passshow=!passshow"></ttcell>
    <ttcell left="性别" :right="user.gender===1?'男':'女'" @click="sexshow=!sexshow"></ttcell>
    <!-- 修改昵称 -->
    <van-dialog
      v-model="nameshow"
      title="修改昵称"
      show-cancel-button
      @confirm="xiugaiName" >
      <van-cell-group>
        <van-field :value="user.nickname" placeholder="请输入昵称" ref="nickname"/>
      </van-cell-group>
    </van-dialog>
    <!-- 修改密码 -->
    <van-dialog
      v-model="passshow"
      title="修改密码"
      show-cancel-button
      @confirm="xiugaiPass"
      :before-close="close">
        <van-field
          v-model="password.old"
          type="password"
          label="旧密码"
          placeholder="请输入旧密码"
          required
        />
        <van-field
          v-model="password.new"
          type="password"
          label="新密码"
          placeholder="请输入新密码"
          required
        />
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog
      v-model="sexshow"
      title="修改性别"
      show-cancel-button
      @confirm="xiugaiSex" >
      <van-picker :columns="columns" @change="onChange" :default-index="user.gender" />
    </van-dialog>

  </div>
</template>

<script>

import ttheader from '@/components/tt_header.vue'
import ttcell from '@/components/tt_cell.vue'
import { getUser, postEdituser } from '@/api/user.js'
import { postFile } from '@/api/files.js'
export default {
  data () {
    return {
      // 定义的用户信息
      user: '',
      id: this.$route.params.id,
      locaimg: localStorage.getItem('locaimg'),
      nameshow: false,
      passshow: false,
      password: {
        old: '',
        new: ''
      },
      sexshow: false,
      columns: ['女', '男'],
      sexIndex: ''
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
  },
  methods: {
    // 修改昵称
    async xiugaiName () {
      let nickname = this.$refs.nickname.$refs.input.value
      let res = await postEdituser(this.id, { nickname })
      if (res.data.message === '修改成功') {
        this.$toast.success(res.data.message)
        this.user.nickname = nickname
      }
    },
    // 修改密码
    async xiugaiPass () {
      if (this.password.old === this.user.password) {
        let res = await postEdituser(this.id, { password: this.password.new })
        if (res.data.message === '修改成功') {
          this.$toast.success(res.data.message)
          this.user.password = this.password.new
          this.password = { old: '', new: '' }
        }
      } else {
        this.$toast.fail('旧密码输入不对，请重新输入！')
      }
    },
    close (action, done) {
      if (this.password.old !== this.user.password && action === 'confirm') {
        done(false)
      } else {
        done()
      }
    },
    // 修改性别
    onChange (picker, value, index) {
      this.sexIndex = index
    },
    async xiugaiSex () {
      // 判断如果用户没触发change事件的情况
      if (this.sexIndex === '') {
        this.sexIndex = this.user.gender
      }
      let res = await postEdituser(this.id, { gender: this.sexIndex })
      if (res.data.message === '修改成功') {
        this.$toast.success(res.data.message)
        this.user.gender = this.sexIndex
      }
    },
    // 修改头像
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file.file)
      let filedata = new FormData()
      // 获取并添加图片数据
      filedata.append('file', file.file)
      // 发请求获取上传的图片信息
      let resimg = await postFile(filedata)
      if (resimg.data.message === '文件上传成功') {
        // 发请求将获取到的图片信息更改到数据库
        let res = await postEdituser(this.id, { head_img: resimg.data.data.url })
        if (res.data.message === '修改成功') {
          // 完成后给出提示并更新页面数据
          this.$toast.success(res.data.message)
          this.user.head_img = resimg.data.data.url
        } else {
          this.$toast.fail(res.data.message)
        }
      }
    }
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

<template>
  <div class="comment">
    <div class="addcomment" v-show='!isFocus'>
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span v-if="isshow" class="comment" @click="$router.push({path:`/comment/${xinwen.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>{{xinwen.comment_length}}</em>
      </span>
      <!-- 收藏图标 -->
      <i v-if="isshow" class="iconfont iconshoucang" @click="shoucang" :class="{active:xinwen.has_star}"></i>
      <!-- 分享图标 -->
      <i v-if="isshow" class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show='isFocus'>
        <textarea  ref='commtext' rows="5" :placeholder="placeholder"></textarea>
        <div>
            <span @click="fabu">发布</span>
            <span @click='fashe'>取消</span>
        </div>
    </div>
  </div>
</template>

<script>
import { getShoucang, postPinglun } from '@/api/xinwen.js'

export default {
  props: ['xinwen', 'isshow', 'dangepl'],
  data () {
    return {
      isFocus: false,
      placeholder: '',
      // 文章id
      id: this.$route.params.id
    }
  },
  methods: {
    //   获取焦点时触发
    handlerFocus () {
      this.isFocus = !this.isFocus
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 1)
    },
    // 点击收藏图标
    async shoucang () {
      let res = await getShoucang(this.xinwen.id)
      //   给出提示
      this.$toast({
        type: 'success',
        message: res.data.message,
        // 提示框显示时间
        duration: 500
      })
      //   更新页面数据
      this.xinwen.has_star = !this.xinwen.has_star
    },
    // 点击发布按钮
    async fabu () {
      let data = {
        content: this.$refs.commtext.value
      }
      if (this.dangepl) {
        data.parent_id = this.dangepl.id
      }
      // 判断输入框内不能为空
      if (data.content !== '') {
        let res = await postPinglun(this.id, data)
        if (res.data.message === '评论发布成功') {
          this.isFocus = false
          this.$refs.commtext.value = ''
          // 通知父组件刷新页面
          this.$emit('shuaxin')
        }
        this.$toast.success(res.data.message)
      } else {
        this.$toast.fail('请输入内容！')
      }
    },
    // 点击取消按钮
    fashe () {
      this.isFocus = false
      this.placeholder = ''
      this.$emit('quxiao')
    }
  },
  // 监听单个评论数据
  watch: {
    dangepl () {
      // 数据变化让评论框显示 并在评论框内填入回复对象的昵称
      if (this.dangepl) {
        this.isFocus = true
        // 获取焦点
        setTimeout(() => {
          this.$refs.commtext.focus()
        }, 1)
        this.placeholder = '@' + this.dangepl.user.nickname
      }
    }
  }
}
</script>

<style lang='less' scoped>
.comment{
    position: fixed;
    bottom: 0;
    left: 0;
}
.inputcomment{
    padding: 10px;
    box-sizing: border-box;
    width: 100vw;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea{
        flex: 3;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
    }
}
.addcomment {
  width: 100vw;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  .active{
      color: red;
  }
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>

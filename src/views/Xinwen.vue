<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="guanzhu" :class="{active:!xinwen.has_follow}">
        {{xinwen.has_follow?'已关注':'关注'}}
      </span>
    </div>
    <!-- 内容部分 -->
    <div class="detail">
      <div class="title">{{xinwen.title}}</div>
      <div class="desc">
        <span>{{xinwen.user && xinwen.user.nickname}}</span> &nbsp;&nbsp;
        <span>{{xinwen.create_date | dataFormat()}}</span>
      </div>

      <div class="content" v-if="xinwen.type===1" v-html="xinwen.content"></div>
      <video v-if="xinwen.type===2" :src="xinwen.content" controls></video>

      <div class="opt">
        <!-- 点赞按钮 -->
        <span class="like" @click="dianzan" :class="{active:xinwen.has_like}">
          <van-icon name="good-job-o"  />{{xinwen.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <!-- 评论列表 -->
      <div class="item" v-for="item in pinglunList" :key="item.id">
        <div class="head">
          <img :src="locaimg+item.user.head_img" alt />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{item.content}}</div>
      </div>
      <!-- 更多按钮 -->
      <div class="more" v-if="pinglunList.length!==0">更多跟帖</div>
      <p v-else>暂无精彩跟帖 ~ '_' ~</p>
    </div>
    <ttcomment :xinwen="xinwen" :isshow="true"></ttcomment>
  </div>
</template>

<script>
import { getXinwen, getPinglun, getDianzan } from '@/api/xinwen.js'
import { getGuanzhu, getUnguanzhu } from '@/api/user.js'
import { dataFormat } from '@/utils/myfilers.js'
import ttcomment from '@/components/tt_comment.vue'

export default {
  data () {
    return {
      locaimg: localStorage.getItem('locaimg'),
      // 新闻信息
      xinwen: '',
      // 评论列表
      pinglunList: ''
    }
  },
  async mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let res = await getXinwen(this.$route.params.id)
    if (res.status === 200) {
      this.xinwen = res.data.data
    }
    console.log(this.xinwen)

    // 获取评论列表
    let pl = await getPinglun(this.xinwen.id, { pageSize: 5 })
    if (pl.status === 200) {
      this.pinglunList = pl.data.data
    }
    // console.log(this.pinglunList)
  },
  methods: {
    // 关注用户和取消关注用户
    async guanzhu () {
      let res
      // 如果has_follow为true的时候就触发取消关注
      if (this.xinwen.has_follow === true) {
        res = await getUnguanzhu(this.xinwen.user.id)
      } else {
        res = await getGuanzhu(this.xinwen.user.id)
      }
      // 给出提示
      this.$toast.success(res.data.message)
      // 更改数据，刷新页面
      this.xinwen.has_follow = !this.xinwen.has_follow
    },
    // 点赞
    async dianzan () {
      let res = await getDianzan(this.xinwen.id)
      console.log(res)
      if (res.data.message === '点赞成功') {
        this.xinwen.like_length++
      } else {
        this.xinwen.like_length--
      }
      //   给出提示
      this.$toast({
        type: 'success',
        message: res.data.message,
        // 提示框显示时间
        duration: 500
      })
      //   更新页面数据
      this.xinwen.has_like = !this.xinwen.has_like
    }
  },
  // 添加过滤器--格式化日期
  filters: {
    dataFormat
  },
  components: {
    ttcomment
  }
}
</script>

<style lang='less' scoped>
.articaldetail{
  padding-bottom: 88px;
  background: #f2f2f2;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    border: 1px solid #ccc;
    color: #333;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      border: 0;
      color: #fff;
      background-color: #f00;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
  video {
    width: 100%;
    margin-bottom: 10px;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .like{
    &.active{
      color:red
    }
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}

/deep/.photo {
  img {
    width: 100% !important;
    display: block;
  }
}
</style>

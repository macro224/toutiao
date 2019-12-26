<template>
  <div class="comments">
    <!-- 头部栏 -->
    <ttheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </ttheader>
    <!-- 评论列表 -->
    <div class="commentList">
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
        <ttcommentitem v-if="item.parent" :pinglun="item"></ttcommentitem>
      </div>
    </div>
    <!-- 底部栏 -->
    <ttcomment :isshow="false"></ttcomment>
  </div>
</template>

<script>
import ttheader from '@/components/tt_header.vue'
import ttcomment from '@/components/tt_comment.vue'
import ttcommentitem from '@/components/tt_comment_item.vue'
import { getPinglun } from '@/api/xinwen.js'

export default {
  data () {
    return {
      locaimg: localStorage.getItem('locaimg'),
      // 评论列表
      pinglunList: ''
    }
  },
  async mounted () {
    // 获取评论列表
    let pl = await getPinglun(this.$route.params.id)
    if (pl.status === 200) {
      this.pinglunList = pl.data.data
    }
    // 打印输出评论列表
    console.log(this.pinglunList)
  },
  components: {
    ttheader, ttcomment, ttcommentitem
  }
}
</script>

<style lang='less' scoped>
.comments{
    background: #f2f2f2;
}
.commentList {
  border-top: 5px solid #ddd;
  padding: 0 15px;
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
</style>

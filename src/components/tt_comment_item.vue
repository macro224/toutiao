<template>
  <div class="commentitem">
    <div class="head">
      <div>
        <span class="cname">{{pinglun.parent.user.nickname}}</span>
        <span>2小时前</span>
      </div>
      <span @click="fashe(pinglun.parent)">回复</span>
    </div>
    <div class="text">{{pinglun.parent.content}}</div>
    <mycomment v-if="pinglun.parent.parent" @huifu="fashe" :pinglun="pinglun.parent"></mycomment>
  </div>
</template>

<script>
export default {
  name: 'mycomment',
  props: ['pinglun'],
  methods: {
    fashe (pinglun) {
      this.$emit('huifu', pinglun)
    }
  }
}
</script>

<style lang='less' scoped>
.commentitem {
    border: 1px solid #ccc;
    padding:10px;
    box-sizing: border-box;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      flex: 1;
      display: flex;
      > span {
        font-size: 12px;
        color: #999;
      }
      .cname{
          margin-right: 10px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 13px;
    color: #333;
    padding: 10px 0;
  }
}
</style>

<template>
  <div class="index">
    <!-- 顶部 -->
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />搜索商品
      </div>
      <van-icon name="manager-o" class="icon" />
    </div>
    <!-- 导航栏 -->
    <van-tabs v-model="active" swipeable >
        <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
            <ttxinwen :xinwen="item" v-for="item in cate.xinwenList" :key="item.id"></ttxinwen>
        </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getcateList } from '@/api/cate.js'
import { getxinwenList } from '@/api/xinwen.js'
import ttxinwen from '@/components/tt_xinwen.vue'

export default {
  data () {
    return {
      // 判断是否登录，登录则有关注栏
      active: localStorage.getItem('toutiao') ? 1 : 0,
      // 栏目列表
      cateList: ''
    }
  },
  async mounted () {
    // 获取栏目列表
    let cate = await getcateList()
    // console.log(cate)
    if (cate.status === 200) {
      this.cateList = cate.data.data
      this.cateList = this.cateList.map(value => {
        return {
          // 保留原有数据
          ...value,
          // 新加的存放新闻列表数组
          xinwenList: []
        }
      })
    }
    // 获取新闻列表
    this.getXinwen()
  },
  methods: {
    async getXinwen () {
      // 新闻列表
      let res = await getxinwenList({ category: this.cateList[this.active].id })
      if (res.status === 200) {
      // 将获取到的新闻列表存放到新建数组里
        this.cateList[this.active].xinwenList = res.data.data
      // console.log(this.cateList)
      }
    }
  },
  watch: {
    // 监听active值，如果栏目切换就重新获取新闻列表
    active () {
      // 判断当没有新闻列表的时候才获取，优化性能
      if (this.cateList[this.active].xinwenList.length === 0) {
        // 获取新闻列表
        this.getXinwen()
      }
    }
  },
  components: {
    ttxinwen
  }
}
</script>

<style lang="less" scoped>
.index{
    background: #f2f2f2;
}
.header {
  color: #fff;
  background: #f00;
  height: 55vw * 100/360;
  padding: 0 15vw * 100/360;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span.icon {
    font-size: 55vw * 100/360;
  }
  .icon {
    font-size: 28vw * 100/360;
  }
  .center {
    flex: 1;
    height: 65%;
    font-size: 15px;
    margin: 0 25vw * 100/360;
    border-radius: 200vw * 100/360;
    background: rgba(250, 250, 250, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      margin-right: 8px;
    }
  }
}
/deep/.van-tabs__nav{
    background: #e4e4e4;
}
</style>

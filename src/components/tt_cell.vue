<template>
<div class="cell" @click="fashe">
    <div class="left">{{left}}</div>
    <div class="right">
        {{right}}
        <span class="iconfont iconjiantou1"></span>
    </div>
</div>
</template>

<script>
export default {
  props: ['left', 'right'],
  methods: {
    fashe (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="less" scoped>
.cell{
    height: 60vw*100/360;
    margin-left: 20vw*100/360;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right{
        padding-right: 20vw*100/360;
        font-size: 13vw*100/360;
        color: rgba(148, 148, 148, 0.8);
    }
    .left{
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        color: rgba(0, 0, 0, 0.8);
    }
}
</style>

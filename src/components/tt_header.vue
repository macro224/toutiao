<template>
<div class="header">
    <div class="left">
        <slot name="left"></slot>
    </div>
    <span>{{title}}</span>
    <div class="right">
        <slot name="right"></slot>
    </div>
</div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
    .header{
        height: 60vw*100/360;
        padding: 0 20vw*100/360;
        border-bottom: 1px solid #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>

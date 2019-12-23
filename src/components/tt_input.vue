<template>
    <input :type="type" :value="value" @input='handlerinput' @blur='fcblur'>
</template>

<script>
export default {
  props: ['type', 'value', 'rule', 'err_message'],
  methods: {
    handlerinput (e) {
      // 双向绑定
      let value = e.target.value
      this.$emit('input', value)
    },
    fcblur (e) {
      let zz = new RegExp(this.rule)
      if (this.rule && !zz.test(e.target.value)) {
        this.$toast.fail(this.err_message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
input{
    width: 314*100vw/360;
    height: 40*100vw/360;
    border:none;
    outline: none;
    border-bottom: 2px solid rgb(117,117,117);
    font-size: 18px;
    margin: 5px 0;
    background-color: transparent;
}
.error{
    border-bottom-color:red;
}
.success{
    border-bottom-color:green;
}
</style>

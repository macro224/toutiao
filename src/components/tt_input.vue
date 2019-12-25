<template>
    <input :type="type" :value="value" @input='handlerinput' @blur='fcblur'>
</template>

<script>
export default {
  props: ['type', 'value', 'rule', 'msg_err'],
  methods: {
    handlerinput (e) {
      // 双向绑定
      let value = e.target.value
      this.$emit('input', value)
    },
    fcblur (e) {
      if (this.rule && !this.rule.test(e.target.value)) {
        this.$toast({
          message: this.msg_err,
          duration: 400,
          type: 'fail'
        })
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

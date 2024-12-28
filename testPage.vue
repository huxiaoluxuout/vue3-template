<template>
  <view>

    <view style="position:fixed;bottom:420px;left: 0;right: 0;display:flex;justify-content: center;transform: translateY(50%);">
      <test-animation-image width="500rpx" is-open :rotate-step="10" @centerClick="centerClick" @itemClick="itemClick"></test-animation-image>
    </view>
  </view>
</template>

<script>
export default {

  methods: {
    centerClick(isOpen) {
     /* uni.showToast({
        title: isOpen ? '打开' : '关闭',
        icon: 'none'
      })*/
    },
    itemClick(index) {
      uni.showToast({
        title: `点击了第${index + 1}个`,
        icon: 'none'
      });
    }
  }
}


</script>


<style scoped lang="scss">

</style>

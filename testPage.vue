<template>
  <view>

    <view style="position:fixed;bottom:20px;left: 0;right: 0;display:flex;justify-content: center;transform: translateY(50%);">
      <ylx-test-animation-image width="500rpx" is-open :rotate-step="5" @centerClick="centerClick" @itemClick="itemClick"></ylx-test-animation-image>
    </view>
  </view>
</template>

<script>
export default {

  methods: {
    centerClick(isOpen) {
      uni.showToast({
        title: isOpen ? '打开' : '关闭',
        icon: 'none'
      });
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

<template>
  <view class="page-content">

    <image class="top-img" mode="widthFix" src="./top-img.png"/>

    <view class="select-content">
      <view class="select-content-inner">
        <view class="title-wrapper">
          <image class="title-img" src="./title-icon-img.png"/>
          <view class="title-text">选择一个身份吧</view>
          <image class="title-img" src="./title-icon-img.png"/>
        </view>
        <button class="btn" @click="user">我是用户</button>
        <button class="btn" @click="master">我是维修师傅</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    user() {
      console.log('我是用户')
    },

    master() {
      console.log('我是维修师傅')

    }
  }
}



</script>


<style scoped lang="scss">

.page-content {
  /* #ifdef WEB */
  min-height: calc(100vh - var(--window-top));
  /* #endif */

  /* #ifndef WEB */
  min-height: 100vh;
  /* #endif */
  background-color: #FFEABF;
  padding-bottom: 50rpx;

}

.top-img {
  display: block;
  width: 750rpx;
  background-color: #FFEABF;
}

.select-content {
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 30rpx;
  margin: 40rpx 30rpx 0;

  background-color: #FFCA7E;

  .select-content-inner {
    margin: auto;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30rpx 70rpx 100rpx;

    border-radius: 20rpx;

    .title-wrapper {
      margin-top: 10rpx;
      padding: 0 20rpx;
      display: flex;
      align-items: center;
      gap: 40rpx;

      .title-img {
        width: 50rpx;
        height: 50rpx;
        display: block;
        flex-shrink: 0;
      }

      .title-text {
        flex: 1;
        text-align: center;
        font-size: 16px;
        color: #E12727;
        font-weight: 700;
      }
    }

    .btn {
      color: #fff;
      font-size: 22px;
      border-radius: 20rpx;
      margin-top: 62rpx;
      background: linear-gradient(90deg, #FA541D 0%, #FCD25B 100%);
      line-height: 2.8;

    }

    .btn:after {
      border: none;
    }
  }
}

</style>

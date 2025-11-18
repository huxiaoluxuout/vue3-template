<template>
  <view class="page-content-tabbar useLogin" :style="{'--navbar-height':`${navbarHeight}px`}">
<!--  <view class="page-content useLogin" :style="{'&#45;&#45;navbar-height':`${navbarHeight}px`}">-->
    <ylx-navbar
        :configNavBar="{ hiddenLeftIcon: false,hiddenBorder: true}"
        :navbar-style="{ background:'rgb(152 207 250)'}"
        @navbarHeight="(e)=>navbarHeight=e" title="登录">
    </ylx-navbar>
    <view class="page-inner-bg"></view>
    <view class="useLogin-flex">
      <ylx-gap height="100px"></ylx-gap>
      <view class="useLogin-flex">
        <ylx-image width="200rpx" src="/static/logo.png"></ylx-image>
        <view class="title">您好!</view>
        <view class="subtitle">欢迎使用</view>

      </view>

      <view class="desc">为提供优质服务，我们需要您的授权</view>

      <ylx-gap height="30px"></ylx-gap>


      <!--  #ifdef MP -->
      <button class="useLogin-btn" open-type="getPhoneNumber" @getphonenumber="getMobilePhoneHandler">MP 手机号授权登录</button>
      <!-- #endif -->

      <!--  #ifdef WEB || APP-PLUS-->
      <button class="useLogin-btn">WEB|APP 授权登录</button>
      <!-- #endif -->

    </view>


    <ylx-tabbar :INDEX="2"></ylx-tabbar>
  </view>
</template>

<script setup>
import {ref} from 'vue'
import {ylxLoginCode, ylxRedirectTo, ylxTargetPageDecode} from "@/utils/uniTools";
import {onLoad} from '@dcloudio/uni-app'


import {useUserStore} from "@/stores/user";
import {ylxIntercept} from "@/ylxuniCore/useylxuni";
import YlxTabbar from "@/components/ylx-components/ylx-tabbar.vue";

const userStore = useUserStore();

const navbarHeight = ref(44)

let toTargetPage = ''
onLoad((options) => {

  toTargetPage = ylxTargetPageDecode(options)
  console.log('toTargetPage', toTargetPage)
})



// 获取手机号
function getMobilePhoneHandler(btnEvent) {
  // console.log('btnEvent',btnEvent)
  const {iv, encryptedData, code: phoneCode} = btnEvent.detail
  ylxLoginCode().then(loginCodeRes => {
    // console.log('loginCodeRes', loginCodeRes)
    // 后端登录接口
    wxLogin({
      code: loginCodeRes.code,
      encryptedData,
      iv,
      phone: phoneCode,
      avatar: '',
      name: '',
    }).then((loginRes) => {
      const resData = loginRes.data
      ylxIntercept.setIntercept('useLogin',true)

      // 分享的目标页
      if(toTargetPage){
        ylxRedirectTo(toTargetPage)
      }else {
        uni.navigateBack()

      }
    })
  })
}


</script>
<script>
export default {
  options: {
    styleIsolation: 'shared'
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
  margin: 0 30rpx;
}

.useLogin {
  position: relative;
}

.page-inner-bg {
  position: absolute;
  top: 0;
  right: -30rpx;
  left: -30rpx;
  height: 568rpx;
  background: linear-gradient(180deg, #81C3F5 0%, #C9E5FB 55%, rgba(202, 230, 252, 0) 100%);

}

.useLogin-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.title {
  color: #272729;
  font-weight: bold;
  font-size: 24px;
  margin-top: 30rpx;
}

.subtitle {
  color: #272729;
  font-weight: bold;
  font-size: 18px;
  margin-top: 30rpx;

}

.desc {
  margin-top: 10vh;
  font-size: 14px;
  color: #000;
}

/*--------------------------------------*/
.useLogin-btn {
  color: #ffffff;
  font-weight: bolder;
  background: #48A6EE !important;
  width: 90% !important;
  border-radius: 100px;
  font-size: 14px;
  line-height: 3.4;
}

/*--------------------------------------*/


</style>

<template>
  <view class="page-content login" :style="{'--navbar-height':`${navbarHeight}px`}">
    <ylx-navbar
        :configNavBar="{ hiddenLeftIcon: false,hiddenBorder: true}" bg-color="transparent"
        @navbarHeight="(e)=>navbarHeight=e">
    </ylx-navbar>

    <view class="login-flex">
      <ylx-gap height="100px"></ylx-gap>
      <view class="login-flex">
        <ylx-image width="200rpx" src="/static/logo.png"></ylx-image>
        <view class="title">您好!</view>
        <view class="subtitle">欢迎使用</view>

      </view>


      <ylx-gap height="30px"></ylx-gap>


      <!--  #ifdef MP -->
      <ylx-button custom-class="login-btn active-bgc" custom-style="font-size:14px;line-height: 3.4;" open-type="getPhoneNumber" @getphonenumber="getMobilePhone"
                  text="微信一键登录"></ylx-button>
      <!-- #endif -->

      <!--  #ifdef WEB || APP-PLUS-->
      <ylx-button custom-class="login-btn active-bgc" custom-style="font-size:14px;line-height: 3.4;" @btnClick="getTestToken"
                  text="微信一键登录"></ylx-button>
      <!-- #endif -->


    </view>
  </view>
</template>

<script setup>
import {ref} from 'vue'
import {ylxLoginCode, ylxRedirectTo} from "@/utils/uniTools";
import {onLoad} from '@dcloudio/uni-app'

import {localToken, wxRegister} from "@/network/apis/meiFa";
import {useUserStore} from "@/stores/user";

const userStore = useUserStore();

const navbarHeight = ref(44)

const typeValue = ref('1')
onLoad((options) => {
  typeValue.value = options.type
})


// 获取手机号
function getMobilePhone(btnEvent) {
  ylxLoginCode().then(loginCodeRes => {
    wxRegister({
      phone_code: btnEvent.detail.code,
      code: loginCodeRes.code,
    }).then((loginRes) => {
      const resData = loginRes.data
      setToken(resData)
    })
  })
}

const setToken = (resData) => {
  userStore.login(resData)

  uni.setStorage({
    key: 'token',
    data: resData.token,
    success: function () {
      ylxRedirectTo('pages/index/index')

    }
  })
}

// 测试使用
const getTestToken = () => {
  localToken().then(loginRes => {
    const resData = loginRes.data
    setToken(resData)
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

.login-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.title{
  color: #272729;
  font-weight: bold;
  font-size: 24px;
  margin-top: 20rpx;
}
.subtitle{
  color: #272729;
  font-weight: bold;
  font-size: 16px;
  margin-top: 10rpx;

}

/*--------------------------------------*/
:deep(.login-btn) {
  font-size: 18px;
  color: #ffffff;
  font-weight: bolder;
  background: #272729 !important;
  width: 90% !important;

}


.page-content .active-bgc.active-bgc.active-bgc.active-bgc {
  background-color: #272729 !important;
}

/*--------------------------------------*/


</style>

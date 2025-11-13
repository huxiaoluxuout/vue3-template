<template>
  <view class="page-content-tabbar">
    mime lorem*12
    <ylx-navbar title="我的" bg-color="#fff"></ylx-navbar>
    登录状态：{{ hasLogin2 }}
<button @click="loginFn">登录</button>
    登录状态 hasLogin3：{{ hasLogin3 }}


    <ylx-tabbar :INDEX="1"></ylx-tabbar>
  </view>
</template>
<script setup>
import {ref, computed, watch, reactive} from 'vue';

import {onLoad, onTabItemTap, onReachBottom, onPullDownRefresh} from '@dcloudio/uni-app'
import {ylxInterceptorCall} from "@/ylxuniCore/useylxuni";

const hasLogin2 = ref(ylxInterceptorCall.getIntercept.login)
const hasLogin3 = computed(() => ylxInterceptorCall.getIntercept.login)

function loginFn() {
  ylxInterceptorCall.setInterceptKey('login',!ylxInterceptorCall.getInterceptKey('login'))
}
</script>


<style scoped lang="scss">


</style>

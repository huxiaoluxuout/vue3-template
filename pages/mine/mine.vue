<template>
  <view class="page-content-tabbar">
    mime lorem*12
    <ylx-navbar title="我的" bg-color="#fff"></ylx-navbar>
    登录状态：{{ hasLogin2 }}
<button @click="loginFn">登录</button>
    登录状态 hasLogin3：{{ hasLogin3 }}


  </view>
</template>
<script setup>
import {ref, computed, watch, reactive} from 'vue';

import {onLoad, onTabItemTap, onReachBottom, onPullDownRefresh} from '@dcloudio/uni-app'
import {ylxIntercept} from "@/ylxuniCore/useylxuni";

const hasLogin2 = ref(ylxIntercept.getIntercepts.login)
const hasLogin3 = computed(() => ylxIntercept.getIntercepts.login)

function loginFn() {
  ylxIntercept.setIntercept('login',!ylxIntercept.getIntercepts.login)
}
</script>


<style scoped lang="scss">


</style>

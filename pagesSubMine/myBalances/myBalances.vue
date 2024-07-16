<template>
  <view class="page-content">
    余额
  </view>
</template>

<script setup>

import {ref, computed,watch} from 'vue';
import {onLoad, onTabItemTap} from '@dcloudio/uni-app'

import {useUniEventBusVue3} from "@/utils/common/uniEventBus/useUniEventBusVue3";
import instanceUniEventBus from "@/utils/common/uniEventBus/instanceUniEventBus";
useUniEventBusVue3(()=>{
  instanceUniEventBus.onPageNotification((options)=>{
    console.log(options)
  })
})

</script>

<style scoped lang="scss">

</style>

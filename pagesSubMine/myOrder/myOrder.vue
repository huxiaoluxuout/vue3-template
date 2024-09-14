<template>
  <view className="page-content">
    <ylx-page-loading :show-loading="pageLoading"></ylx-page-loading>

  </view>
</template>

<script setup>

import {ref, computed, watch} from 'vue';
import {onLoad, onReachBottom, onPullDownRefresh} from '@dcloudio/uni-app'
import {ylxEventBus} from "@/ylxuniCore/useylxuni.js";
/*-------------------------------------------------------------*/

const pageLoading = ref(false)

const labelList = ref([
  {id: 0, text: '全部'},
  {id: 1, text: '待付款'},
  {id: 2, text: '待美发'},
  {id: 3, text: '美发中'},
  {id: 4, text: '待评价'},
  {id: 5, text: '已完成'},
])
const activeIds = ref([0])
const activeStatus = computed(() => activeIds.value[0])
/*-------------------------------------*/

ylxEventBus.on(({args, source}) => {
  console.log('pageAlias',source)

})

</script>

<style scoped lang="scss">

</style>

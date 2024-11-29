<template>
  <view className="page-content">
    <ylx-page-loading :show-loading="pageLoading"></ylx-page-loading>
    <view>time:{{params.time}}</view>
    <view>name:{{params.name}}</view>

    <button @click="emitBackPage">向上一页发送数据</button>
    <button @click="toPage">跳转order详情</button>
    <button @click="closef1">closef1</button>
  </view>
</template>

<script setup>

import {ref, computed, watch} from 'vue';
import {onLoad, onReachBottom, onPullDownRefresh} from '@dcloudio/uni-app'
import {ylxEventBus} from "@/ylxuniCore/useylxuni.js";
import {ylxNavigateTo} from "@/utils/uniTools";
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


const params = ref('')

ylxEventBus.on(({args,source})=>{
  params.value=args[0].params
  args[0].thenCallback()
  console.log('1',args[0].params)

})

ylxEventBus.on(({args,source})=>{
  console.log('2',args[0].params)
  params.value=args[0].params

  args[0].thenCallback()


})

function f1({args,source}) {
  params.value=args[0].params

  console.log('f1',args[0].params.time)
}
ylxEventBus.on(f1)
ylxEventBus.on(f1)


function closef1() {
  ylxEventBus.clear(f1,{del:true})
}
function toPage() {
ylxNavigateTo('pagesSubMine/orderDetails')
}
function emitBackPage() {
  ylxEventBus.emit({
    targetPath:'/pages/index/index',
    options:{
      params:{
        time:new Date().getSeconds(),
        name:'来自-myOrder',
      }
    },
    source:'myOrder'
  })
}

</script>

<style scoped lang="scss">

</style>

<template>
  <view>
    orderDetails
    <button @click="emitBackPage">向上一页发送数据</button>

  </view>
</template>

<script setup >
import {ylxEventBus} from "@/ylxuniCore/useylxuni";


function f1({args,source}) {
    console.log('orderDetails',args[0],source)
}
ylxEventBus.on(f1)


function emitBackPage() {
  ylxEventBus.emit({
    prevPage:true,
    // targetPath:'/pagesSubMine/myOrder/myOrder',
    options:{
      params:{
        time:new Date().getSeconds(),
        name:'来自-orderDetails',
      }
    },
    source:'orderDetails'
  }).then(res=>{
      uni.navigateBack()
    })
}

</script>


<style scoped lang="scss">

</style>

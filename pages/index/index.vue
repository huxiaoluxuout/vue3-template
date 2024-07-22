<template>
  <view class="page-content-tabbar page-content-padding-x mf-bgc-f5f6f7">
    <ylx-navbar title="首页" bg-color="#fff"></ylx-navbar>

    <ylx-uploadimg ref="refUploadimg" columns-limit="4" :limit="5" :file-image-list="fileImageList"
                   @updateFileImageList="updateFileImageList"></ylx-uploadimg>

    <button @click="uploadimg">uploadimg</button>
    <hr />
    <button @click="sendGlobal">sendGlobal</button>
    <button @click="myOrder">my-order</button>
    <button @click="eventBusMine">eventBusMine</button>
    <hr />

<!--    <button @click="buttontn">uniBLUETOOTH</button>-->
    <div v-for="(item,index) in 4" :key="index" style="margin-top: 10px;margin-bottom: 10px;">
      AAALorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, aut consequatur cum delectus deleniti
      eius eos explicabo facere magnam, maxime omnis quam quidem velit voluptas voluptatum.
    </div>
    <!--  -->
  </view>
</template>

<script setup>

import {ref, computed, watch} from 'vue';
import {onLoad, onTabItemTap} from '@dcloudio/uni-app'
import YlxNavbar from "@/components/ylx-components/ylx-navbar.vue";
import YlxUploadimg from "@/components/ylx-components/ylx-uploadimg.vue";
import {uniBLUETOOTH} from "@/utils/common/authorize/uniApi";
import {ylxBluetoothAuthorize} from "@/utils/uniTools";
import useBluetoothManage from "@/utils/common/bluetooth/useBluetoothManage";
import instanceUniEventBus from "@/utils/common/uniEventBus/instanceUniEventBus";
import useLoginInterceptor from "@/utils/useLoginInterceptor";
import instanceWxEventBus from "@/tooffff/instanceEventBus.js";

/*-------------------------------------------------------*/
const refUploadimg = ref(null)
const fileImageList = ref([
  {url: "https://mf.hzjxsj.com/uploads/20240706/790ec706d1ad37a8e11617af3385fdfa.png"},
  {url: "https://mf.hzjxsj.com/uploads/20240706/790ec706d1ad37a8e11617af3385fdfa.png"},
  {url: "https://mf.hzjxsj.com/uploads/20240706/790ec706d1ad37a8e11617af3385fdfa.png"},
])

function updateFileImageList({type, param}) {
  if (type === 'del') {
    fileImageList.value.splice(param, 1)
  } else if (type === 'uploading') {
    fileImageList.value.push(param)
  } else if (type === 'success') {
    fileImageList.value.splice(param.fileImageListLen, 1, param.itemAssign)
  }
}

function uploadimg() {
  refUploadimg.value.chooseFile()
}


onLoad(() => {

})

/*--------------------------*/
function myOrder() {
  instanceWxEventBus.sendPage({
    targetPath:'/pagesSubMine/myOrder/myOrder'
  },true)
}
const instanceMyOrderHandler = useLoginInterceptor({onSuccess: myOrder})

function eventBusMine() {
  instanceWxEventBus.sendPage({
    targetPath:'/pages/mine/mine',
    options:{age:18}
  },true,'switchTab')
}
function sendGlobal() {
  // instanceUniEventBus.sendGlobal('hahah')

  instanceWxEventBus.sendGlobal()
}

/*--------------------------*/

const isInitBle = ref(false) // 蓝牙已经初始化
const bleIsConnected = ref(false) // 蓝牙已经连接
const allBluetoothList = ref([]) //
function buttontn() {
  const {onSuccess, onError} = ylxBluetoothAuthorize()
  onSuccess(() => {
    uni.showToast({title: '正在搜索周围的设备', icon: 'loading', duration: 5000})
    useBluetoothManage.initBle([])
        .then(bluetoothList => {
          const bleList = JSON.parse(JSON.stringify(bluetoothList));
          allBluetoothList.value = bleList;
          uni.setStorage({
            key: 'bluetoothList',
            data: bleList,
            success() {
              uni.hideToast()
              uni.stopPullDownRefresh()
            },
          })
        }).catch(err => {
      uni.hideToast()
      console.log('initBle', err)
    })
  })
  onError(() => {
    isInitBle.value = false
    bleIsConnected.value = false
  })
}

</script>

<style scoped lang="scss">

</style>

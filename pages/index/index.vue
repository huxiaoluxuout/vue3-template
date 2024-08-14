<template>
  <view class="page-content-tabbar page-content-padding-x mf-bgc-f5f6f7">
    <ylx-navbar title="首页" bg-color="#fff"></ylx-navbar>

    <ylx-uploadimg ref="refUploadimg" columns-limit="4" :limit="5" :file-image-list="fileImageList"
                   @updateFileImageList="updateFileImageList"></ylx-uploadimg>

    <button @click="uploadimg">uploadimg</button>
    <hr/>
    isLogeIn:{{isLogeIn}}
    <button @click="setLoginClick">setLogin</button>
    <hr/>
    <button @click="sendGlobal">sendGlobal</button>
    <button @click="instanceMyOrderHandler">my-order</button>
    <button @click="eventBusMine">eventBusMine</button>
    <hr/>
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


import instanceEventBus from "@/utils/instanceEventBus.js";
import {useUserStore} from "@/stores/user.js";
import useMustLogIn from "@/utils/useMustLogIn.js";

/*-------------------------------------------------------*/
const refUploadimg = ref(null)
const fileImageList = ref([
  {url: "https://mf.hzjxsj.com/uploads/20240706/790ec706d1ad37a8e11617af3385fdfa.xpng"},
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

const userStore = useUserStore()

const isLogeIn = computed(() => userStore.isLoggedIn)
function setLoginClick() {
  userStore.setLogin(!isLogeIn.value)
}


onLoad(() => {

})

/*--------------------------*/
function myOrder() {
  instanceEventBus.emit({
    targetPath: '/pagesSubMine/myOrder/myOrder',
    source: 'xixi'
  }, true)
}


const instanceMyOrderHandler = useMustLogIn({onSuccess: myOrder})


function eventBusMine() {
  instanceEventBus.emit({
    targetPath: '/pages/mine/mine',
    options: {age: 18}
  }, true, 'switchTab')
}

function sendGlobal() {
  instanceEventBus.sendGlobal()
}


</script>

<style scoped lang="scss">

</style>

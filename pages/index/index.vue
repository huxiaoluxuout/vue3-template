<template>
  <view class="page-content-tabbar page-content-padding-x mf-bgc-f5f6f7">
    <ylx-navbar title="首页" bg-color="#fff"></ylx-navbar>

        <ylx-uploadimg ref="refUploadimg" columns-limit="4" :limit="5" :file-image-list="fileImageList"
                       @updateFileImageList="updateFileImageList"></ylx-uploadimg>

    <button @click="uploadimg">uploadimg</button>
    <hr/>

    login:{{ login }}
    <button @click="setToggle">login</button>
    <hr/>

    <button @click="sendGlobal">sendGlobal</button>
    <button @click="instanceMyOrderHandler">my-order</button>
    <button @click="eventBusMine">eventBusMine</button>
    <hr/>
    <button @click="getLocation">ylxGetLocation</button>
    <hr/>
    <div v-for="(item,index) in 4" :key="index" style="margin-top: 10px;margin-bottom: 10px;">
      AAALorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, aut consequatur cum delectus deleniti
      eius eos explicabo facere magnam, maxime omnis quam quidem velit voluptas voluptatum.
    </div>
    <!--  -->
  </view>
</template>

<script setup>

import {ref, computed, watch, toRefs, reactive} from 'vue';
import {onLoad, onTabItemTap} from '@dcloudio/uni-app'


import {ylxEventBus, ylxMustLogIn} from "@/ylxuniCore/useylxuni.js";


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



function getLocation() {
  console.log('getLocation')
  /*ylxGetLocation().then(res => {
    console.log('res', res)
  })*/
}
function eventBusMine() {
  ylxEventBus.emit({
    targetPath: '/pages/mine/mine',
    options: {age: 18}
  }, true, 'switchTab')
}

function sendGlobal() {
  ylxEventBus.emitGlobal()
}

function myOrder() {
   ylxEventBus.emit({
     targetPath: '/pagesSubMine/myOrder/myOrder',
     options:{
       age:10,
       color:'red',
       name:'haha',
       'setToggle':setToggle
     },
     source: 'xixi'
   }, true)
}

/*--------------------------*/



/*-------------------------*/
ylxMustLogIn.setInitLogin(reactive)
const login = ref(ylxMustLogIn.loginProxyObject)
const instanceMyOrderHandler = ylxMustLogIn.interceptMastLogIn({onSuccess: myOrder})

function setToggle() {
  ylxMustLogIn.loginProxyObject.login = !ylxMustLogIn.loginProxyObject.login
}
/*-------------------------*/


</script>

<style scoped lang="scss">

</style>

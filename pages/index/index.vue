<template>
  <view class="page-content-tabbar page-content-padding-x mf-bgc-f5f6f7">
    <ylx-navbar title="首页" bg-color="#fff"></ylx-navbar>
    <view>
      <button @click="toggleLocale">中文/ENG</button>
      <h2>0: {{ $t('home.title') }}</h2>
      <h4>1: {{ t('mine.title') }}</h4>
    </view>
    <ylx-gap height="20px"></ylx-gap>
    <hr/>
    <hr/>

    <ylx-uploadimg ref="refUploadimg" columns-limit="4" :limit="5" :file-image-list="fileImageList"
                   @updateFileImageList="updateFileImageList"></ylx-uploadimg>
    <button @click="uploadimg">uploadimg</button>

    <hr/>

    <button @click="sendGlobal">sendGlobal</button>
    <button @click="eventBusMine">跳转tabbar页面</button>
    <hr/>

    <button @click="instanceMyOrderHandler">my-order(需要登录)</button>
    <button @click="setToggle">设置登录状态 hasLogin:{{ hasLogin }}</button>


    <hr/>

  </view>
</template>

<script setup lang="js">

import {ref, computed, watch, toRefs, reactive} from 'vue';
import {onLoad, onTabItemTap} from '@dcloudio/uni-app'


import {ylxEventBus, ylxMustLogIn} from "@/ylxuniCore/useylxuni.js";
import {ylxNavigateTo} from "@/utils/uniTools.js";

/*--------------------------------------------------*/
import {setUseI18n} from "@/locale/useI18n.js";
const {setLocale,t} = setUseI18n()

// 中英语言切换
function toggleLocale() {
  const uniLocale = uni.getLocale()

  if (uniLocale==='en'){
    setLocale('zh-Hans')

  }else  if (uniLocale==='zh-Hans'){
    setLocale('en')

  }else {
    setLocale('zh-Hans')
  }
}

/*---------------------登录----------------------------------*/

const loginProxy = ref(ylxMustLogIn.loginProxyObject)
const instanceMyOrderHandler = ylxMustLogIn.interceptMastLogIn({alreadyLoggedIn: myOrder})
// const hasLogin = computed(()=>ylxMustLogIn.loginProxyObject.login)
const hasLogin = computed(()=>loginProxy.value.login)
function setToggle() {
  ylxMustLogIn.loginProxyObject.login = !ylxMustLogIn.loginProxyObject.login
}

/*-------------------------------------------------------*/

/*---------------------上传图片----------------------------------*/

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
// 自定义触发选择上传图片
function uploadimg() {
  refUploadimg.value.chooseFile()
}
/*-------------------------------------------------------*/


function eventBusMine() {
  ylxEventBus.emit({
    targetPath: '/pages/mine/mine',
    options: {age: 18}
  }, true, 'switchTab')
}

function sendGlobal() {
  ylxEventBus.emitGlobal({
    age: 10,
    color: 'red',
    name: 'haha',
  }, '触发页面的别名')
}

function myOrder() {
  ylxEventBus.emit({
    targetPath: '/pagesSubMine/myOrder/myOrder',
    options: {
      age: 10,
      color: 'red',
      name: 'haha',
    },
    source: 'xixi'
  }, true)
}

/*--------------------------*/



</script>

<style scoped lang="scss">

</style>

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

    <view class="relative">
      <button class="ylx-open-type" open-type="chooseAvatar" @chooseavatar="uniApiChooseAvatar"></button>
      <view class="fs-24">修改头像</view>
    </view>


    <button @click="ylxNavigateTo('/pagesSubMine/myOrder/myOrder')"> 1. my-order</button>
    <button @click="interceptToPage(ylxNavigateTo,'/pagesSubMine/myOrder/myOrder')">2. my-order(需要登录)</button>
    <button @click="setToggle">设置登录状态 hasLogin:{{ hasLogin }}</button>
    <view>hasLoading:{{ hasLoading }}</view>
    <hr/>
    <ylx-tabbar :INDEX="0"></ylx-tabbar>

  </view>
</template>

<script setup lang="js">

import {ref, computed} from 'vue';
import {onLoad, onReachBottom, onPullDownRefresh} from '@dcloudio/uni-app'


import {ylxEventBus, ylxMustLogIn, ylxNextPage} from "@/ylxuniCore/useylxuni.js";
import {ylxNavigateTo} from "@/utils/uniTools.js";

/*--------------------------------------------------*/
import {setUseI18n} from "@/locale/useI18n.js";
import {imgHttpSuccess, uploadFileCallback} from "@/components/ylx-components/ylx-JS/uploadFilePromise";
import YlxTabbar from "@/components/ylx-components/ylx-tabbar.vue";

const {setLocale, t} = setUseI18n()

// 中英语言切换
function toggleLocale() {
  const uniLocale = uni.getLocale()

  if (uniLocale === 'en') {
    setLocale('zh-Hans')

  } else if (uniLocale === 'zh-Hans') {
    setLocale('en')

  } else {
    setLocale('zh-Hans')
  }
}

/*---------------------登录----------------------------------*/
// 页面渲染判断 //
const loginProxy = ref(ylxMustLogIn.loginProxyObject)
const hasLogin = computed(() => loginProxy.value.login)

// 页面渲染判断 //

function setToggle() {
  ylxMustLogIn.loginProxyObject.login = !ylxMustLogIn.loginProxyObject.login
}

function interceptToPage(fn, ...args) {
  ylxMustLogIn.intercept({
    success: () => fn(...args),
    fail: () => ylxNavigateTo('/pages/login/login')
  })()
}

/*------------------------loading-------------------------------*/

const {ylxRefresh,ylxSetFn,ylxSetData,ylxInvokeFn,ylxReachBottom} = ylxNextPage.useNextPage()
/*-----------------------------------------------------------*/
const loadingProxy = ref(ylxNextPage.loadingProxyObject)
const hasLoading = computed(() => loadingProxy.value.loading)

const list =ref([])
function add() {
  setTimeout(()=>{
    console.log({time:new Date().getSeconds()})
    list.value=ylxSetData({
      data:{},resData:{}
    },false)
  },200)
}
ylxSetFn(add)

ylxInvokeFn()
onReachBottom(ylxReachBottom)
onPullDownRefresh(ylxRefresh);
/*-------------------------------------------------------*/

/*---------------------上传图片----------------------------------*/

const refUploadimg = ref(null)
const fileImageList = ref([
  // {url: "https://mf.hzjxsj.com/uploads/20240706/790ec706d1ad37a8e11617af3385fdfa.xpng"},
  // {url: "https://mf.hzjxsj.com/uploads/20240706/790ec706d1ad37a8e11617af3385fdfa.png"},
  // {url: "https://mf.hzjxsj.com/uploads/20240706/790ec706d1ad37a8e11617af3385fdfa.png"},
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
const avatar = computed(() => fileImageList.value[0]?.url || '');

// 上传小程序头像
function uniApiChooseAvatar(avatar) {
  let tempFile = avatar.detail.avatarUrl
  uploadFileCallback(tempFile, imgHttpSuccess, (url) => {
    fileImageList.value[0] = {url: url}
  })
}

/*-------------------------------------------------------*/
ylxEventBus.on(({args, source}) => {
  console.log('index:', args[0], source)
})


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

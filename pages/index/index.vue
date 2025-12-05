<template>
  <view class="page-content-tabbar page-content-padding-x mf-bgc-f5f6f7">

    <ylx-navbar title="首页" bg-color="#fff"></ylx-navbar>
    <!--    <view>
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
        <hr/>-->
    <!--    <button @click="chooseHexFile">chooseHexFile</button>-->

    <!--    <button @click="ylxNavigateTo('/pagesSubMine/myOrder/myOrder')"> 1. my-order</button>-->

    <button @click="interceptToPage(ylxNavigateTo,'/pagesSubMine/myOrder/myOrder')">2. my-order(需要登录)</button>

    <button @click="loginFn">登录</button>

    <button @click="setToggle">切换登录状态：{{ hasLogin }}</button>


    <!--    <button @click="handleLogin('agent')">agent</button>-->
    <!--    <button @click="handleLogin('shop')">shop</button>-->


  </view>
</template>

<script setup lang="js">

import {ref, computed} from 'vue';
import {onLoad, onReachBottom, onPullDownRefresh} from '@dcloudio/uni-app'


import {ylxEventBus, ylxIntercept, ylxNextPage} from "@/ylxuniCore/useylxuni.js";
import {ylxLoginCode, ylxNavigateTo} from "@/utils/uniTools.js";

/*--------------------------------------------------*/
import {setUseI18n} from "@/locale/useI18n.js";
import {imgHttpSuccess, uploadFileCallback} from "@/components/ylx-components/ylx-JS/uploadFilePromise";
import YlxTabbar from "@/components/ylx-components/ylx-tabbar.vue";
// import {useLogin} from "@/ylxuniCore/useLogin";
import {useWxLogin} from "@/ylxuniCore/useWxLogin";

const useLogin = useWxLogin()
/*------------------------------------------------------*/
const {setLocale, t} = setUseI18n()

function chooseHexFile() {
  // 检查是否运行在App环境

  plus.io.chooseFile(
      (file) => {
        console.log("选择的文件:", file);
        // 处理文件...
      },
      (error) => {
        console.log("选择文件失败:", error);
      }
  )
  return
  if (window.plus) {
    plus.io.chooseFile(
        function (file) {
          // 成功回调
          console.log("选择的文件路径: " + file);
          if (file.name.endsWith('.hex')) {
            // 处理hex文件
            readHexFile(file.fullPath);
          } else {
            uni.showToast({
              title: '请选择hex文件',
              icon: 'none'
            });
          }
        },
        function (error) {
          // 失败回调
          console.log("选择文件失败: " + JSON.stringify(error));
          uni.showToast({
            title: '选择文件失败',
            icon: 'none'
          });
        },
        {
          title: '选择hex文件', // 选择器标题
          mime: 'application/octet-stream', // 限制文件类型
          filter: '.hex' // 过滤显示hex文件
        }
    );
  } else {
    uni.showToast({
      title: '当前环境不支持文件选择',
      icon: 'none'
    });
  }
}

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
const hasLogin = computed(() => ylxIntercept.getIntercepts.login)
const hasLogin2 = ref(ylxIntercept.getIntercepts.login)

function setToggle() {
  ylxIntercept.setIntercept('login', !ylxIntercept.getInterceptState('login'))
}

function loginFn() {
  useLogin.checkTokenValidity(() => {
    console.log('自动登录')
  })

}

function interceptToPage(fn, ...args) {
  ylxIntercept.intercept({
    success: () => fn(...args),
    fail: () => ylxNavigateTo('/pages/login/login')
  }, 'login')()
}


/*-------------------------------------------------------------------*/
/*------------------------loading-------------------------------*/

const {ylxRefresh, ylxSetFn, ylxSetData, ylxInvokeFn, ylxReachBottom} = ylxNextPage.useNextPage()
/*-----------------------------------------------------------*/
const loadingProxy = ref(ylxNextPage.loadingProxyObject)
const hasLoading = computed(() => loadingProxy.value.loading)

const list = ref([])

function add() {
  setTimeout(() => {
    console.log({time: new Date().getSeconds()})
    list.value = ylxSetData({
      data: {}, resData: {}
    }, false)
  }, 200)
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

import {useTabBarStore} from "@/stores/tabBarStore";

const tabBarStore = useTabBarStore();

const handleLogin = (role) => {

  tabBarStore.setUserRole(role);
  // 切换角色后，跳转到新 tabBar 配置中的第一个页面（确保有效）
  const firstTabPath = tabBarStore.currentTabBar[0].pagePath;
  uni.switchTab({
    url: `/${firstTabPath}` // 确保路径有效
  });
};
/*--------------------------*/


</script>

<style scoped lang="scss">

</style>

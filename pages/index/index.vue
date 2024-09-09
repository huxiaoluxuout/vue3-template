<template>
  <view class="page-content-tabbar page-content-padding-x mf-bgc-f5f6f7">
    <ylx-navbar title="首页" bg-color="#fff"></ylx-navbar>
    <view>
      <button @click="toggleLocale">中文/ENG</button>
      <h2>0: {{ t('home.title') }}</h2>
      <h4>1: {{ t('mine.title') }}</h4>
    </view>
    <ylx-gap height="20px"></ylx-gap>
    <hr/>


    <!--    <ylx-uploadimg ref="refUploadimg" columns-limit="4" :limit="5" :file-image-list="fileImageList"
                       @updateFileImageList="updateFileImageList"></ylx-uploadimg>

        <button @click="uploadimg">uploadimg</button>-->


    <hr/>

    login:{{ login }}
    <button @click="setToggle">login</button>
    <hr/>

    <button @click="sendGlobal">sendGlobal</button>
    <button @click="instanceMyOrderHandler">my-order</button>
    <button @click="eventBusMine">eventBusMine</button>
    <hr/>

    <button @click="ylxNavigateTo('pages/select-identity/select-identity?id=45',{haha:'哈哈哈'})">快玛页面</button>
    <!--    <button @click="getLocation">ylxGetLocation</button>-->
    <hr/>
    <div v-for="(item,index) in 4" :key="index" style="margin-top: 10px;margin-bottom: 10px;">
      AAALorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, aut consequatur cum delectus deleniti
      eius eos explicabo facere magnam, maxime omnis quam quidem velit voluptas voluptatum.
    </div>
    <!--  -->
  </view>
</template>

<script setup lang="js">

import {ref, computed, watch, toRefs, reactive} from 'vue';
import {onLoad, onTabItemTap} from '@dcloudio/uni-app'


import {ylxEventBus, ylxMustLogIn} from "@/ylxuniCore/useylxuni.js";
import {ylxNavigateTo} from "@/utils/uniTools.js";


/*-------------------------------------------------------*/


import {useI18n} from "vue-i18n";


const {t, locale} = useI18n();
import pagesConfig from "@/pages.json";

const tabBarList = pagesConfig.tabBar.list || []
const len = tabBarList.length
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
      'setToggle': setToggle
    },
    source: 'xixi'
  }, true)
}

/*--------------------------*/



/*-------------------------*/
// ylxMustLogIn.setInitLogin(reactive)
const login = ref(ylxMustLogIn.loginProxyObject)
const instanceMyOrderHandler = ylxMustLogIn.interceptMastLogIn({onSuccess: myOrder})

function setToggle() {
  ylxMustLogIn.loginProxyObject.login = !ylxMustLogIn.loginProxyObject.login
}

/*-------------------------*/


// 中英语言切换

function toggleLocale() {
  const uniLocale = uni.getLocale()

  changeLocale(uniLocale)

}

/*-------------------------*/
function changeLocale(uniLocale) {
  const mappingLocale = {
    "zh-Hans": "en",
    "en": "zh-Hans",
  }

  uni.setLocale(mappingLocale[uniLocale])

  locale.value = mappingLocale[uniLocale]

  for (let index = 0; index < len; index++) {
    uni.setTabBarItem({
      index: index,
      text: t(tabBarList[index].text.replace(/%/g, ''))
    });
  }
}

/*-------------------------*/


</script>

<style scoped lang="scss">

</style>

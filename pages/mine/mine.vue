<template>
  <view class="page-content-tabbar">
    <ylx-gap height="1rpx"></ylx-gap>
    <view>
      <button @click="toggleLocale">中文/ENG</button>
      <h2>0: {{ t('home.title') }}</h2>
      <h4>1: {{ t('mine.title') }}</h4>
    </view>

    <view class="nav-bottom-wrapper">
      <view class="flex align-center justify-between nav-item" v-for="item in myOrderGridList" :key="item.id" @click="ylxNavigateTo(item.pagePath+'?id='+item.id)">
        <text class="nav-text">{{ item.text }}</text>
        <view class="ylx-section-wrapper__right">》</view>
      </view>
    </view>
<!--    <ylx-calendar></ylx-calendar>-->

    login:{{ login }}
    <button @click="setToggle">login</button>
  </view>
</template>
<script setup>
import {ref, computed, watch,reactive} from 'vue';

import {onLoad, onTabItemTap, onReachBottom, onPullDownRefresh} from '@dcloudio/uni-app'
import {ylxNavigateTo} from "@/utils/uniTools";
import YlxGap from "@/components/ylx-components/ylx-gap.vue";
import {ylxMustLogIn} from "@/ylxuniCore/useylxuni.js";



// import {ylxEventBus} from "@/utils/common/useylxuni.js";


const myOrderGridList = ref([
  {id: 1, text: "待付款", iconSrc: '/static/mine_order_icon_1.png', pagePath: 'pagesSubMine/myOrder/myOrder'},
  {id: 2, text: "待美发", iconSrc: '/static/mine_order_icon_2.png', pagePath: 'pagesSubMine/myOrder/myOrder'},
  {id: 3, text: "美发中", iconSrc: '/static/mine_order_icon_3.png', pagePath: 'pagesSubMine/myOrder/myOrder'},
  {id: 4, text: "待评价", iconSrc: '/static/mine_order_icon_4.png', pagePath: 'pagesSubMine/myOrder/myOrder'},
  {id: 5, text: "已完成", iconSrc: '/static/mine_order_icon_5.png', pagePath: 'pagesSubMine/myOrder/myOrder'},
])
onPullDownRefresh(()=>{
  console.log(122)
  uni.stopPullDownRefresh();
})


/*ylxEventBus.on(({args,source}) => {
  console.log(...args,source)
});*/


/*---------------------------------------------------------------*/

// ylxMustLogIn.setInitLogin(reactive)
const login = ref(ylxMustLogIn.loginProxyObject)

//
function setToggle() {
  ylxMustLogIn.loginProxyObject.login = !ylxMustLogIn.loginProxyObject.login
}
/*--------------------------------------*/


/*-------------------------------------------------------*/

import useI18n, {setLocale} from "@/locale/useI18n.js";
const {t, locale} = useI18n();


// 中英语言切换

function toggleLocale() {
  const uniLocale = uni.getLocale()

  if (uniLocale==='en'){
    setLocale('zh-Hans',t, locale)
  }else  if (uniLocale==='zh-Hans'){
    setLocale('en',t, locale)

  }

}


</script>


<style scoped lang="scss">
.nav-bottom-wrapper {
  margin-left: 30rpx;
  margin-right: 30rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 0 30rpx;
  box-sizing: border-box;

  .nav-item {
    border-bottom: 1px solid #E4E7F0;
    padding-top: 30rpx;
    padding-bottom: 30rpx;
    gap: 8px;

    position: relative;

    .nav-icon-left {
      width: 36rpx;
      height: 36rpx;
    }
  }

  .nav-item:last-child {
    border-bottom: 1px solid transparent;
  }

  .nav-text {
    font-size: 14px;
    color: #272729;
  }

}

</style>

<template>
  <view class="root-tabbar" :style="{ '--ios-bottom-height':iosBottomHeight +'px'}">
    <view class="tabbar-container">
      <view class="item-wrapper" v-for="(item, itemIndex) in TabBarList" :key="item.text" @click="clickNavHandler(item.pagePath,itemIndex)"
            :class="['item',{ 'enter-active': item.entering, 'leave-active': item.leaving }]">
        <view class="item-container">
          <image v-if="INDEX ===itemIndex" mode="aspectFit" class="icon-item"
                 :src="'/'+item.selectedIconPath"/>

          <image v-else mode="aspectFit" class="icon-item"
                 :src="'/'+item.iconPath"/>

          <view class="foot-text" :style="{color:INDEX === itemIndex?selectedColor:color}">{{ item.text }}</view>

          <view class="notice" v-show="false">消息角标</view>
        </view>
      </view>

    </view>
    <view class="ios__bottom-tabbar__height"></view>
  </view>
</template>
<script>
import {getPages} from "@/components/ylx-components/ylx-JS/common";
import {useTabBarStore} from "@/stores/tabBarStore";


// 获取 Pinia 状态
const tabBarStore = useTabBarStore();

const {tabBar: { color, selectedColor}} = getPages()

export default {
  props: {
    INDEX: {
      type: Number,
      default: 1,
    },
  },
  computed:{
    currentTabBar(){
     return tabBarStore.currentTabBar
    },
    TabBarList(){
     return tabBarStore.TabBarList
    }
  },
  data() {

    return {
      iosBottomHeight: 0,
      selectedColor,
      color,
    }
  },

  mounted() {

  },
  onShow() {

  },

  methods: {

    clickNavHandler(pagePath,itemIndex) {



      /*const success = Math.random() > 0.3; // 70%成功率模拟
      console.log('success', success)
      if (success) {
        if (this.list.length === 2) {
          this.$set(this.list, 2, {
            "text": "登录",
            "pagePath": "pages/login/login",
            "iconPath": "static/tabbar/index_agent.png",
            "selectedIconPath": "static/tabbar/index_on.png",
            entering: true,
            leaving: false
          });
          // 动画结束后移除 entering 状态
          setTimeout(() => {
            this.$set(this.list, 2, {
              "text": "登录",
              "pagePath": "pages/login/login",
              "iconPath": "static/tabbar/index_agent.png",
              "selectedIconPath": "static/tabbar/index_on.png",
              entering: false,
              leaving: false
            });
          }, 500)
        }

      } else if (this.list.length === 3) {

        this.list[2].leaving = true
        // 动画结束后从数组中移除
        setTimeout(() => {
          this.list.pop()
        }, 500)

      }*/


      this.$emit('tabBarClick')
      console.log('pagePath',pagePath)
      uni.switchTab({
        url: '/' + pagePath
        // url: '/' + item.pagePath + '?tabBarId=' + itemIndex

      })

    }
  }
}
</script>

<style lang="scss" scoped>

.root-tabbar {
  --icon-width: 26px;
  --inc: 20px;
  --tabbar-height: 60px;

}

.ios__bottom-tabbar__height {
  height: calc(var(--tabbar-height) + var(--ios-bottom-height) + 6rpx);
}

.tabbar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(var(--tabbar-height) + var(--ios-bottom-height));
  background: #fff;
  display: flex;
  flex-direction: row;
  z-index: 1000;
  padding: 4px 4px calc(4px + var(--ios-bottom-height));
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
}

.item-wrapper {
  display: flex;
  flex: 1;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
}

.item-container {
  width: calc(var(--icon-width) + var(--inc));
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.foot-text {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-size: 14px;
  color: #D0D4DD;
}

.icon-item {
  width: var(--icon-width);
  height: var(--icon-width);
  display: block;
}

.icon-item-big {
  width: calc(var(--icon-width) + var(--inc));
  height: calc(var(--icon-width) + var(--inc));
  display: block;
  transform: translateY(-50%);
}

// 角标
.notice {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fd5958;
  color: #fff;
  border-radius: 50%;
  font-size: 10px;
  box-sizing: border-box;
  width: 1.4em;
  height: 1.4em;
  text-align: center;
  line-height: 1.4em;
  transform: translate(50%, -50%);

}

.show-image {
  position: absolute;
  left: -10000px;
  top: -10000px;
  z-index: -1;
}

/*.item {
  transition: all 0.5s ease;
  opacity: 1;
  transform: translateX(0);
}

.item.enter-active {
  opacity: 0;
  transform: translateX(-20px);
}

.item.leave-active {
  opacity: 0;
  transform: translateX(20px);
}*/

</style>

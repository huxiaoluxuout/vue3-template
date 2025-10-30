<template>
  <view :class="customClass" :style="_resultCustomStyle">
    <view class="ylx-swiper width-height" :style="{'--width':width,'--scale':resultScale}">
      <swiper :current="resultCurrent" @change="ylxSwiperChange" class="width-height">
        <swiper-item v-for="(item,index) in swiperList" :key="index">
          <view class="width-height">
            <ylx-image :width="width" custom-style="border-radius: 8px;" :scale="scale" :src="item[srcKey]" @imgClick="swiperPreviewImg(index)"></ylx-image>
          </view>
        </swiper-item>
      </swiper>

      <view v-if="indicatorType===0">
        <view class="indicator" :style="{bottom:indicatorBottom}">
          <view class="indicator-item" :class="{'active':resultCurrent===index}" v-for="(item, index) in swiperList" @click="btnClick(index)" :key="index">
          </view>
        </view>
      </view>
      <view v-else-if="indicatorType===1">

        <view class="indicator-num">
          {{resultCurrent+1}}/{{swiperList.length}}
        </view>
      </view>
      <view v-else>

        <view class="indicator-image">
          <view class="flex gap-x-10 ylx-padding-bottom-10 ylx-padding-top-10 ylx-margin-left-15 ylx-margin-right-15">
            <image
                :style="`width:104rpx;height:104rpx;border-radius: 8px;transition-property: border;transition-duration: 80ms;${resultCurrent===index?'border: 1px solid #FF9800':'border: 1px solid transparent'};`"
                class="indicator-item-img" :src="item['src']" v-for="(item, index) in swiperList" @click="btnClick(index)" :key="index"
            ></image>
          </view>

        </view>
      </view>


    </view>
  </view>
</template>
<script>

import {componentsMixin, localStringStyle, convertStyleObjectToString,} from "@/components/ylx-components/ylx-JS/common";
import {computedRatio} from "@/utils/tools";

export default {
  mixins: [componentsMixin],

  name: 'ylx-swiper',

  props: {
    current: {
      type: [String, Number],
      default: 0
    },
    swiperList: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: '320rpx'
    },
    scale: {
      type: String,
      default: '1'
    },
    srcKey: {
      type: String,
      default: 'src'
    },
    indicatorBottom: {
      type: String,
      default: '15rpx'
    },
    indicatorImage: Boolean,
    indicatorType: {
      type: Number,
      default: 0
    },
    preview: Boolean,

  },
  computed: {


    _resultCustomStyle() {
      return localStringStyle(convertStyleObjectToString({
        // 其它代码

      })) + ';' + localStringStyle(this.customStyle)

    },
    resultScale() {
      return computedRatio(this.scale)
    },
    resultCurrent() {
      return this.current
    },
  },

  methods: {
    ylxSwiperChange(event) {
      this.$emit('updateCurrent', event.detail.current)
    },

    btnClick(index) {
      this.$emit('updateCurrent', index)
    },
    // 预览
    swiperPreviewImg(index) {
      if (this.preview) {
        uni.previewImage({
          urls: this.swiperList.map(item => item[this.srcKey]),
          current: index,
        })
      }


    },
  }

}
</script>

<style scoped lang="scss">
.ylx-swiper {
  position: relative;
  background-color: #fff;
  .indicator {
    position: absolute;
    bottom: 15rpx;
    left: 0;
    right: 0;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 20rpx;
    justify-content: center;

    .indicator-item {
      height: 3px;
      width: 20rpx;
      border-radius: 10px;
      background-color: #ffffff80;

    }

    .active {
      width: 34rpx;
      background-color: #fff;
      transition-property: width;
      transition-duration: 80ms;
    }

  }
}

.width-height {
  --height-scale: calc(var(--width) / var(--scale));
  width: var(--width);
  height: var(--height-scale);
  position: relative;
}

/*-------------------*/
.indicator-image {
  position: absolute;
  bottom: 50rpx;
  left: 30rpx;
  right: 30rpx;
  background-color: rgba(11, 11, 11, 0.21);
  border-radius: 16px;

}
.indicator-num{
  position: absolute;
  right: 30rpx;
  bottom: 30rpx;
  font-size: 24rpx;
  border-radius: 100px;
  padding: 4rpx 20rpx;
  box-sizing: border-box;
  color: #fff;
  background-color: rgba(57, 57, 57, 0.48);
}
</style>

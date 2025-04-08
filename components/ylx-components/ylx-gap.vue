<template>
  <view :style="resultCustomStyle" :class="customClass"></view>
</template>
<script>


import {localStringStyle,convertStyleObjectToString, componentsMixin} from "@/components/ylx-components/ylx-JS/common";

export default {
  mixins: [componentsMixin],

  name: 'ylx-gap',

  props: {

    bgColor: {
      type: String,
      default: 'transparent'
    },
    height: {
      type: String,
      default: '1rpx'
    },
    width: {
      type: String,
      default: '100%'
    },
  },
  computed: {
    resultCustomStyle() {
      return localStringStyle(convertStyleObjectToString({
        height: this.height,
        width: this.width,
        'background-color': this.bgColor,
      })) + ';' + localStringStyle(this.customStringStyle)
    },
  }
}
</script>




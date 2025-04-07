<template>
  <view :class="customClass" :style="resultCustomStyle">
    我是模板
  </view>
</template>
<script>


import {componentsMixin, localStringStyle,convertStyleObjectToString} from "@/components/ylx-components/ylx-JS/styleTemplate";


export default {
  mixins: [componentsMixin],
  name: 'ylx-template',
  props: {

  },
  computed: {
    _resultCustomStyle() {
      return localStringStyle(convertStyleObjectToString({
        // 其它代码

      })) + ';' + localStringStyle(this.navbarStyle)
    },

    resultCustomStyle() {
      return convertStyleObjectToString({
        // 其它代码

      }) + this.customStringStyle
    },
  },

  methods: {}

}
</script>



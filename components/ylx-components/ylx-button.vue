<template>
  <button :class="customClass" class="btn" :style="resultCustomStyle" @click.stop="btnClick">{{ text }}</button>
</template>
<script>
import {localStringStyle, ylxStyleObjectToString, componentsMixin} from "@/components/ylx-components/ylx-JS/template";

export default {
  mixins: [componentsMixin],

  name: 'ylx-button',

  props: {

    text: {
      type: String,
      default: '按钮'
    },
    bgColor: {
      type: String,
      default: 'transparent'
    },
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
  },
  computed: {
    resultCustomStyle() {
      return ylxStyleObjectToString({
        height: this.height,
        width: this.width,
        'background-color': this.bgColor,
      }) + localStringStyle(this.customStyle)
    },
  },

  methods: {
    btnClick() {
      !this.disabled ? this.$emit('btnClick') :
          this.$emit('btnClickErr')

    },
  }


}
</script>

<style scoped lang="scss">
.btn {
  font-size: 12px;
  border-radius: 100px;
  background-color: #272729;
  color: #fff;
}

.btn:after {
  border: none;
}
</style>


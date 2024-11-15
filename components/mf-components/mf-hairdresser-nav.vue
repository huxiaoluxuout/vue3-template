<script setup lang="js">
import {ref} from 'vue';

const props = defineProps({
  hiddenNav: Boolean,
  customClass: String,
  name: {
    type: String,
    default: 'name'
  }
})
const show = ref(false)

function confirm() {
  console.log('确定')
  $emit('confirm',)
  show.value = false
}

function cancel() {
  console.log('取消')
  $emit('cancel')
  show.value = false


}

let $emit=defineEmits(['confirm','cancel'])

// 将组件中的属性暴露出去，这样父组件可以获取
defineExpose({
  show
})
</script>

<script>
export default {
  options: {
    virtualHost: true
  }
}
</script>

<template>
  <view :class="customClass">111</view>

</template>

<style scoped lang="scss">

</style>

<script setup>


const props = defineProps({
  hiddenNav: Boolean,
  customClass: String,
  name: {
    type: String,
    default: 'name'
  }
})

const btnClick = () => {
}

</script>

<script>
export default {
  options: {
    virtualHost: true
  }
}
</script>

<template>
  <view :class="customClass" @click="btnClick"></view>

</template>

<style scoped lang="scss">

</style>

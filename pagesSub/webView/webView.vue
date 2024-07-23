<template>
  <view class="page-content bgc-fff">
    <web-view :src="https"></web-view>

  </view>
</template>

<script setup>
import {ref} from 'vue'
const https = ref('https://cn.vuejs.org/guide/components/slots.html#scoped-slots')
</script>

<style>

</style>

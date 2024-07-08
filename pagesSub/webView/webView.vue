<template>
  <view class="page-content bgc-fff">
    <web-view :src="https"></web-view>

  </view>
</template>

<script setup>
import {ref} from 'vue'
// import {userAgreementHttp} from "@/network/apis/cikuApi";
import {BASE_URL} from "@/network/config";

// const https = ref(BASE_URL + userAgreementHttp)
const https = ref('https://cn.vuejs.org/guide/components/slots.html#scoped-slots')
</script>

<style>

</style>

<template>
	<view class="page-content bgc-fff bgc">
    <rich-text :nodes="richTextInfo"></rich-text>
	</view>
</template>

<script setup>
import {useUniEventBusVue3} from "@/utils/common/uniEventBus/useUniEventBusVue3";
import instanceUniEventBus from "@/utils/common/uniEventBus/instanceUniEventBus";
import {ref} from "vue";

const richTextInfo=ref({})
useUniEventBusVue3(()=>{
  instanceUniEventBus.onPageNotice((richTextData)=>{
    richTextInfo.value=richTextData
  })
})
</script>

<style>

</style>

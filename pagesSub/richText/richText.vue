<template>
	<view class="page-content bgc-fff bgc">
    <rich-text :nodes="richTextInfo"></rich-text>
	</view>
</template>

<script setup>

import {ref} from "vue";

const richTextInfo=ref({})

</script>

<style>

</style>

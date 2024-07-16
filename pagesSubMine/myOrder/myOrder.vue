<template>
  <view className="page-content">
    <view class="ylx-b-c_fff_272729">
      <view class="ylx-margin-left-15 ylx-margin-right-15 ylx-padding-top-15 ylx-padding-bottom-15">
        <ylx-pick :labelList="labelList" :activeIds="activeIds" bg-color="#F5F6F7" color="#919499" num-columns="6"
                  custom-item-class="item-label ylx-b-c_272729_fff"></ylx-pick>
      </view>
    </view>
    <view v-show="!pageLoading">
      <view v-for="(item ,index) in myOrderList" :key="index">
        <view style="line-height: 2.5;">{{ item.add_time_text }}---{{ item.order_status_text }}</view>
      </view>
    </view>

    <ylx-page-loading :show-loading="pageLoading"></ylx-page-loading>

  </view>
</template>

<script setup>

import {ref, computed, watch} from 'vue';
import {onLoad, onReachBottom, onPullDownRefresh} from '@dcloudio/uni-app'

import useReachBottomRefreshVue3 from "@/utils/common/useReachBottomRefreshVue3";
import {getOrderList} from "@/network/apis/meiFa";

const {
  page,
  pageSize,
  reload,
  dataHandler,
  reachBottomHandler,
  pullDownRefreshHandler,
  setFunction, invokeAllFn,

} = useReachBottomRefreshVue3()

const pageLoading = ref(true)

const labelList = ref([
  {id: 0, text: '全部'},
  {id: 1, text: '待付款'},
  {id: 2, text: '待美发'},
  {id: 3, text: '美发中'},
  {id: 4, text: '待评价'},
  {id: 5, text: '已完成'},
])
const activeIds = ref([0])
const activeStatus = computed(() => activeIds.value[0])


const myOrderList = ref([])
const getMyOrderList = () => {
  getOrderList({
    page: page.value,
    page_size: pageSize.value,
    status: activeStatus.value
  }).then(res => {
    let reloadNextPage = res.data.current_page < res.data.last_page
    myOrderList.value = dataHandler({data: myOrderList.value, newData: res.data.data}, reloadNextPage)
    pageLoading.value = false
  })
}
setFunction(getMyOrderList)
onReachBottom(reachBottomHandler)
onPullDownRefresh(() => {
  pullDownRefreshHandler()
})
onLoad((option) => {
  console.log(option)
  activeIds.value = [Number(option.id)]
  invokeAllFn()
})

/*watch(activeStatus, (newVal) => {
  console.log('newVal',newVal)
  pageLoading.value = true
  reload()
})*/

</script>

<style scoped lang="scss">

</style>

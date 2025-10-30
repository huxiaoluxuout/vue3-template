<template>
  <view>

    <button @click="handleLogin('agent')">agent</button>
    <button @click="handleLogin('shop')">shop</button>
    <ylx-tabbar :INDEX="0"></ylx-tabbar>

  </view>
</template>

<script setup >
import {useTabBarStore} from "@/stores/tabBarStore";
const tabBarStore = useTabBarStore();

const handleLogin = (role) => {

  tabBarStore.setUserRole(role);
  // 切换角色后，跳转到新 tabBar 配置中的第一个页面（确保有效）
  const firstTabPath = tabBarStore.currentTabBar[0].pagePath;
  uni.switchTab({
    url: `/${firstTabPath}` // 确保路径有效
  });
};

</script>


<style scoped lang="scss">

</style>

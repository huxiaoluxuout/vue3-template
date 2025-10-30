import {defineStore} from 'pinia';
import tabBarConfig from "@/utils/tabBarConfig";

export const useTabBarStore = defineStore('tabBar', {
    state: () => ({
        userRole: 'agent', // 默认代理商
        currentTabBar: tabBarConfig.agent // 当前 tabBar 配置
    }),
    getters: {
        TabBarList: (state) => state.currentTabBar
    },
    actions: {
        // 更新用户角色并切换 tabBar 配置
        setUserRole(role) {
            this.userRole = role;
            this.currentTabBar = tabBarConfig[role] || tabBarConfig.agent;
        }
    }
});

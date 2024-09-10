import {useI18n} from "vue-i18n";

import pagesConfig from "@/pages.json";

const tabBarList = pagesConfig.tabBar.list || []
const len = tabBarList.length

export default useI18n


export function setLocale(targetLocaleCode, t, locale) {

    uni.setLocale(targetLocaleCode)

    locale.value = targetLocaleCode

    for (let index = 0; index < len; index++) {
        uni.setTabBarItem({
            index: index,
            text: t(tabBarList[index].text.replace(/%/g, ''))
        });
    }
}

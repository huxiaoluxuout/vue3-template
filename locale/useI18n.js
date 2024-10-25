import {useI18n} from "vue-i18n";

import pagesConfig from "@/pages.json";


const {tabBar: {list: tabBarList = []} = { list: [] }} = pagesConfig || {};

const len = tabBarList.length || 0



 function setLocaleCode(targetLocaleCode, t, locale) {

    uni.setLocale(targetLocaleCode)

    locale.value = targetLocaleCode

    for (let index = 0; index < len; index++) {
        uni.setTabBarItem({
            index: index,
            text: t(tabBarList[index].text.replace(/%/g, ''))
        });
    }
}

export function setUseI18n() {
    const {t, locale} = useI18n();
    return {
        setLocale:function (targetLocaleCode) {
            setLocaleCode(targetLocaleCode, t, locale)
        },
        t,
        locale
    }
}

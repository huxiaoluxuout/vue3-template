import {useI18n} from "vue-i18n";




import pagesConfig from "@/pages.json";

const tabBarList = pagesConfig.tabBar.list || []
const len = tabBarList.length

export function changeLocale(uniLocale) {
    /*const mappingLocale = {
        "zh-Hans": "en",
        "en": "zh-Hans",
    }
    const {t, locale} = useI18n();


    uni.setLocale(mappingLocale[uniLocale])

    locale.value = mappingLocale[uniLocale]

    for (let index = 0; index < len; index++) {
        uni.setTabBarItem({
            index: index,
            text: t(tabBarList[index].text.replace(/%/g, ''))
        });
    }*/

    return {
        useI18n
    }


}

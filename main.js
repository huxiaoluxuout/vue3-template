import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif


import localeMsg from './locale/index'

const i18nConfig = {
    locale: uni.getLocale(),
    messages: localeMsg
}

// #ifdef VUE3
import {createSSRApp} from 'vue'
import * as Pinia from 'pinia';

/*-------------------------------------*/
import {createI18n} from 'vue-i18n'

const i18n = createI18n(i18nConfig)

/*-------------------------------------*/

export function createApp() {
    const app = createSSRApp(App)
    app.use(Pinia.createPinia());
    app.use(i18n)

    return {
        app,
        Pinia

    }
}

// #endif

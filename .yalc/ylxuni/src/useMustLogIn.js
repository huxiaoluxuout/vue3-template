import {createProxy, useInterceptorProxy} from "../utils/tools.js";

export class MustLogIn {
    static targetLogin = {login: false}
    static platform = null

    /**
     * @param {string} platform - 环境变量 "uni" 或 "wx"
     */
    constructor(platform) {
        MustLogIn.platform = platform
        this.loginProxy = createProxy(MustLogIn.targetLogin)
        this.onError = this.handleError
        this.setLoginToken = this.handleSetLoginToken
        this.updateLogin = this.handleUpdateLogin
        this.unSetLoginToken = this.handleUnSetLoginToken
        this.interceptMastLogIn = this.handleInterceptMastLogIn
    }


    handleError() {
        MustLogIn.platform.showModal({
            title: '登录后，获取完整功能',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        })
    }

    handleSetLoginToken({tokenKey, tokenData}, callback) {
        this.loginProxy.login = true
        MustLogIn.platform.setStorage({
            key: tokenKey,
            data: tokenData,
            success: function () {
                if (typeof callback === 'function') {
                    callback()
                }
            }
        })
    }

    handleUpdateLogin(callback) {
        this.loginProxy.login = true
        if (typeof callback === 'function') {
            callback()
        }
    }

    handleUnSetLoginToken(tokenKey, callback) {
        this.loginProxy.login = false
        MustLogIn.platform.removeStorage({
            key: tokenKey,
            success: function () {
                if (typeof callback === 'function') {
                    callback()
                }
            }
        })
    }

    /**
     *
     * @param onSuccess
     * @param onError
     * @returns {(function(...[*]): void)|*}
     */
    handleInterceptMastLogIn({onSuccess, onError = this.onError}) {
        const {interceptor: logInterceptor} = useInterceptorProxy(MustLogIn.targetLogin)
        return logInterceptor({onSuccess, onError})
    }


}





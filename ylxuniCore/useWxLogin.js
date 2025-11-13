import {TOKEN_EXPIRATION_TIME, TOKEN} from "@/ylxuniCore/storageKey";
import {ylxInterceptorCall} from "@/ylxuniCore/useylxuni";
import {Login} from "@/ylxuniCore/useLogin";

export function useWxLogin() {
// 计算3天的毫秒数：1000毫秒 * 60秒 * 60分 * 24小时 * 3天
    const TOKEN_VALID_DURATION = 1000 * 60 * 60 * 24 * 3;

    function loginFn(callback) {
        Login(callback, saveToken)
    }

    function checkToken() {

    }
    /**
     * 检查token是否有效
     * @param {Function} [callback] - 检查成功后的回调函数
     * @description
     * 该函数会执行以下操作：
     * 1. 获取本地存储的token的过期时间
     * 2. 检查token是否过期
     * 3. 如果token已过期，则执行登录逻辑并保存新的token
     * 4. 如果token未过期，则执行回调函数并更新登录拦截器状态
     */
    function checkTokenValidity(callback) {
        uni.getStorage({
            key: TOKEN_EXPIRATION_TIME,
            success: function (res) {
                // 检查token是否过期
                if (res.data + TOKEN_VALID_DURATION < Date.now()) {
                    console.warn('Token已到过期时间');
                    ylxInterceptorCall.setInterceptKey('login', false)
                    loginFn(callback)
                } else {
                    console.log('Token未到过期时间');
                    console.log('Token仍有效');
                    ylxInterceptorCall.setInterceptKey('login', true)
                    typeof callback === 'function' && callback()

                   /* console.error('Token已经失效');*/
                }
            },
            fail: function (fail) {
                console.error('获取本地token失败', fail);
                ylxInterceptorCall.setInterceptKey('login', false)
                loginFn(callback)
            }
        });
    }

    /**
     * 保存token到本地存储
     * @param {String} token - 需要保存的token值
     * @param {Function} [callback] - 保存成功后的回调函数
     * @description
     * 该函数会执行以下操作：
     * 1. 验证token是否有效
     * 2. 将token保存到本地存储
     * 3. 保存token的过期时间戳
     * 4. 执行回调函数并更新登录拦截器状态
     */
    function saveToken(token, callback) {
        if (typeof token === 'undefined' || token === null || token === '') {
            console.error('获取token失败', token);
            return
        }
        uni.setStorage({
            key: TOKEN,
            data: token,
            success: function () {
                uni.setStorage({
                    key: TOKEN_EXPIRATION_TIME,
                    data: Date.now(),
                    success: function () {
                        typeof callback === 'function' && callback()
                        ylxInterceptorCall.setInterceptKey('login', true)
                    },
                    fail: function (fail) {
                        console.log('保存token过期时间失败', fail)
                    }
                });
            },
            fail: function (fail) {
                console.log('保存token失败', fail)
            }
        });
    }

    return {
        checkTokenValidity
    };
}

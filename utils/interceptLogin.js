import {useUserStore} from "@/stores/user";
import {computed} from "vue";
import {ylxRedirectTo} from "@/utils/uniTools";

const userStore = useUserStore()

const isLogeIn = computed(() => userStore.isLoggedIn)

function onErrorHandler() {
    uni.showModal({
        title: '登录后，获取完整功能',
        showCancel: false,
        success: function (res) {
            if (res.confirm) {
                ylxRedirectTo('pages/login/login')
            } else if (res.cancel) {
                console.log('用户点击取消');
            }
        }
    });
}
// 拦截登录判断
export default function ({onError = onErrorHandler, onSuccess}) {
    return function (...args) {
        if (typeof onSuccess === 'function') {
            if (isLogeIn.value) {
                onSuccess(...args)
            } else {
                if (typeof onError === 'function') {
                    onError()
                }
            }
        }
    }
}

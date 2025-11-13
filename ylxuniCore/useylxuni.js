import {reactive} from 'vue'

// import ylxuni from "@/.yalc/ylxuni/index.js"
import ylxuni from "@/ylxuniCore/ylxuni.esm.js"

const ylxInstance = ylxuni(uni,reactive)


export const { ylxEventBus,ylxNextPage,ylxInterceptorCall } = ylxInstance

export const InterceptKeys ={
    login: false,// 登录
    isVip: false,// 会员
}
ylxInterceptorCall.initInterceptKeys(InterceptKeys)

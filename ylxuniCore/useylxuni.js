import {reactive} from 'vue'

import ylxIntercept from "@/.yalc/ylxuni/index.js"
// import ylxIntercept from "@/ylxuniCore/ylxuni.esm.js"

const ylxInstance = ylxIntercept(uni,reactive)

export const ylxNextPage = ylxInstance.ylxNextPage.useNextPage
export const { ylxEventBus, ylxMustLogIn } = ylxInstance

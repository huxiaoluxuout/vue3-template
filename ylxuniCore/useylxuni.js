import {reactive} from 'vue'

import ylxuni from "@/.yalc/ylxuni/index.js"
// import ylxuni from "@/ylxuniCore/ylxuni.esm.js"

const ylxInstance = ylxuni(uni,reactive)


export const { ylxEventBus, ylxMustLogIn,ylxNextPage } = ylxInstance

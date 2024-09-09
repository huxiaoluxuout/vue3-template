// import ylxIntercept from "ylxuni"
// import ylxIntercept from "@/.yalc/ylxuni/index.js"
import ylxIntercept from "@/ylxuniCore/ylxuni.esm.js"

const ylxInstance = ylxIntercept()

export const ylxNextPage = ylxInstance.ylxNextPage.useNextPage
export const { ylxEventBus, ylxMustLogIn } = ylxInstance


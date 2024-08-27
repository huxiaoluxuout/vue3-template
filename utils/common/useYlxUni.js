import ylxIntercept from "@/.yalc/ylxuni"
// import ylxIntercept1 from "@/utils/common/core/ylxuni.min.js"

// console.log('ylxIntercept1',ylxIntercept1);

console.log('uni',uni);
const ylx = ylxIntercept(uni)
export default ylx
export const {ylxNextPage,ylxMustLogIn,ylxEventBus,ylxChooseImage} = ylx

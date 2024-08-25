export default function (uni) {
    console.log(uni)
    // #ifdef WEB
    console.log("WEB")
    // #endif

    // #ifndef WEB
    console.log("WE:不显示")
    // #endif

}

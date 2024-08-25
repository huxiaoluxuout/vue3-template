!function (e, o) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = o() : "function" == typeof define && define.amd ? define(o) : (e = "undefined" != typeof globalThis ? globalThis : e || self).npmcode = o()
}(this, (function () {
    "use strict";
    return function () {
        console.log("全平台输出"),
// #ifdef WEB
            console.log("WEB"),
// #endif
// #ifdef APP-PLUS
            console.log("APP-PLUS")
    }
}));

function e(e,t){return Object.prototype.toString.call(e).replace(/\[object (\w+)\]/,"$1").toLowerCase()===t}function t(e){if("object"!=typeof e||null===e)throw new TypeError("Target must be an object");return new Proxy(e,{get:(e,t,n)=>Reflect.get(e,t,n),set:(e,t,n,o)=>Reflect.set(e,t,n,o)})}function n(n=1,o=10){function r(){E.page=c,E.pageSize=l}function i(e){f=!0,u=!1,r(),p(),"function"==typeof e&&e()}function s(){E.page>1&&!u&&p()}let a=null;uni?a=uni:wx&&(a=wx);let c=n,l=o,u=!1,f=!1;const{setFun:g,addFun:d,invokeAllFn:p}=function(){let e=[],t=[];return{addFun:(e,...n)=>{t.some((t=>t.func===e&&t.args.length===n.length))||t.push({func:e,args:n})},setFun:(t,...n)=>{e=[{func:t,args:n}]},invokeAllFn:function(){const n=t.concat(e);for(;n.length>0;){const{func:e,args:t}=n.pop();e(...t)}}}}(),E=t({page:c,pageSize:l});r();let A=0;return{mixinReachBottomPullDownRefresh:{onLoad(){r()},onReachBottom(){s()},onPullDownRefresh(){i(),A=setTimeout((()=>{a.stopPullDownRefresh()}),2500)}},reachBottomHandler:s,pageInfoProxy:E,setFun:g,addFun:d,invokeAllFn:p,reload:i,dataHandler:function({data:t=[],resData:n=[]},o=!1){return a.stopPullDownRefresh(),clearTimeout(A),e(t,"array")?(e(n,"array")||(console.warn("没有数据要返回空数组！！！"),n=[]),f&&(t=[],o=!0,f=!1),o?(E.page+=1,t.concat(n)):1===E.page?n:u?t:(u=!0,t.concat(n))):n}}}function o(){return{ylxEventBus:new s,ylxMustLogIn:new a,ylxNextPage:n}}function r(e){uni.showModal({title:"权限提示",content:"定位服务未开启",confirmText:"去设置",success:t=>{t.confirm&&uni.openAppAuthorizeSetting({success(t){e()}}),t.cancel&&e()}})}const i=new class{constructor(){this.listeners=new Map}on(e,t){if("function"!=typeof t)throw new Error(t+"必须是一个函数");this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t)}once(e,t){if("function"!=typeof t)throw new Error(t+"必须是一个函数");const n=(...o)=>{t(...o),this.off(e,n)};this.on(e,n)}emit(e,...t){let n,o,r;if("string"==typeof e)n=e;else{if("object"!=typeof e)throw new Error("Options必须是字符串或对象");n=e.event,o=e.handler,r=e.source}const i=this.listeners.get(n);if(i)if(o){const e=[...i].find((e=>e.name===o));e&&e({args:t,source:r})}else i.forEach((e=>e({args:t,source:r})))}off(e,t){if(t){if("function"==typeof t){const n=this.listeners.get(e);n&&n.delete(t)}}else this.listeners.set(e,new Set)}clear(){this.listeners.clear()}};class s{static platform=null;constructor(){uni?s.platform=uni:wx&&(s.platform=wx)}static NAVIGATION_TYPES={NAVIGATE_TO:"navigateTo",SWITCH_TAB:"switchTab"};static eventBusSet=new Set;static defaultGlobalCallback=({args:e,source:t})=>console.log("AppEvent",{args:e,source:t});onGlobal(e=s.defaultGlobalCallback){i.on("AppEvent",e),i.on("GLOBAL_PAGES_EVENT",s.handlerListener)}static handlerListener({args:e,source:t}){let[{navigationType:n,targetPath:o,isNavigationEnabled:r,options:i,sourceName:a}]=e;const{path:c,query:l,delimiter:u}=s.parseUrl(o);s.sendTargetPage(c,t,i,a),s.handleNavigation(n,c,l,u,i,r)}static sendTargetPage(e,t,n,o){s.eventBusSet.has(e)?i.emit({event:e,source:o||t},n):i.once("CURRENT_PAGE_EVENT"+e,(()=>(s.eventBusSet.add(e),i.emit({event:e,source:o||t},n))))}static handleNavigation(e,t,n,o,r,i){if(!i)return;if(e!==s.NAVIGATION_TYPES.NAVIGATE_TO&&e!==s.NAVIGATION_TYPES.SWITCH_TAB)return void console.error(`导航路径：${JSON.stringify(s.NAVIGATION_TYPES)}`);const a=e===s.NAVIGATION_TYPES.NAVIGATE_TO?`${t}${n}${o}currentRoute=${t}`:t;s.platform[e]({url:a,fail:e=>console.error("Navigation Error:",e)})}async emit({targetPath:e,options:t={},source:n=""},o=!1,r=s.NAVIGATION_TYPES.NAVIGATE_TO){const a=await s.getRoute(),c="object"==typeof t?Object.assign({fromPage:a},t):t;i.emit({event:"GLOBAL_PAGES_EVENT",source:a,handler:"handlerListener"},{navigationType:r,targetPath:e,isNavigationEnabled:o,options:c,sourceName:n})}async emitGlobal(e={},t=""){const n=await s.getRoute(),o="object"==typeof e?Object.assign({fromPage:n},e):e;i.emit({event:"AppEvent",source:t||n},o)}static getRoute(){const e=getCurrentPages(),t="/"+e[e.length-1].route;return Promise.resolve(t)}on(e){"function"==typeof e&&s.getRoute().then((t=>{s.eventBusSet.has(t)||(s.eventBusSet.add(t),i.on(t,e),i.emit("CURRENT_PAGE_EVENT"+t))}))}static parseUrl(e){const t=e.startsWith("/")?e:"/"+e,[n,o]=t.split("?");return{path:n,query:o?"?"+o:"",delimiter:o?"&":"?"}}}class a{static platform=null;static loginObject={login:!1};constructor(){uni?a.platform=uni:wx&&(a.platform=wx),this.loginProxyObject=t(a.loginObject)}static onError(){a.platform.showModal({title:"登录后，获取完整功能",success:function(e){e.confirm?console.log("用户点击确定"):e.cancel&&console.log("用户点击取消")}})}setInitLogin(e,n){"function"==typeof e?(a.loginObject=e(a.loginObject),this.loginProxyObject=t(a.loginObject)):(a.loginObject=n,this.loginProxyObject=t(a.loginObject))}setLoginToken({tokenKey:e,tokenData:t},n){this.loginProxyObject.login=!0,a.platform.setStorage({key:e,data:t,success:function(){"function"==typeof n&&n()}})}updateLogin(e){this.loginProxyObject.login=!0,"function"==typeof e&&e()}unSetLoginToken(e,t){this.loginProxyObject.login=!1,a.platform.removeStorage({key:e,success:function(){"function"==typeof t&&t()}})}interceptMastLogIn({onSuccess:e,onError:n=a.onError}){const{createInterceptor:o}=function(e){const n=t(e);return{proxyObject:n,createInterceptor:function({onError:t,onSuccess:o}){if("function"==typeof t){if("function"==typeof o)return function(...r){const i=Object.keys(e)[0];n[i]?o(...r):t()};console.error(`${o}: 必须是函数`)}else console.error(`${t}: 必须是函数`)}}}(a.loginObject);return o({onSuccess:e,onError:n})}}Promise.resolve().then((function(){return f})),uni.getSystemInfo({success(e){e.uniPlatform}});const c=e=>{let t=[e];return Array.isArray(e)&&(t=e),new Promise((e=>{plus.android.requestPermissions(t,(function(t){t.deniedAlways.length?e(0):t.deniedPresent.length?e(1):t.granted.length&&e(2)}))}))},l=(e,t)=>{c(e).then((n=>{2===n||1===n?t(!0):0===n&&(u(e),t(!1))}))},u=e=>{const t={"android.permission.ACCESS_FINE_LOCATION":"获取定位权限失败，请手动打开授权或检查系统定位开关","android.permission.CALL_PHONE":"获取拨打电话权限失败，请手动打开授权","android.permission.READ_EXTERNAL_STORAGE":"获取相册权限失败，请手动打开授权","android.permission.CAMERA":"获取相机权限失败，请手动打开授权",[["android.permission.READ_EXTERNAL_STORAGE","android.permission.CAMERA"]]:"获取相机或相册权限失败，请手动打开授权"};uni.showModal({title:"权限提示",content:t[e],confirmText:"去设置",success:e=>{e.confirm&&uni.openAppAuthorizeSetting({success(e){console.log(e)}}),e.cancel}})};var f=Object.freeze({__proto__:null,authorizeReject:u,checkGPS:()=>new Promise(((e,t)=>{var n,o,i,s,a,c=plus.os.name;"android"===c.toLowerCase()?(n=plus.android.importClass("android.content.Context"),o=plus.android.importClass("android.location.LocationManager"),(i=plus.android.runtimeMainActivity().getSystemService(n.LOCATION_SERVICE).isProviderEnabled(o.GPS_PROVIDER))?e(i):r((()=>{t(!1)}))):"ios"===c.toLowerCase()&&(a=(s=plus.ios.import("CLLocationManager")).locationServicesEnabled(),plus.ios.deleteObject(s),a?e(a):r((()=>{t(!1)})))})),checkPermission:c,showAuthTipModal:(e,t=!1)=>{const n={ACCESS_FINE_LOCATION:{authorize:"android.permission.ACCESS_FINE_LOCATION",title:"定位权限说明",describe:"便于您检索附近的客户，请您确认授权，否则无法使用该功能"},CALL_PHONE:{authorize:"android.permission.CALL_PHONE",title:"拨打电话权限说明",describe:"便于您使用该功能拨打客服电话，联系客户。请您确认授权，否则无法使用该功能"},READ_EXTERNAL_STORAGE:{authorize:"android.permission.READ_EXTERNAL_STORAGE",title:"相册存储权限说明",describe:"便于您使用该功能上传您的照片、图片、视频，完善认证信息。请您确认授权，否则无法使用该功能"},CAMERA:{authorize:"android.permission.CAMERA",title:"相机权限说明",describe:"便于您使用该功能拍摄图片、录制视频，请您确认授权，否则无法使用该功能"},READ_EXTERNAL_STORAGE_CAMERA:{authorize:["android.permission.READ_EXTERNAL_STORAGE","android.permission.CAMERA"],title:"相册、相机权限说明",describe:"相册：便于您使用该功能上传您的照片、图片、视频，完善师傅认证信息。\n相机：便于您使用该功能拍摄图片、录制视频。\n请您确认授权，否则无法使用上述功能"}};return new Promise((o=>{"ios"!==plus.os.name.toLowerCase()?uni.getStorageSync(e)||!1?t?o():l(n[e].authorize,o):uni.showModal({title:n[e].title,content:n[e].describe,confirmText:"确定使用",success:r=>{if(r.confirm){if(uni.setStorageSync(e,!0),t)return void o();l(n[e].authorize,o)}else if(r.cancel){if(t)return;o(!1)}},fail:e=>{console.error(e)}}):o(!0)}))}});export{o as default};

function e(e,t){return Object.prototype.toString.call(e).replace(/\[object (\w+)\]/,"$1").toLowerCase()===t}function t(e){if("object"!=typeof e||null===e)throw new TypeError("Target must be an object");return new Proxy(e,{get:(e,t,n)=>Reflect.get(e,t,n),set:(e,t,n,o)=>Reflect.set(e,t,n,o)})}function n(n=1,o=10){function r(){y.page=c,y.pageSize=l}function s(e){f=!0,u=!1,r(),h(),"function"==typeof e&&e()}function i(){y.page>1&&!u&&h()}let a=null;uni?a=uni:wx&&(a=wx);let c=n,l=o,u=!1,f=!1;const{setFun:g,addFun:p,invokeAllFn:h}=function(){let e=[],t=[];return{addFun:(e,...n)=>{t.some((t=>t.func===e&&t.args.length===n.length))||t.push({func:e,args:n})},setFun:(t,...n)=>{e=[{func:t,args:n}]},invokeAllFn:function(){const n=t.concat(e);for(;n.length>0;){const{func:e,args:t}=n.pop();e(...t)}}}}(),y=t({page:c,pageSize:l});r();let T=0;return{mixinReachBottomPullDownRefresh:{onLoad(){r()},onReachBottom(){i()},onPullDownRefresh(){s(),T=setTimeout((()=>{a.stopPullDownRefresh()}),2500)}},reachBottomHandler:i,pageInfoProxy:y,setFun:g,addFun:p,invokeAllFn:h,reload:s,dataHandler:function({data:t=[],resData:n=[]},o=!1){return a.stopPullDownRefresh(),clearTimeout(T),e(t,"array")?(e(n,"array")||(console.warn("没有数据要返回空数组！！！"),n=[]),f&&(t=[],o=!0,f=!1),o?(y.page+=1,t.concat(n)):1===y.page?n:u?t:(u=!0,t.concat(n))):n}}}function o(){return{ylxEventBus:new s,ylxMustLogIn:new i,ylxNextPage:n}}const r=new class{constructor(){this.eventListeners=new Map}on(e,t){if("function"!=typeof t)throw new Error(`${t} 必须是一个函数`);this.eventListeners.has(e)||this.eventListeners.set(e,new Set),this.eventListeners.get(e).add(t)}once(e,t){if("function"!=typeof t)throw new Error(`${t} 必须是一个函数`);const n=(...o)=>{t(...o),this.off(e,n)};this.on(e,n)}emit(e,...t){let n,o,r;if("string"==typeof e)n=e;else{if("object"!=typeof e)throw new Error("Options 必须是字符串或对象");n=e.event,o=e.handler,r=e.source}const s=this.eventListeners.get(n);if(!s)return;const i={args:t,source:r};if(o){for(const e of s)if(e.name===o){e(i);break}}else s.forEach((e=>e(i)))}off(e,t){if(t){if("function"==typeof t){const n=this.eventListeners.get(e);n&&n.delete(t)}}else this.eventListeners.delete(e)}clear(){this.eventListeners.clear()}};class s{static platform=null;constructor(){uni?s.platform=uni:wx&&(s.platform=wx)}static NAVIGATION_TYPES={NAVIGATE_TO:"navigateTo",SWITCH_TAB:"switchTab"};static eventBusSet=new Set;static defaultGlobalCallback=({args:e,source:t})=>console.log("AppEvent",{args:e,source:t});onGlobal(e=s.defaultGlobalCallback){r.on("AppEvent",e),r.on("GLOBAL_PAGES_EVENT",s.handlerListener)}static handlerListener({args:e,source:t}){console.log("handlerListener",e,t);let[{navigationType:n,targetPath:o,isNavigationEnabled:r,options:i,sourceName:a}]=e;const{path:c,query:l,delimiter:u}=s.parseUrl(o);s.sendTargetPage(c,t,i,a),s.handleNavigation(n,c,l,u,i,r)}static sendTargetPage(e,t,n,o){s.eventBusSet.has(e)?r.emit({event:e,source:o||t},n):r.once("CURRENT_PAGE_EVENT"+e,(()=>(s.eventBusSet.add(e),r.emit({event:e,source:o||t},n))))}static handleNavigation(e,t,n,o,r,i){if(!i)return;if(e!==s.NAVIGATION_TYPES.NAVIGATE_TO&&e!==s.NAVIGATION_TYPES.SWITCH_TAB)return void console.error(`导航路径：${JSON.stringify(s.NAVIGATION_TYPES)}`);const a=e===s.NAVIGATION_TYPES.NAVIGATE_TO?`${t}${n}${o}currentRoute=${t}`:t;s.platform[e]({url:a,fail:e=>console.error("Navigation Error:",e)})}async emit({targetPath:e,options:t={},source:n=""},o=!1,i=s.NAVIGATION_TYPES.NAVIGATE_TO){const a=await s.getRoute(),c="object"==typeof t?Object.assign({fromPage:a},t):t;r.emit({event:"GLOBAL_PAGES_EVENT",source:a,handler:"handlerListener"},{navigationType:i,targetPath:e,isNavigationEnabled:o,options:c,sourceName:n})}async emitGlobal(e={},t=""){const n=await s.getRoute(),o="object"==typeof e?Object.assign({fromPage:n},e):e;r.emit({event:"AppEvent",source:t||n},o)}static getRoute(){const e=getCurrentPages(),t="/"+e[e.length-1].route;return Promise.resolve(t)}on(e){"function"==typeof e&&s.getRoute().then((t=>{s.eventBusSet.has(t)||(s.eventBusSet.add(t),r.on(t,e),r.emit("CURRENT_PAGE_EVENT"+t))}))}static parseUrl(e){const t=e.startsWith("/")?e:"/"+e,[n,o]=t.split("?");return{path:n,query:o?"?"+o:"",delimiter:o?"&":"?"}}}class i{static platform=null;static loginObject={login:!1};constructor(){uni?i.platform=uni:wx&&(i.platform=wx),this.loginProxyObject=t(i.loginObject)}static onError(){i.platform.showModal({title:"登录后，获取完整功能",success:function(e){e.confirm?console.log("用户点击确定"):e.cancel&&console.log("用户点击取消")}})}setInitLogin(e,n){"function"==typeof e?(i.loginObject=e(i.loginObject),this.loginProxyObject=t(i.loginObject)):(i.loginObject=n,this.loginProxyObject=t(i.loginObject))}setLoginToken({tokenKey:e,tokenData:t},n){this.loginProxyObject.login=!0,i.platform.setStorage({key:e,data:t,success:function(){"function"==typeof n&&n()}})}updateLogin(e){this.loginProxyObject.login=!0,"function"==typeof e&&e()}unSetLoginToken(e,t){this.loginProxyObject.login=!1,i.platform.removeStorage({key:e,success:function(){"function"==typeof t&&t()}})}interceptMastLogIn({onSuccess:e,onError:n=i.onError}){const{createInterceptor:o}=function(e){const n=t(e);return{proxyObject:n,createInterceptor:function({onError:t,onSuccess:o}){if("function"==typeof t){if("function"==typeof o)return function(...r){const s=Object.keys(e)[0];n[s]?o(...r):t()};console.error(`${o}: 必须是函数`)}else console.error(`${t}: 必须是函数`)}}}(i.loginObject);return o({onSuccess:e,onError:n})}}export{o as default};

function e(e,t){return Object.prototype.toString.call(e).replace(/\[object (\w+)\]/,"$1").toLowerCase()===t}function t(e,t={}){if("object"!=typeof e||null===e)throw new TypeError("Target must be an object");return new Proxy(e,{get:(e,t,o)=>Reflect.get(e,t,o),set:(e,o,n,r)=>(t.__wxExparserNodeId__&&t.setData({[o]:n}),Reflect.set(e,o,n,r))})}function o(e=uni){return{ylxEventBus:new s(e),ylxMustLogIn:new c(e),ylxNextPage:new a(e)}}import{reactive as n}from"vue";const r=new class{constructor(){this.eventListeners=new Map}on(e,t){if("function"!=typeof t)throw new Error(`${t} 必须是一个函数`);this.eventListeners.has(e)||this.eventListeners.set(e,new Set),this.eventListeners.get(e).add(t)}once(e,t){if("function"!=typeof t)throw new Error(`${t} 必须是一个函数`);const o=(...n)=>{t(...n),this.off(e,o)};this.on(e,o)}emit(e,...t){let o,n,r;if("string"==typeof e)o=e;else{if("object"!=typeof e)throw new Error("Options 必须是字符串或对象");o=e.event,n=e.handler,r=e.source}const s=this.eventListeners.get(o);if(!s)return;const a={args:t,source:r};if(n){for(const e of s)if(e.name===n){e(a);break}}else s.forEach((e=>e(a)))}off(e,t){if(t){if("function"==typeof t){const o=this.eventListeners.get(e);o&&o.delete(t)}}else this.eventListeners.delete(e)}clear(){this.eventListeners.clear()}};class s{static platform=null;constructor(e){s.platform=e}static NAVIGATION_TYPES={NAVIGATE_TO:"navigateTo",SWITCH_TAB:"switchTab"};static eventBusSet=new Set;static defaultGlobalCallback=({args:e,source:t})=>console.log("AppEvent",{args:e,source:t});onGlobal(e=s.defaultGlobalCallback){r.on("AppEvent",e),r.on("GLOBAL_PAGES_EVENT",s.handlerListener)}static handlerListener({args:e,source:t}){let[{navigationType:o,targetPath:n,isNavigationEnabled:r,options:a,sourceName:c}]=e;const{path:i,query:l,delimiter:u}=s.parseUrl(n);s.sendTargetPage(i,t,a,c),s.handleNavigation(o,i,l,u,a,r)}static sendTargetPage(e,t,o,n){s.eventBusSet.has(e)?r.emit({event:e,source:n||t},o):r.once("CURRENT_PAGE_EVENT"+e,(()=>(s.eventBusSet.add(e),r.emit({event:e,source:n||t},o))))}static handleNavigation(e,t,o,n,r,a){if(!a)return;if(e!==s.NAVIGATION_TYPES.NAVIGATE_TO&&e!==s.NAVIGATION_TYPES.SWITCH_TAB)return void console.error(`导航路径：${JSON.stringify(s.NAVIGATION_TYPES)}`);const c=e===s.NAVIGATION_TYPES.NAVIGATE_TO?`${t}${o}${n}currentRoute=${t}`:t;s.platform[e]({url:c,fail:e=>console.error("Navigation Error:",e)})}async emit({targetPath:e,options:t={},source:o=""},n=!1,a=s.NAVIGATION_TYPES.NAVIGATE_TO){const c=await s.getRoute(),i="object"==typeof t?Object.assign({fromPage:c},t):t;r.emit({event:"GLOBAL_PAGES_EVENT",source:c,handler:"handlerListener"},{navigationType:a,targetPath:e,isNavigationEnabled:n,options:i,sourceName:o})}async emitGlobal(e={},t=""){const o=await s.getRoute(),n="object"==typeof e?Object.assign({fromPage:o},e):e;r.emit({event:"AppEvent",source:t||o},n)}static getRoute(){const e=getCurrentPages(),t="/"+e[e.length-1].route;return Promise.resolve(t)}on(e){"function"==typeof e&&s.getRoute().then((t=>{s.eventBusSet.has(t)||(s.eventBusSet.add(t),r.on(t,e),r.emit("CURRENT_PAGE_EVENT"+t))}))}static parseUrl(e){const t=e.startsWith("/")?e:"/"+e,[o,n]=t.split("?");return{path:o,query:n?"?"+n:"",delimiter:n?"&":"?"}}}class a{static platform=null;constructor(e){a.platform=e}useNextPage(o=1,n=10){function r(){y.page=i,y.pageSize=l}function s(e){f=!0,u=!1,r(),h(),"function"==typeof e&&e()}function c(){y.page>1&&!u&&h()}let i=o,l=n,u=!1,f=!1;const{setFun:g,addFun:p,invokeAllFn:h}=function(){let e=[],t=[];return{addFun:(e,...o)=>{t.some((t=>t.func===e&&t.args.length===o.length))||t.push({func:e,args:o})},setFun:(t,...o)=>{e=[{func:t,args:o}]},invokeAllFn:function(){const o=t.concat(e);for(;o.length>0;){const{func:e,args:t}=o.pop();e(...t)}}}}(),y=t({page:i,pageSize:l});r();let d=0;return{mixinReachBottomPullDownRefresh:{onLoad(){r()},onReachBottom(){c()},onPullDownRefresh(){s(),d=setTimeout((()=>{a.platform.stopPullDownRefresh()}),2500)}},reachBottomHandler:c,pageInfoProxy:y,setFun:g,addFun:p,invokeAllFn:h,reload:s,dataHandler:function({data:t=[],resData:o=[]},n=!1){return a.platform.stopPullDownRefresh(),clearTimeout(d),e(t,"array")?(e(o,"array")||(console.warn("没有数据要返回空数组！！！"),o=[]),f&&(t=[],n=!0,f=!1),n?(y.page+=1,t.concat(o)):1===y.page?o:u?t:(u=!0,t.concat(o))):o}}}}class c{static platform=null;static loginObject={login:!1};constructor(e){c.platform=e,n&&(c.loginObject=n(c.loginObject)),this.loginProxyObject=t(c.loginObject)}static onError(){c.platform.showModal({title:"登录后，获取完整功能",success:function(e){e.confirm?console.log("用户点击确定"):e.cancel&&console.log("用户点击取消")}})}setWxProxyObject(e,o){let n=t(e,o),r=t(n,o);return this.loginProxyObject=r,this.loginProxyObject}setLoginToken({tokenKey:e,tokenData:t},o){this.loginProxyObject.login=!0,c.platform.setStorage({key:e,data:t,success:function(){"function"==typeof o&&o()}})}updateLogin(e){this.loginProxyObject.login=!0,"function"==typeof e&&e()}unSetLoginToken(e,t){this.loginProxyObject.login=!1,c.platform.removeStorage({key:e,success:function(){"function"==typeof t&&t()}})}interceptMastLogIn({onSuccess:e,onError:o=c.onError}){const{createInterceptor:n}=function(e){const o=t(e);return{proxyObject:o,createInterceptor:function({onError:t,onSuccess:n}){if("function"==typeof t){if("function"==typeof n)return function(...r){const s=Object.keys(e)[0];o[s]?n(...r):t()};console.error(`${n}: 必须是函数`)}else console.error(`${t}: 必须是函数`)}}}(c.loginObject);return n({onSuccess:e,onError:o})}}export{o as default};

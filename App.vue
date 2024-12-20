<script setup>
import {onLaunch,onShow} from '@dcloudio/uni-app'

import {wxLogin} from "@/network/apis/meiFa";

import {useUserStore} from "@/stores/user";
const userStore = useUserStore();

/*----------------------------------*/
import {ylxEventBus, ylxMustLogIn} from "@/ylxuniCore/useylxuni.js";
import {ylxRedirectTo} from "@/utils/uniTools";
import {objToStr} from "@/utils/tools";

function getWxLoginInfo() {
  /*wxLogin().then((loginRes) => {
    if (!loginRes.data.is_register) {
      userStore.logout()
    } else {
      userStore.login(loginRes.data)
    }

  })*/
}
onLaunch(() => {

  getWxLoginInfo()

  ylxEventBus.onGlobal((data)=>{
    console.log('ylxEventBus',data)
    // getWxLoginInfo()

  })

})

onShow((options) => {
  console.log('App onShow', options)
  if(options.scene===1007||options.scene===1008){
    console.log('来自分享')
    // 来自分享,未登录。跳转到登录页，
    if (!ylxMustLogIn.loginProxyObject.login) {
      ylxRedirectTo('pages/login/login',{toPage:true,pagePath:options.path,pagePrams:objToStr(options.query)})
    }

  }

})
</script>

<style lang="scss">

@import "static/css/ylx-tailwindcss.css";
@import "static/css/common.css";
@import "static/css/projects.css";


</style>

<script setup>
import {onLaunch} from '@dcloudio/uni-app'

import {wxLogin} from "@/network/apis/meiFa";
import {ylxOpenWxDebug} from "@/utils/uniTools";
import instanceUniEventBus from "@/utils/common/uniEventBus/instanceUniEventBus";
import {useUserStore} from "@/stores/user";
import instanceWxEventBus from "@/utils/common/eventBus/instanceEventBus.js";

const userStore = useUserStore();

function getWxLoginInfo() {
  wxLogin().then((loginRes) => {
    if (!loginRes.data.is_register) {
      userStore.logout()
    } else {
      userStore.login(loginRes.data)
    }

  })
}
onLaunch(() => {

  ylxOpenWxDebug()
  getWxLoginInfo()
  instanceUniEventBus.registerGlobalEvent((options)=>{
    console.log(options)
    // getWxLoginInfo()
  })
  instanceWxEventBus.registerGlobalEvent(({args, source})=>{
    console.log('instanceWxEventBus',...args, source)

  })
})
</script>

<style lang="scss">

@import "static/css/ylx-tailwindcss.css";
@import "static/css/common.css";
@import "static/css/mf.css";


</style>

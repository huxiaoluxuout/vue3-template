<script setup>
import {onLaunch} from '@dcloudio/uni-app'

import {wxLogin} from "@/network/apis/meiFa";

import {useUserStore} from "@/stores/user";
import {ylxEventBus} from "@/utils/common/useYlxUni.js";

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

  getWxLoginInfo()

  ylxEventBus.onGlobal(({args, source})=>{
    console.log('instanceWxEventBus',...args, source)
    // getWxLoginInfo()

  })

})
</script>

<style lang="scss">

@import "static/css/ylx-tailwindcss.css";
@import "static/css/common.css";
@import "static/css/projects.css";


</style>

import instanceUniEventBus from "@/utils/common/uniEventBus/instanceUniEventBus";
import {onUnmounted, ref} from 'vue';

export function useUniEventBusVue3(callback) {
    if (typeof callback !== 'function') {
        console.error(`${callback}必须是函数`);
        return;
    }
    const currentPageEventName = ref('')
    instanceUniEventBus.getCurrentRoute().then(pageEventName => {
        currentPageEventName.value = pageEventName
        callback()
    })
    onUnmounted(() => {
        instanceUniEventBus.removeCurrentRouteEvent(currentPageEventName.value)
    })
}

import instanceUniEventBus from "@/utils/common/uniEventBus/instanceUniEventBus";

export default {
    data() {
        return {
            currentPageEventName: '',
        }
    },
    onLoad: function () {
        instanceUniEventBus.getCurrentRoute().then(currentPageEventName => {
            this.currentPageEventName = currentPageEventName
        })
    },
    onUnload() {
        instanceUniEventBus.removeCurrentRouteEvent(this.currentPageEventName)
    },
}


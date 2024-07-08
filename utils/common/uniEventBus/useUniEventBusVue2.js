import instanceUniEventBus from "@/utils/common/uniEventBus/instanceUniEventBus";

export default {
    data() {
        return {
            currentPageEventName: '',
        }
    },
    onLoad: function () {
        instanceUniEventBus.getCurrentPageEventName().then(currentPageEventName => {
            this.currentPageEventName = currentPageEventName
        })
    },
    onUnload() {
        instanceUniEventBus.removeCurrentPageEventName(this.currentPageEventName)
    },
}


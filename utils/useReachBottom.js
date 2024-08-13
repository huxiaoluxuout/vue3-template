import useDoQueue from "@/utils/common/useDoQueue.js";
import createProxy from "@/utils/common/createProxy.js";

export default function useReachBottom() {
    let pageData = null
    const {setFunction, addFunctions, invokeAllFn} = useDoQueue()
    const pageInfo = {
        page: 1,
        pageSize: 10,
    };
    const pageInfoProxy = createProxy(pageInfo)

    function resetPageInfo() {
        pageInfoProxy.page = 1
        pageInfoProxy.pageSize = 10
    }

    resetPageInfo()

    let isNoData = false
    let isByReload = false

    // 重新加载
    function reloadHandler() {
        isByReload = true
        isNoData = false
        resetPageInfo()
        if (Array.isArray(pageData)) {
            pageData.length = 0
        } else {
            pageData = null
        }

        invokeAllFn();
    }

    // 触底加载下一页数据
    function reachBottomHandler() {
        console.log('触底加载下一页数据')
        if (!isNoData) {
            invokeAllFn();
        } else {
            console.warn('到底了')
        }
    }

    // 下拉刷新
    function pullDownRefreshHandler() {
        reloadHandler()

        setTimeout(() => {
            uni.stopPullDownRefresh();
        }, 2500)
    }

    function resDataHandler({data = [], resData = []}, isNextPage = false) {
        if (typeof pageData === null) {
            pageData = data
        }

        uni.stopPullDownRefresh();
        if (!Array.isArray(data) || !Array.isArray(resData)) {
            return resData;
        }

        // 处理重新加载
        if (isByReload) {
            isByReload = false;
            if (isNextPage) {
                pageInfoProxy.page += 1;
            }
            return resData;
        }

        // 处理下一页
        if (isNextPage) {
            pageInfoProxy.page += 1;
            return data.concat(resData);
        } else {
            console.log('这是最后的一页了', pageInfoProxy.page);
            if (isNoData) {
                resData = [];
            }
            isNoData = true;
            return data.concat(resData);
        }
    }

    // #ifndef VUE3
    const mixinReachBottomPullDownRefresh = {
        onLoad() {
            resetPageInfo()
        },
        onReachBottom() {
            if (!isNoData && pageInfoProxy.page > 1) {
                reachBottomHandler()
            }
        },
        onPullDownRefresh() {
            pullDownRefreshHandler()
        },
    }
    // #endif

    return {
        // #ifndef VUE3
        mixinReachBottomPullDownRefresh,
        // #endif

        pageInfoProxy,
        setFunction,
        addFunctions,
        invokeAllFn,
        reload: reloadHandler,
        dataHandler: resDataHandler,

    }
}

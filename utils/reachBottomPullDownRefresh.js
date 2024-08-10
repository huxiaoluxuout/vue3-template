import useDoQueue from "@/utils/common/useDoQueue.js";
import {throttle} from "@/utils/throttle.js";
import createProxy from "@/utils/common/createProxy.js";


export default function reachBottomPullDownRefresh() {
    const {setFunction, addFunctions, invokeAllFn} = useDoQueue()
    const pageInfo = {
        page: 1,
        pageSize: 10,
    };


    const pageInfoProxy = createProxy(pageInfo)


    let isNoData = false
    let isByReload = false
    function resetPageInfo() {
        pageInfoProxy.page = 1
        pageInfoProxy.pageSize = 10
    }

    // 触底加载下一页数据
    function reachBottomHandler() {
        console.log('触底加载下一页数据')
        if (!isNoData) {

             throttle(() => {
                 invokeAllFn();
             })
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

    let vm = null
    let dataKeys = 'list'

    function setThis(that, dataKey) {
        vm = that
    }

    // 重新加载
    function reloadHandler() {
        isByReload = true
        isNoData = false
        resetPageInfo()
        vm[dataKeys] = []

        invokeAllFn();
    }

    function resDataHandler({data = [], newData = []}, isNextPage = false) {
        uni.stopPullDownRefresh();
        if (!Array.isArray(data) || !Array.isArray(newData)) {
            return newData;
        }

        console.log('isNextPage', isNextPage)
        // 处理重载
        if (isByReload) {
            isByReload = false;
            if (isNextPage) {
                pageInfoProxy.page += 1;
            }
            return newData;
        }

        // 处理下一页
        if (isNextPage) {
            pageInfoProxy.page += 1;

            return data.concat(newData);
        } else {
            console.log('这是最后的一页了', pageInfoProxy.page);
            if (isNoData) {
                newData = [];
            }
            isNoData = true;
            return data.concat(newData);
        }
    }

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


    return {
        mixinReachBottomPullDownRefresh,
        pageInfoProxy,
        setFunction,
        addFunctions,
        invokeAllFn,
        reload: reloadHandler,
        dataHandler: resDataHandler,
        setThis
    }
}

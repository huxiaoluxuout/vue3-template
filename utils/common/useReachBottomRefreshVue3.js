import {ref} from "vue";

import {throttle} from "@/utils/throttle";
import useDoQueue from "@/utils/common/useDoQueue";


export default function useReachBottomRefreshVue3() {
    const {setFunction, addFunctions, invokeAllFn} = useDoQueue()

    // 当前页码
    const page = ref(1)

    // 每页数量
    const pageSize = ref(10)

    // 是否正在加载中
    const isLoading = ref(false)
    let reloadNextPageStatus = true


    // 重新加载
    const reload = (data) => {
        isLoading.value = false
        page.value = 1
        pageSize.value = 10
        if(Array.isArray(data)){
            data.length = 0
        }
        invokeAllFn();

    }

    // 更新pages
    const updateNextPage = (reloadNextPage) => {
        reloadNextPageStatus = reloadNextPage
        uni.stopPullDownRefresh();
        if (reloadNextPage) {
            isLoading.value = false; // 加载完成
            page.value++; // 页码加1
        } else {
            isLoading.value = false; // 加载失败
        }
    }

    // 触底加载下一页数据
    const reachBottomHandler = () => {
        throttle(() => {
            if (!isLoading.value) {
                //isLoading.value = true; // 标记为正在加载中
                if (reloadNextPageStatus) {
                    invokeAllFn();
                }
            }
        })
    }

    // 下拉刷新
    const pullDownRefreshHandler = (dataList) => {
        //isLoading.value = true; // 标记为正在加载中
        reload(dataList)

        setTimeout(() => {
            uni.stopPullDownRefresh();
        }, 3000)
    }

    return {
        page: page,
        pageSize: pageSize,
        isLoading:isLoading,
        reachBottomHandler,
        pullDownRefreshHandler,
        reload,
        updateNextPage,
        setFunction,
        addFunctions,
        invokeAllFn
    };
}

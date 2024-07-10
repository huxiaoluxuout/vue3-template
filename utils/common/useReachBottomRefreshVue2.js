import {throttle} from "@/utils/throttle";
import useDoQueue from "@/utils/common/useDoQueue";


export default function mixinReachBottomPullDownRefreshVue2() {
    const {setFunction, addFunctions, invokeAllFn} = useDoQueue()

    const mixinReachBottomPullDownRefresh = {
        data() {
            return {
                // 当前页码
                page: 1,
                // 每页数量
                pageSize: 10,
                // 是否正在加载中
                isLoading: false,
                reloadNextPageStatus: true
            }
        },
        methods: {
            // 重新加载
            reload(data) {
                this.isLoading = false
                this.page = 1
                this.pageSize = 10
                if (Array.isArray(data)) {
                    data.length = 0
                }
                invokeAllFn();

            },

            // 更新pages
            updateNextPage(reloadNextPage) {
                this.reloadNextPageStatus = reloadNextPage
                uni.stopPullDownRefresh();
                if (reloadNextPage) {
                    this.isLoading = false; // 加载完成
                    this.page++; // 页码加1
                } else {
                    this.isLoading = false; // 加载失败
                }
            },
            // 触底加载下一页数据
            reachBottomHandler() {
                console.log('触底加载下一页数据')
                throttle(() => {
                    if (!this.isLoading) {
                        // this.isLoading = true; // 标记为正在加载中
                        if (this.reloadNextPageStatus) {
                            invokeAllFn();
                        }
                    }
                })
            },

            // 下拉刷新
            pullDownRefreshHandler(dataList) {
                console.log('下拉刷新')

                // this.isLoading = true; // 标记为正在加载中
                this.reload(dataList)
                setTimeout(() => {
                    uni.stopPullDownRefresh();
                }, 800)
            }
        },
        onReachBottom() {
            this.reachBottomHandler()
        },
        onPullDownRefresh() {
            this.pullDownRefreshHandler()
        },
    }


    return {
        mixinReachBottomPullDownRefresh,
        setFunction,
        addFunctions,
        invokeAllFn
    }
}

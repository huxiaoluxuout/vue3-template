// src/utils/suspensionConfig.js
/**
 * 悬浮组件公共默认配置
 * 统一单位：所有位置/尺寸字段均为 rpx（uni-app 跨端适配单位）
 */
export const DEFAULT_SUSPENSION_CONFIG = {
    /**
     * 初始定位方向：是否靠右显示
     * true - 靠右定位（使用 right 属性）
     * false - 靠左定位（使用 left 属性）
     * 类型：boolean
     * 默认值：true
     */
    useRightPosition: true,

    /**
     * 初始水平偏移量（rpx）
     * 结合 useRightPosition 使用：
     * - useRightPosition=true 时：距离右侧的水平距离
     * - useRightPosition=false 时：距离左侧的水平距离
     * 类型：number
     * 默认值：0（紧贴边缘）
     */
    initialHorizontal: 4,

    /**
     * 初始底部偏移量（rpx）
     * 组件距离屏幕底部的初始垂直距离
     * 类型：number
     * 默认值：600
     */
    initialBottom: 600,

    /**
     * 组件固定尺寸（宽高一致，rpx）
     * 类型：number
     * 默认值：80
     */
    blockSize: 80,
    /**
     * 拖动方向限制
     * 控制组件允许的拖动维度：
     * - 'free'：自由拖动（X轴 + Y轴）
     * - 'horizontal'：仅横向拖动（仅 X轴，Y轴固定）
     * - 'vertical'：仅竖向拖动（仅 Y轴，X轴固定）
     * 类型：string（枚举值）
     * 默认值：'vertical'（仅竖向拖动）
     */
    dragDirection: 'vertical',
    /**
     * 顶部禁止拖动区域高度（rpx）
     * 固定配置，组件顶部不可进入的屏幕顶部区域高度
     * 类型：number
     * 默认值：230（适配状态栏、导航栏区域）
     */
    topForbiddenHeight: 230,
    /**
     * 底部禁止拖动区域高度（rpx）
     * 组件底部不可进入的屏幕底部区域高度
     * 类型：number
     * 默认值：180
     */
    bottomForbiddenHeight: 180,


    /**
     * iOS 设备 X 轴拖动阻尼系数
     * 用于优化 iOS 设备拖动手感，减小拖动灵敏度
     * 系数越大，拖动越"笨重"；系数越小，拖动越灵敏
     * 类型：number
     * 默认值：1.2（iOS 专属适配，无单位）
     */
    iosXAxisDamping: 1.2,

    /**
     * 触摸移动事件节流间隔（ms）
     * 控制 onTouchMove 事件触发频率，避免高频触发导致性能问题
     * 类型：number
     * 默认值：6（平衡流畅度和性能）
     */
    moveThrottle: 6,

    /**
     * 位置平滑过渡因子
     * 拖动结束后归位动画的平滑程度（0-1 之间）
     * 因子越接近 1，动画越平滑但速度越慢；越接近 0，动画越生硬但速度越快
     * 类型：number
     * 默认值：0.85（兼顾平滑度和响应速度，无单位）
     */
    positionSmoothing: 0.85,
}

/**
 * 悬浮组件默认位置（rpx）
 * 组件相对于初始定位的偏移量（拖动后会更新）
 */
export const DEFAULT_SUSPENSION_POSITION = {
    /**
     * X 轴偏移量（rpx）
     * 相对于初始水平位置的偏移，向右为正
     * 类型：number
     * 默认值：0（初始无偏移）
     */
    translateX: 0,

    /**
     * Y 轴偏移量（rpx）
     * 相对于初始底部位置的偏移，向下为正
     * 类型：number
     * 默认值：0（初始无偏移）
     */
    translateY: 0
}

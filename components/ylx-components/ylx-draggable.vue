<template>
  <view
      v-if="isReady"
      class="global-black-block"
      :style="[baseStyle, positionStyle]"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      @click="clickDrag"
  >
    <slot></slot>
    <view class="drag-direction-tag" v-if="showDirectionTag">
      {{ dragDirectionText }}
    </view>
  </view>
</template>

<script setup>
import {onHide, onShow} from '@dcloudio/uni-app'
import {computed, nextTick, onUnmounted, ref, defineEmits} from 'vue'
import {useSuspensionStore} from '@/stores/suspension'
import {
  DEFAULT_SUSPENSION_CONFIG,
  DEFAULT_SUSPENSION_POSITION,
} from '@/utils/draggable'

// 定义自定义事件（传递位置参数，单位均为 rpx）
const emit = defineEmits(['drag-move', 'drag-end', 'click-drag'])

const suspensionStore = useSuspensionStore()

// 控制元素是否显示
const isReady = ref(false)
const isInitCompleted = ref(false)
let timeId = null

function clickDrag() {
  // isReady.value = false
  emit('click-drag', true)
  clearTimers(timeId)
  timeId = null
  timeId = setTimeout(() => {
    /*isReady.value = true
    emit('click-drag', false)*/
  }, 5000)
}

// 常量定义（仅保留无需配置的固定常量）
const SHOW_DELAY = 0 // 延迟显示时间（毫秒）

// 基础数据
const isIOS = ref(false)
const rpxToPxRatio = ref(1) // 新增：rpx 转 px 比例（1rpx = ? px）
const screenWidthRpx = ref(750) // uni-app 固定设计稿宽度（rpx）
const screenHeightRpx = ref(1334) // 屏幕高度（rpx）
const boundary = ref({minX: 0, maxX: 0, minY: 0, maxY: 0}) // 拖动边界（rpx）

// 位置相关变量（均为 rpx 单位）
const translateX = ref(0)
const translateY = ref(0)
const targetX = ref(0)
const targetY = ref(0)

// 触摸事件相关变量
const startTouchX = ref(0) // 原始触摸 X 坐标（px）
const startTouchY = ref(0) // 原始触摸 Y 坐标（px）
const startTranslateX = ref(0) // 初始 X 偏移（rpx）
const startTranslateY = ref(0) // 初始 Y 偏移（rpx）
const lastMoveTime = ref(0)
const isDragging = ref(false)

// 定时器变量
let showDelayTimer = null
let smoothTimer = null

// 辅助计算属性（均基于 rpx 单位）
const dragDirection = computed(() => suspensionStore.config.dragDirection || DEFAULT_SUSPENSION_CONFIG.dragDirection)
const dragDirectionText = computed(() => {
  const map = {
    free: '自由拖动',
    horizontal: '仅横向拖动',
    vertical: '仅竖向拖动'
  }
  return map[dragDirection.value]
})
const showDirectionTag = ref(false) // 是否显示方向标签
const bottomForbiddenHeight = computed(() => {
  // 确保配置为有效数字（rpx）
  const height = suspensionStore.config.bottomForbiddenHeight
  return typeof height === 'number' && height >= 0
      ? height
      : DEFAULT_SUSPENSION_CONFIG.bottomForbiddenHeight
})
const topForbiddenHeight = computed(() => {
  // 确保配置为有效数字（rpx）
  const height = suspensionStore.config.topForbiddenHeight
  return typeof height === 'number' && height >= 0
      ? height
      : DEFAULT_SUSPENSION_CONFIG.topForbiddenHeight
})

/**
 * 安全获取配置（rpx 单位）
 */
const getConfig = () => {
  return {...DEFAULT_SUSPENSION_CONFIG, ...suspensionStore.config}
}

/**
 * 安全获取位置（rpx 单位）
 */
const getPosition = () => {
  const pos = suspensionStore.position
  return isValidPosition(pos) ? pos : {...DEFAULT_SUSPENSION_POSITION}
}

/**
 * 基础样式计算（transform 用 rpx，宽高用 px）
 */
const baseStyle = computed(() => ({
  transform: `translate3d(${translateX.value}rpx, ${translateY.value}rpx, 0)`,
  willChange: 'transform',
  display: 'block',
  overflow: 'visible',
  transition: isDragging.value ? 'none' : 'transform 0.18s cubic-bezier(0.25, 0.8, 0.25, 1)'
}))

/**
 * 定位基础样式（rpx 转 px 用于宽高，其他用 rpx）
 */
const positionStyle = computed(() => {
  const config = getConfig()
  // rpx 转 px：组件宽高需要 px 单位（样式设置）
  const blockSizePx = config.blockSize * rpxToPxRatio.value
  return {
    bottom: `${config.initialBottom}rpx`,
    width: `${blockSizePx}px`, // 转换为 px
    height: `${blockSizePx}px`, // 转换为 px
    right: config.useRightPosition ? `${config.initialHorizontal}rpx` : 'auto',
    left: !config.useRightPosition ? `${config.initialHorizontal}rpx` : 'auto',
    position: 'fixed !important',
    zIndex: '99999999 !important'
  }
})

/**
 * 初始化（所有计算均基于 rpx 单位）
 */
onShow(async () => {
  resetState()

  try {
    // 1. 获取系统信息，计算 rpx 转 px 比例
    let sys = {}
    try {
      sys = uni.getSystemInfoSync()
    } catch (error) {
      sys = {system: 'Android', windowWidth: 375, windowHeight: 667}
      console.warn('获取系统信息失败，使用默认值:', error)
    }

    isIOS.value = sys.system.includes('iOS')
    // 计算 rpx 转 px 比例：屏幕实际宽度（px） / 设计稿宽度（750rpx）
    rpxToPxRatio.value = sys.windowWidth / 750
    // 计算屏幕实际高度（rpx）：屏幕实际高度（px） / rpxToPxRatio
    screenHeightRpx.value = sys.windowHeight / rpxToPxRatio.value

    // 2. 加载配置（rpx 单位）
    const config = getConfig()
    const boundaryBuffer = 3 // 边界缓冲（rpx），无需区分平台

    // 3. 计算 X 轴边界（rpx）
    if (config.dragDirection !== 'vertical') {
      if (config.useRightPosition) {
        boundary.value.minX = -(screenWidthRpx.value - config.blockSize - config.initialHorizontal) - boundaryBuffer
        boundary.value.maxX = boundaryBuffer
      } else {
        boundary.value.minX = -config.initialHorizontal - boundaryBuffer
        boundary.value.maxX = screenWidthRpx.value - config.blockSize - config.initialHorizontal + boundaryBuffer
      }
    } else {
      boundary.value.minX = 0
      boundary.value.maxX = 0
    }

    // 4. 计算 Y 轴边界（rpx，包含顶部+底部禁止区域）
    if (config.dragDirection !== 'horizontal') {
      const topForbidden = topForbiddenHeight.value // 顶部禁止区域（rpx，统一配置）
      const bottomForbidden = bottomForbiddenHeight.value // 底部禁止区域（rpx）

      // 上边界：顶部禁止区域下方（rpx）
      boundary.value.minY = -(
          screenHeightRpx.value - config.initialBottom - config.blockSize - topForbidden
      )

      // 下边界：底部禁止区域上方（rpx）
      boundary.value.maxY = config.initialBottom - bottomForbidden

      // 确保下边界不小于上边界（容错）
      boundary.value.maxY = Math.max(boundary.value.maxY, boundary.value.minY + 10)
    } else {
      boundary.value.minY = 0
      boundary.value.maxY = 0
    }

    // 5. 加载位置数据并修正（rpx）
    let pos = getPosition()
    if (config.dragDirection === 'vertical') pos.translateX = 0
    if (config.dragDirection === 'horizontal') pos.translateY = 0

    // 修正 Y 轴位置：不进入底部禁止区域（rpx）
    pos.translateY = Math.min(pos.translateY, boundary.value.maxY)
    pos.translateY = Math.max(pos.translateY, boundary.value.minY)

    // 最终位置校验（rpx）
    translateX.value = Math.max(boundary.value.minX, Math.min(pos.translateX, boundary.value.maxX))
    translateY.value = Math.max(boundary.value.minY, Math.min(pos.translateY, boundary.value.maxY))
    targetX.value = translateX.value
    targetY.value = translateY.value

    // 触发初始位置事件（传递 rpx 单位）
    emit('drag-move', {
      translateX: translateX.value,
      translateY: translateY.value,
      dragDirection: config.dragDirection,
      isDragging: false,
      bottomForbiddenHeight: bottomForbiddenHeight.value,
      topForbiddenHeight: topForbiddenHeight.value,
      blockSize: config.blockSize // rpx 单位
    })

    isInitCompleted.value = true

    // 6. 延迟显示
    await nextTick()
    showDelayTimer = setTimeout(() => {
      if (isInitCompleted.value) isReady.value = true
    }, SHOW_DELAY)
  } catch (error) {
    console.error('初始化失败:', error)
    // 异常降级：使用公共默认位置（rpx）
    translateX.value = DEFAULT_SUSPENSION_POSITION.translateX
    translateY.value = DEFAULT_SUSPENSION_POSITION.translateY
    targetX.value = translateX.value
    targetY.value = translateY.value
    isInitCompleted.value = true

    await nextTick()
    showDelayTimer = setTimeout(() => {
      if (isInitCompleted.value) isReady.value = true
    }, SHOW_DELAY)
  }
})

/**
 * 触摸开始事件
 */
const onTouchStart = (e) => {
  const touch = e.touches[0]
  if (smoothTimer) clearTimeout(smoothTimer)

  // 记录原始触摸坐标（px）
  startTouchX.value = touch.pageX
  startTouchY.value = touch.pageY
  // 记录当前偏移量（rpx）
  startTranslateX.value = targetX.value
  startTranslateY.value = targetY.value
  lastMoveTime.value = Date.now()
  isDragging.value = true

  translateX.value = targetX.value
  translateY.value = targetY.value
}

/**
 * 触摸移动事件（px 转 rpx 计算偏移）
 */
const onTouchMove = (e) => {
  e.stopPropagation()
  e.preventDefault()

  const config = getConfig()
  const now = Date.now()
  if (now - lastMoveTime.value < config.moveThrottle) return
  lastMoveTime.value = now

  // 1. 计算原始移动距离（px）
  const touch = e.touches[0]
  const rawDx = touch.pageX - startTouchX.value // px
  const rawDy = touch.pageY - startTouchY.value // px

  // 2. px 转 rpx（触摸移动距离转换为适配后的 rpx）
  let dx = rawDx / rpxToPxRatio.value // px → rpx
  let dy = rawDy / rpxToPxRatio.value // px → rpx

  // 3. 根据拖动方向限制位移（rpx）
  switch (config.dragDirection) {
    case 'horizontal':
      dy = 0
      break
    case 'vertical':
      dx = 0
      break
    default:
      // iOS X 轴阻尼（仅影响 rpx 偏移量）
      dx = isIOS.value ? dx / config.iosXAxisDamping : dx
      break
  }

  // 4. 计算新目标位置（rpx）
  let newTargetX = startTranslateX.value + dx
  let newTargetY = startTranslateY.value + dy

  // 5. 应用边界限制（rpx）
  const b = boundary.value
  newTargetX = Math.max(b.minX, Math.min(newTargetX, b.maxX))
  newTargetY = Math.max(b.minY, Math.min(newTargetY, b.maxY))

  // 取整避免抖动（rpx）
  targetX.value = Math.round(newTargetX)
  targetY.value = Math.round(newTargetY)

  // 启动平滑更新
  if (!smoothTimer) updateSmoothPosition()

  // 触发实时位置事件（所有位置参数均为 rpx）
  emit('drag-move', {
    translateX: targetX.value,
    translateY: targetY.value,
    dragDirection: config.dragDirection,
    isDragging: true,
    rawX: touch.pageX, // 原始触摸 X 坐标（px）
    rawY: touch.pageY, // 原始触摸 Y 坐标（px）
    blockSize: config.blockSize, // 组件尺寸（rpx）
    bottomForbiddenHeight: bottomForbiddenHeight.value, // rpx
    topForbiddenHeight: topForbiddenHeight.value // rpx
  })
}

/**
 * 触摸结束事件
 */
const onTouchEnd = () => {
  isDragging.value = false
  if (smoothTimer) clearTimeout(smoothTimer)

  const config = getConfig()
  const b = boundary.value

  // 处理吸附逻辑（rpx）
  if (config.dragDirection !== 'vertical') {
    let blockActualX = config.useRightPosition
        ? screenWidthRpx.value - config.blockSize - config.initialHorizontal + targetX.value
        : config.initialHorizontal + targetX.value
    const blockCenterX = blockActualX + config.blockSize / 2
    const screenCenter = screenWidthRpx.value / 2

    targetX.value = Math.round(
        blockCenterX < screenCenter
            ? config.useRightPosition ? b.minX : -config.initialHorizontal
            : config.useRightPosition ? 0 : b.maxX
    )
  }

  // 修正 Y 轴位置（确保不进入底部禁止区域，rpx）
  if (config.dragDirection !== 'horizontal') {
    targetY.value = Math.round(Math.max(b.minY, Math.min(targetY.value, b.maxY)))
  }

  // 执行归位动画
  updateSmoothPosition()

  // 触发结束事件（所有位置参数均为 rpx）
  emit('drag-end', {
    translateX: targetX.value,
    translateY: targetY.value,
    dragDirection: config.dragDirection,
    blockSize: config.blockSize, // rpx
    bottomForbiddenHeight: bottomForbiddenHeight.value, // rpx
    topForbiddenHeight: topForbiddenHeight.value, // rpx
    finalPosition: true
  })

  // 保存位置到 Pinia（rpx 单位直接保存）
  setTimeout(() => {
    suspensionStore.updateSuspension({
      config: {...config}, // 保存 rpx 单位配置
      position: {translateX: targetX.value, translateY: targetY.value} // 保存 rpx 单位位置
    })
  }, 200)
}

/**
 * 平滑更新位置（rpx 单位计算）
 */
const updateSmoothPosition = () => {
  const config = getConfig()

  const deltaX = targetX.value - translateX.value // rpx
  const deltaY = targetY.value - translateY.value // rpx

  // 差值过小时直接定位（避免无限循环）
  if (Math.abs(deltaX) < 0.3 && Math.abs(deltaY) < 0.3) {
    translateX.value = targetX.value
    translateY.value = targetY.value
    clearTimeout(smoothTimer)
    smoothTimer = null
    return
  }

  // 平滑过渡（rpx）
  translateX.value += deltaX * config.positionSmoothing
  translateY.value += deltaY * config.positionSmoothing
  smoothTimer = setTimeout(updateSmoothPosition, config.moveThrottle)
}

/**
 * 辅助函数
 */
const resetState = () => {
  isInitCompleted.value = false
  isReady.value = false
  clearTimers()
}

const clearTimers = () => {
  if (smoothTimer) {
    clearTimeout(smoothTimer)
    smoothTimer = null
  }
  if (showDelayTimer) {
    clearTimeout(showDelayTimer)
    showDelayTimer = null
  }
}

const isValidPosition = (pos) => {
  return pos && typeof pos.translateX === 'number' && typeof pos.translateY === 'number'
}

onHide(() => {
  isReady.value = false
  clearTimers()
})

onUnmounted(() => {
  clearTimers()
})
</script>

<style scoped lang="scss">
.global-black-block {
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 99999 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;

  &-image {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .drag-direction-tag {
    font-size: 24rpx; // 字体大小也用 rpx 适配
    padding: 4rpx 12rpx;
    border-radius: 20rpx;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
  }
}
</style>

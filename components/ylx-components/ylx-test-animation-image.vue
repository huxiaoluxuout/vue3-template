<template>

  <!--  <view style="position:relative;">-->
  <view class="animation-wrapper" :class="wrapperClass">

    <view id="box" class="box" :style="{ transform:`rotate(${degDiff}deg)`, width: `${width}`, height: `${width}`}"
          @touchmove.prevent="touchMove" @touchstart="touchStart" @touchend="touchEnd">
      <image class="image-item" :class="openCloseClass"
             v-for="(itemUrl,index) in imageGroups" :key="index" :src="itemUrl"
             :style="{
             left:`${positionOffset}`,top:`${positionOffset}`, width: `${itemImageWidth}`, height: `${itemImageWidth}`,
             transform:transformImageItem(index),
             '--open-start':openStart(index),
             '--open-end':openEnd(index),
             '--close-start':closeStart(index),
             '--close-end':closeEnd(index),
        }"
             @click.stop="itemClick(index)"
      >
      </image>
    </view>
    <view class="center-wrapper">
      <image id="center"
             class="center"
             :class="imageCenterTransformClass"
             :style="{
               width: `${centerWidth}`,
               height: `${centerWidth}`
           }" @click="setToggleAnimation" :src="centerImageSrc">
      </image>
    </view>

    <view class="mask" :style="{width:`calc(2 * ${offsetMin} + calc(${itemImageWidth} / 2))`,height:`calc(2 * ${offsetMin} + calc(${itemImageWidth} / 2))`}"
          @click="setToggleAnimation"></view>
  </view>


  <!--  </view>-->
</template>

<script>


let lastValue = 0
let trend = true

export default {
  props: {
    width: {
      type: String,
      default: '500rpx'
    },
    imageGroups: {
      type: Array,
      default: () => ([
        "/static/love/1.png",
        "/static/love/2.png",
        "/static/love/3.png",
        "/static/love/4.png",
        "/static/love/5.png",
        "/static/love/6.png",
        "/static/love/7.png",
        "/static/love/8.png",
        "/static/love/9.png",
        "/static/love/10.png",
        "/static/love/11.png",
        "/static/love/12.png",
      ])
      // https://env-00jxgajxo70c.normal.cloudstatic.cn/imgs/love/1.png
    },
    itemImageWidth: {
      type: String,
      default: '90rpx'
    },

    centerWidth: {
      type: String,
      default: '80rpx'
    },
    centerImageSrc: {
      type: String,
      default: '/static/love/1.png'
    },

    // 控制灵敏度
    rotateStep: {
      type: Number,
      default: 6
    },

    offsetMin: {
      type: String,
      default: '60rpx'
    },

    isOpen: Boolean
  },
  data() {
    return {
      degSteps: 0,
      useRotateBack: !this.isOpen,
      centerPointX: 0,
      centerPointY: 0,
      radius: '100rpx',//半径

      startTime: 0,

      inertiaTimer: 0,
      startY: 0,
      rotateLock: false,

    };
  },
  computed: {
    num() {
      return this.imageGroups.length
    },
    degItem() {
      return 360 / this.num
    },

    degDiff() {
      return this.degSteps * (this.degItem / 100)
    },
    offsetMax() {
      return `calc(${this.radius} + calc(${this.itemImageWidth} / 20))`
    },

    positionOffset() {
      return `calc(${this.radius} - calc(${this.itemImageWidth} / 2))`
    },

    imageCenterTransformClass() {
      return `${this.useRotateBack ? 'center-rotate-center-back' : 'center-rotate-center'}`
    },

    openCloseClass() {
      return `${this.useRotateBack ? 'image-item-open' : 'image-item-close'}`
    },
    wrapperClass() {
      return `${this.useRotateBack ? 'rotate' : 'rotate-back'}`
    },


  },
  mounted() {
    const query = uni.createSelectorQuery().in(this);
    query
        .select("#box")
        .boundingClientRect((data) => {
          this.radius = Math.floor((data.width / 2)) + 'px'
          this.centerPointX = Math.floor(data.left + (data.width / 2))
          this.centerPointY = Math.floor(data.top + (data.height / 2))
        })
        .exec();
  },

  methods: {

    openStart(index) {
      return `rotate(${(index * this.degItem)}deg) translate(0) rotate(${(-1 * index * this.degItem) - this.degDiff}deg) scale(.4)`
    },
    openEnd(index) {
      return `rotate(${(index * this.degItem)}deg) translate(${this.offsetMax}) rotate(${(-1 * index * this.degItem) - this.degDiff}deg) scale(1)`
    },

    closeStart(index) {
      return `rotate(${(index * this.degItem)}deg) translate(${this.offsetMax}) rotate(${(-1 * index * this.degItem) - this.degDiff}deg) scale(.4)`
    },
    closeEnd(index) {
      return `rotate(${(index * this.degItem)}deg) translate(${this.offsetMin}) rotate(${(-1 * index * this.degItem) - this.degDiff}deg) scale(.4)`
    },

    transformImageItem(index) {
      return this.useRotateBack ? this.closeEnd(index) : this.openEnd(index)
    },


    itemClick(index) {
      this.$emit('itemClick', index)
    },
    setToggleAnimation() {
      while (this.degSteps < 0) {
        this.degSteps += 1
      }
      while (this.degSteps > 0) {
        this.degSteps -= 1
      }
      this.$emit('centerClick', this.useRotateBack)
      this.useRotateBack = !this.useRotateBack
    },

    touchStart(event) {
      // 组件销毁时清除定时器
      if (this.inertiaTimer) {
        clearTimeout(this.inertiaTimer);
      }

      lastValue = 0
      trend = false
      this.startY = event.changedTouches[0].pageY
      this.startTime = Date.now()
      this.rotateLock = false

    },
    touchEnd(event) {

      let pageY = event.changedTouches[0].pageY;

      this.endTime = Date.now()

      let timeElapsed = this.endTime - this.startTime

      const deltaY = pageY - this.startY;

      this.velocity =( deltaY / timeElapsed) * 1.2;
      this.rotateLock = true

      this.applyInertia();


    },
    applyInertia() {
      const deceleration = 0.97; // 减速因子
      const minVelocity = 0.02; // 最小速度阈值
      const animationInterval = 15; // 大约60fps

      const step = () => {
        if (Math.abs(this.velocity) > minVelocity) {
          this.velocity *= deceleration;
          this.inertiaTimer = setTimeout(() => {
            this.setDegSteps(trend, this.velocity)
            step();
          }, animationInterval);
        }
      };

      step();
    },
    touchMove(event) {

      if (this.rotateLock) return;
      if (this.useRotateBack) return;
      const currentX = event.changedTouches[0].pageX;
      const currentY = event.changedTouches[0].pageY;
      const distanceX = Math.floor(currentX - this.centerPointX);
      const distanceY = Math.floor(currentY - this.centerPointY);

      if (Math.abs(distanceY) < 30) return
      if (Math.abs(distanceX) < 30) return
      if (distanceX === 0) return
      if (distanceY === 0) return

      let currentValue = (distanceX / distanceY)

      let currentChange = currentValue - lastValue > 0

      this.setDegSteps(currentChange)

      lastValue = currentValue
      trend = currentChange


    },

    /*touchMove(event) {
      if (this.useRotateBack) return;
      const currentX = event.changedTouches[0].pageX;
      const currentY = event.changedTouches[0].pageY;
      const distanceX = Math.floor(currentX - this.centerPointX);
      const distanceY = Math.floor(currentY - this.centerPointY);
      if (distanceX === 0) return
      if (distanceY === 0) return

      let currentValue = (distanceX / distanceY)
      let currentChange = currentValue - lastValue > 0

      this.setDegSteps(currentChange)


      lastValue = currentValue
    },*/

    setDegSteps(currentChange, deceleration = 1) {
      if (!currentChange) {
        // 逆时针转动
        this.degSteps += this.rotateStep * deceleration
      } else {
        // 顺时针转动
        this.degSteps -= this.rotateStep * deceleration
      }
    },

  }
};
</script>

<style scoped>
.animation-wrapper {
  position: relative;
  touch-action: none;

}

.box {
  box-sizing: border-box;
  position: relative;
  transition: transform 100ms;
  border-radius: 50%;
  touch-action: none;


}

.rotate {
  animation: rotate 1.5s 1 forwards;
}

.rotate-back {
  animation: rotate-back 1.5s 1 forwards;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg)

  }
  100% {
    transform: rotate(360deg)
  }
}

@keyframes rotate-back {
  0% {
    transform: rotate(360deg)
  }
  100% {
    transform: rotate(0deg)
  }
}


.image-item {
  position: absolute;
  touch-action: none;

}


.image-item-open {
  animation: close 600ms 1 forwards;

}

.image-item-close {
  animation: open 600ms 1 forwards;

}

@keyframes open {
  0% {
    opacity: .6;
    transform: var(--open-start);

  }
  100% {
    opacity: 1;
    transform: var(--open-end);
  }
}


@keyframes close {
  0% {
    opacity: 1;
    transform: var(--close-start)
  }

  100% {
    opacity: .6;
    transform: var(--close-end);
  }
}


.center-wrapper {
  width: 100rpx;
  height: 100rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

}

.center {

}

.center-rotate-center {
  animation: center-rotate-center 300ms 1 forwards;
}

.center-rotate-center-back {
  animation: center-rotate-center-back 300ms 1 forwards;
}

@keyframes center-rotate-center {
  0% {
    transform: rotate(-90deg) scale(0);
  }
  100% {
    transform: rotate(720deg) scale(1);
  }
}

@keyframes center-rotate-center-back {
  0% {
    transform: rotate(720deg) scale(1);
  }
  100% {
    transform: rotate(0deg) scale(0.6);
  }
}

.mask {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
</style>

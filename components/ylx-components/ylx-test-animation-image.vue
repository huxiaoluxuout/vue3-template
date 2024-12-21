<template>

  <view id="box" class="box" :style="{ transform:`rotate(${degDiff}deg)`, width: `${width}`, height: `${width}`}"
        @touchmove.stop="touchmove" @touchstart="touchStart" @touchend="touchEnd">
    <image class="image-item" :class="imageItemTransform"
           v-for="(itemUrl,index) in imageGroups" :key="index" :src="itemUrl"
           :style="{
             left:`${positionOffset}`,top:`${positionOffset}`, width: `${itemImageWidth}`, height: `${itemImageWidth}`,
             transform:`rotate(${index * degItem}deg) translate(${offset}) rotate(${(-1 * index * degItem) - degDiff}deg)`,
             '--end-transform':`rotate(${index * degItem}deg) translate(${offset}) rotate(${(-1 * index * degItem) - degDiff}deg)`,
        }"
           @click.stop="itemClick(index)"
    >
    </image>

    <image id="center"
           :style="{
             transform:`translate(-50%,-50%) rotate(${-1 * degDiff}deg)`,
               width: `${centerWidth}`,
               height: `${centerWidth}`
           }" @click="setToggleAnimation" class="center" :src="centerImageSrc">
    </image>

  </view>

</template>

<script>


let lastValue = 0

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
    },
    itemImageWidth: {
      type: String,
      default: '90rpx'
    },

    centerWidth: {
      type: String,
      default: '60rpx'
    },
    centerImageSrc: {
      type: String,
      default: '/static/love/1.png'
    },

    // 控制灵敏度
    rotateStep: {
      type: Number,
      default: 5
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
    offset() {
      return `calc(${this.radius} + calc(${this.itemImageWidth} / 20))`
    },
    positionOffset() {
      return `calc(${this.radius} - calc(${this.itemImageWidth} / 2))`
    },
    imageItemTransform() {
      return `${this.useRotateBack ? 'image-item-rotateback' : 'image-item-rotate'}`
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
      lastValue = 0
    },
    touchEnd(event) {
      lastValue = 0
    },

    touchmove(event) {
      if (this.useRotateBack) return;
      const currentX = event.changedTouches[0].pageX;
      const currentY = event.changedTouches[0].pageY;
      const distanceX = Math.floor(currentX - this.centerPointX);
      const distanceY = Math.floor(currentY - this.centerPointY);
      if (distanceX === 0) return
      if (distanceY === 0) return

      let currentValue = (distanceX / distanceY)
      let currentChange = currentValue - lastValue > 0

     /* if (distanceX > 0 && distanceY > 0) {
        this.setDegSteps(currentChange)
      } else if (distanceX < 0 && distanceY < 0) {
        this.setDegSteps(currentChange)

      } else if (distanceX < 0 && distanceY > 0) {
        this.setDegSteps(currentChange)

      } else if (distanceX > 0 && distanceY < 0) {
        this.setDegSteps(currentChange)
      }*/
      this.setDegSteps(currentChange)


      lastValue = currentValue
    },

    setDegSteps(currentChange) {
      if (!currentChange) {
        // 逆时针转动
        this.degSteps += this.rotateStep
      } else {
        // 顺时针转动
        this.degSteps -= this.rotateStep
      }
    },

  }
};
</script>

<style scoped>
.box {
  box-sizing: border-box;
  position: relative;
  transition: transform 100ms;
  border-radius: 50%;

}

.image-item {
  position: absolute;
}

.image-item-rotate {
  animation: rotate 600ms 1 forwards;

}

.image-item-rotateback {
  animation: rotateback 600ms 1 forwards;

}

@keyframes rotate {
  0% {
    transform: rotate(-270deg) translate(0) rotate(-270deg) scale(1);
  }
  100% {
    transform: var(--end-transform);
  }
}

@keyframes rotateback {
  0% {
    transform: var(--end-transform);
  }
  100% {
    transform: rotate(-270deg) translate(0) rotate(-270deg) scale(0);
  }
}


.center {
  position: absolute;
  top: 50%;
  left: 50%;

}

@keyframes rotate-center {
  0% {
    transform: var(--rotate-center-transform);
  }
  100% {
    transform: translate(-50%, -50%) rotate(0);
  }
}

</style>

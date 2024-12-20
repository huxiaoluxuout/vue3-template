<template>

  <view class="box" :style="{transform:`rotate(${degDiff}deg)`}" @touchmove="touchmove" @touchstart="touchStart" @touchend="touchEnd">

    <image class="image-item" :class="`${useRotateBack?'image-item-rotateback':'image-item-rotate'}`" v-for="(item,index) in imageGroups" :key="index"
           :src="item"
           :style="{
             transform:`rotate(${index * degItem}deg) translate(${offset}) rotate(${(-1 * index * degItem) - degDiff}deg)`,
             '--end-transform':`rotate(${index * degItem}deg) translate(${offset}) rotate(${(-1 * index * degItem) - degDiff}deg)`,
        }"
    >
    </image>

    <image :style="{transform:`translate(-50%,-50%) rotate(${-1 * degDiff}deg)`}" @click="setToggleAnimation" class="center" src="/static/love/1.png"></image>

  </view>

  <!--  <view class="" style="position: fixed;top: 50%;left: 0;right: 0;display: flex">
      <button @click="jia">++</button>
      <button @click="jian">&#45;&#45;</button>
      <button @click="rest">0</button>
      <button @click="setToggleAnimation">animation</button>
    </view>-->


</template>

<script>
import YlxImage from "@/components/ylx-components/ylx-image.vue";

export default {
  components: {YlxImage},
  data() {
    return {
      imageGroups: [
        // "/static/love/1.png",
        "/static/love/2.png",
        "/static/love/3.png",
        "/static/love/4.png",
        "/static/love/5.png",
        "/static/love/6.png",
        "/static/love/7.png",
        "/static/love/8.png",
        "/static/love/9.png",

        // "/static/love/10.png",
        // "/static/love/11.png",
        /*       "/static/love/12.png",
               "/static/love/13.png",
               "/static/love/14.png",
               "/static/love/15.png",
               "/static/love/16.png",
               "/static/love/17.png",
               "/static/love/18.png",*/
      ],

      degSteps: 0,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      lastSpeedX: 0,  // 新增：记录上一次的 X 方向速度
      lastSpeedY: 0,  // 新增：记录上一次的 Y 方向速度
      startTime: 0,
      // 阻尼
      damping: 0.3,
      useRotateBack: false,

      offset: '130%'
      // offset: '100rpx'
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

  },
  mounted() {

  },

  methods: {

    setToggleAnimation() {
      this.useRotateBack = !this.useRotateBack
      this.degSteps = 0

    },

    touchStart(event) {
      this.startX = event.changedTouches[0].pageX;
      this.startY = event.changedTouches[0].pageY;
      this.startTime = new Date().getTime();
    },
    touchmove(event) {
      const currentX = event.changedTouches[0].pageX;
      const currentY = event.changedTouches[0].pageY;

      const distanceX = currentX - this.startX;
      const distanceY = currentY - this.startY;

      const duration = new Date().getTime() - this.startTime;

      const speedX = distanceX / duration;
      const speedY = distanceY / duration;

      let sin = speedY / speedX

      if (sin > 0) {
        if (Math.abs(sin) > this.damping) {
          console.log('向右下===》')
          this.degSteps += 2
        }
      } else {
        if (Math.abs(sin) > this.damping) {
          console.log('《===向左上')
          this.degSteps -= 2

        }
      }
    },
    touchEnd(event) {

    },

    jia() {
      this.degSteps += 20
    },
    jian() {
      this.degSteps -= 20

    },
    rest() {
      this.degSteps = 0

    },

  }
};
</script>

<style scoped>

.box {
  box-sizing: border-box;
  width: 200rpx;
  height: 200rpx;
  position: relative;
  transition: transform 100ms;
  border-radius: 50%;
  border: 1px solid #000;

}

.image-item {
  width: 80rpx;
  height: 80rpx;
  position: absolute;
  left: 25%;
  top: 25%;
  //transform-origin: 200rpx 200rpx;
}

.image-item-rotate {
  animation: rotate 1s 1 forwards;

}

.image-item-rotateback {
  animation: rotateback 1s 1 forwards;

}

@keyframes rotate {
  0% {
    transform: rotate(-135deg) translate(0) rotate(-135deg) scale(1);
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
    transform: rotate(-135deg) translate(0) rotate(-135deg) scale(0);
  }
}


.center {
  position: absolute;
  width: 60rpx;
  height: 60rpx;
  top: 50%;
  left: 50%;
//animation: rotate-center 6s 1 forwards;

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

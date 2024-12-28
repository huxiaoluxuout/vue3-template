<template>
    <view class="animation-image"></view>
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

      imageIndex: 0,
      num: 8,
      degSteps: 0,
      /*----------------------------*/
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      lastSpeedX: 0,  // 新增：记录上一次的 X 方向速度
      lastSpeedY: 0,  // 新增：记录上一次的 Y 方向速度
      startTime: 0,
      // 阻尼
      damping: 0.3,
      scale: false,


      useRotateBack: false
    };
  },
  computed: {

    degItem() {
      return (360 / this.num) + this.initDeg
    },

    degDiff() {
      return this.degSteps * (this.degItem / 100)
    },

    initDeg() {
      return this.scale ? 120 : 0
    },

  },
  mounted() {

  },

  methods: {

    scaleFnanimation() {
      this.useRotateBack =!this.useRotateBack
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


.animation-image {
  --frame-width: 70px; /* 单帧宽度 */
  --frame-count: 17; /* 总帧数 */
  --frame-gap: 2px; /* 帧间距，只用于动画计算，不影响背景尺寸 */
  width: var(--frame-width);
  height: 70px;
  animation: play 1.5s steps(var(--frame-count)) infinite;
  background-image: url('https://s21.ax1x.com/2024/12/19/pAOm9KS.png');
//background-image: url('https://s21.ax1x.com/2024/12/19/pAOVdbj.png'); background-size: calc(var(--frame-width) * var(--frame-count)) 70px; /*  关键修改：移除帧间距 */ background-repeat: no-repeat;
}

@keyframes play {
  from {
    background-position: 0 center;
  }
  to {
    background-position: calc(-1 * var(--frame-width) * (var(--frame-count) - 1)) center; /*  精确移动到最后一帧的起始位置 */
  }
}


</style>

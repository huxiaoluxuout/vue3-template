<template>


  <view class="container">
    <movable-area class="movable-area" :style="{ width: areaSize + 'px', height: areaSize + 'px' }">
      <movable-view
          class="circle"
          :style="movableStyle"
          :direction="direction"
          :x="x"
          :y="y"
          @change="onChange"
      >
      </movable-view>
      <movable-view
          class="circle2"

          :direction="direction"
          :x="x2"
          :y="y2"
          @change="onChange"
      >
      </movable-view>
    </movable-area>
  </view>


</template>

<script>


export default {
  props: {},
  data() {
    return {
      areaSize: 300, // 可移动区域的大小
      x: 0, // x轴位置
      y: 0, // y轴位置
      radius: 150, // 移动半径
      angle: 0, // 初始角度
      direction: 'all', // 移动方向

      x2: 50, // x轴位置
      y2: 0, // y轴位置

    };
  },
  computed: {
    movableStyle() {
      // 确保圆心位置在可移动区域的中心
      const centerOffset = this.areaSize / 2 - 25; // 50px 为 circle 的直径，25px 为半径
      return {
        transform: `translate(${this.x + centerOffset}px, ${this.y + centerOffset}px)`,
      };

    },
  },


  methods: {
    onChange(event) {
      // 获取当前的角度
      const deltaX = event.detail.x; // 计算 x 轴的位移
      const deltaY = event.detail.y; // 计算 y 轴的位移
      console.log(deltaX,deltaY)

      this.angle += 2; // 每次滑动改变角度

      // 根据角度计算新的 x 和 y
      this.x = this.radius * Math.cos(this.angle * (Math.PI / 180));
      this.y = this.radius * Math.sin(this.angle * (Math.PI / 180));
    },
  }
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rosybrown;

}

.movable-area {
  position: relative;
  background: #ccc;
  border-radius: 50%; /* 圆形边框 */
  border: 1px solid #000;
}


.circle {
  width: 50px;
  height: 50px;
  background-color: red;
  //border-radius: 50%; /* 圆形 */
}
.circle2 {
  width: 50px;
  height: 50px;
  background-color: blue;
  //border-radius: 50%; /* 圆形 */
}
</style>


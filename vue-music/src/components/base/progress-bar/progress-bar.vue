<template>
  <div class="progress-wrapper-bar" ref="progress-wrapper-bar" @click.stop.prevent="progressClick">
    <div class="progress" ref="progress"></div>
    <div
      class="progress-wrapper-dot"
      ref="progress-wrapper-dot"
      @touchstart.prevent.stop="progressTouchStart"
      @touchmove.prevent="progressTouchMove"
      @touchend="progressTouchEnd"
    ></div>
  </div>
</template>

<script>
import { prefixStyle } from "common/js/dom";
let transform = prefixStyle("transform");

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  methods: {
    progressClick(e) {
      this._change(e.offsetX);
      this.$emit(
        "changeProgress",
        e.offsetX / this.$refs["progress-wrapper-bar"].clientWidth
      );
    },
    progressTouchStart(e) {
      // 记录初始位置
      this.touch.isOpera = true;
      this.touch.start = e.touches[0].clientX;
      this.touch.left = parseFloat(this.$refs["progress"].style.width);
    },
    progressTouchMove(e) {
      if (!this.touch.isOpera) {
        return;
      }
      // 计算差值, 设置进度位置
      let distance = e.touches[0].clientX - this.touch.start;
      let progressWidth = Math.min(
        Math.max(0, this.touch.left + distance),
        this.$refs["progress-wrapper-bar"].clientWidth
      );
      this._change(progressWidth);
    },
    progressTouchEnd() {
      // 结束touch事件, 置空&派发事件
      this.touch.isOpera = false;
      let percent =
        parseFloat(this.$refs["progress"].style.width) /
        parseFloat(this.$refs["progress-wrapper-bar"].clientWidth);
      this.$emit("changeProgress", percent);
    },
    _change(width) {
      this.$refs["progress"].style.width = `${width}px`;
      this.$refs["progress-wrapper-dot"].style[
        transform
      ] = `translate3d(${width}px, -50%, 0)`;
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent && !this.touch.isOpera) {
        //   进度条比例监听
        let barWidth = this.$refs["progress-wrapper-bar"].clientWidth;
        let progressWidth = newPercent * barWidth;
        this._change(progressWidth);
      }
    }
  },
  created() {
    this.touch = {}; //  记录touch事件的数据
  }
};
</script>

<style lang="stylus" scoped>
.progress-wrapper-bar {
  flex: 1;
  position: relative;
  height: 4px;
  background: rgba(0, 0, 0, 0.3);

  .progress {
    position: absolute;
    width: 0px;
    height: 100%;
    left: 0;
    background: #ffcd32;
  }

  .progress-wrapper-dot {
    position: absolute;
    top: 50%;
    left: 0px;
    width: 16px;
    height: 16px;
    background: #ffcd32;
    border: 3px solid #fff;
    border-radius: 50%;
    box-sizing: border-box;
    transform: translate3d(-50%, -50%, 0);
  }
}</style>

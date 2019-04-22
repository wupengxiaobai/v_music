<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <div
        class="dot"
        :class="{'active': currentPageIndex == dotIndex}"
        v-for="(dot,dotIndex) in dots"
        :key="dotIndex"
      ></div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { addClass } from "common/js/dom";
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  methods: {
    //   设置轮播宽度
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
      let sliderWitdh = this.$refs.slider.clientWidth;
      for (let i = 0, len = this.children.length; i < len; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");
        child.style.width = sliderWitdh + "px";
        width += sliderWitdh;
      }
      if (this.loop && !isResize) {
        //   无缝循环， 翻倍相加宽度
        width += 2 * sliderWitdh;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    // 初始化dots
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    // 初始化slider
    _initSlider() {
      //   let self = this;
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop
        },
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      });

      // 侦听滚动结束触发
      this.slider.on("scrollEnd", () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        this.currentPageIndex = pageIndex;
        if (this.loop) {
          clearTimeout(this.timer);
          this._play();
        }
      });
    },
    // 自动轮播
    _play() {
      let pageIndex = this.currentPageIndex + 1;
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400);
      }, this.interval);
    },
    _goTo(tagrtPage) {
      this.slider.goToPage(tagrtPage, 0, 400);
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if (this.autoPlay) {
        this._play();
      }
      //   监听窗口改变
      window.addEventListener("resize", () => {
        if (!this.slider) {
          return;
        }
        //  重新计算slider宽度
        this._setSliderWidth(true);
        //  重新绘制slider
        this.slider.refresh();
      });
    }, 20);
  },
  distory() {
    clearTimeout(this.timer);
  }
};
</script>


<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.slider {
  overflow: hidden;
  min-height: 1px;
  position: relative;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        witdh: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      transition: width 0.3s;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>

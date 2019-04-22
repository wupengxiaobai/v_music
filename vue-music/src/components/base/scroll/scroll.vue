<template>
  <div class="wrapper" ref="scroll-component-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    //   滚动监听评率
    probeType: {
      type: Number,
      default: 1
    },
    // 事件派发
    click: {
      type: Boolean,
      default: true
    },
    // 数据
    data: {
      type: Array,
      default: null
    },
    // 是否监听滚动
    listenScroll: {
      type: Boolean,
      default: false
    },
    //  是否开启上拉加载
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    // 默认refresh延迟时间
    delayTime: {
      type: Number,
      defalut: 20
    }
  },
  methods: {
    //   初始化bscroll
    _initScroll() {
      if (!this.$refs["scroll-component-wrapper"]) {
        return;
      }
      this.scroll = new BScroll(this.$refs["scroll-component-wrapper"], {
        probeType: this.probeType,
        click: this.click
      });
      // 如果需要监听scroll事件, 派发scroll事件
      if (this.listenScroll) {
        this.scroll.on("scroll", pos => {
          this.$emit("scroll", pos);
        });
      }
      //  上拉加载
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit("scrollToEnd");
          }
        });
      }
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    // bs重绘:高度计算
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    // 滚动到某节点位置
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.delayTime);
    }
  }
};
</script>

<style lang="stylus" scoped></style>

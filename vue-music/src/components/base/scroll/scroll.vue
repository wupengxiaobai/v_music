<template>
  <div class="wrapper" ref="wrapper">
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
    }
  },
  methods: {
    //   初始化bscroll
    _initScroll() {
      //   console.log(this.$refs.wrapper);
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      });
      // 如果需要监听scroll事件, 派发scroll事件
      if (this.listenScroll) {
        let self = this;
        this.scroll.on("scroll", pos => {
          self.$emit("scroll", pos);
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
      }, 20);
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>

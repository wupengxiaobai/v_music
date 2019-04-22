<template>
  <transition name="toptipAni">
    <div class="toptip-component" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    delayTime: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.showFlag = false;
      }, this.delayTime);
    },
    hide() {
      this.showFlag = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/icon.styl'
.toptip-component {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999999;
  background: #666;

  &.toptipAni-enter-active, &.toptipAni-leave-active {
    transition: all 0.3s;
  }

  &.toptipAni-enter, &.toptipAni-leave-to {
    transform: translate3d(0, -100%, 0);
  }
}
</style>

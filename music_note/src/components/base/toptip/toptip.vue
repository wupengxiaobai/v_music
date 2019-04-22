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
      default: 2000
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
.toptip-component {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  background: #666;

  &.toptipAni-enter-active, &.toptipAni-leave-active {
    transition: all 0.3s;
  }

  &.toptipAni-enter, &.toptipAni-leave-to {
    transform: translate3d(0, -100%, 0);
  }
}
</style>

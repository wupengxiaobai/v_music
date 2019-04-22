<template>
  <div class="loading" v-show="showFlag">
    <img width="24" src="./loading.gif">
    <p class="desc">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "正在载入..."
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
    },
    hide() {
      this.showFlag = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.loading {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .desc {
    line-height: 20px;
    font-size: 12px;
    color: $color-text-l;
  }
}
</style>

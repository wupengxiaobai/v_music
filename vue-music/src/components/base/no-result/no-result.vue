<template>
  <div class="no-result">
    <div class="img"></div>
    <div class="text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "抱歉, 暂无搜索结果"
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';
@import '~common/stylus/variable.styl';

.no-result {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .img {
    width: 100px;
    height: 100px;
    background-size: 100%;
    bg-image('no-result');
  }

  .text {
    margin-top: 15px;
    color: $color-text-d;
  }
}
</style>

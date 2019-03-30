<template>
  <div class="tab">
    <router-link tag="div" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" to="/singer">
      <span>歌手</span>
    </router-link>
    <router-link tag="div" to="/ranking">
      <span>排行</span>
    </router-link>
    <router-link tag="div" to="/search">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    tabData: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';
@import '../../common/stylus/variable.styl';

.tab {
  position: relative;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;

  &>div {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    span {
      margin-top: 8px;
      padding-bottom: 6px;
      color: $color-text-l;
      border-bottom: 2px solid transparent;
    }

    &.active {
      span {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>

<template>
  <div class="player" v-show="playlist.length>0">
    <!-- 默认播放器 -->
    <div class="normal-player" v-show="fullScreen">默认播放器</div>
    <!-- mini播放器： 收起固定在底部 -->
    <div class="mini-player" v-show="!fullScreen">mini播放器</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["fullScreen", "playlist"])
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';
@import '~common/stylus/variable.styl';

.player {
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background: $color-background;
}
</style>

<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view class="content"></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from "components/common/m-header/MHeader.vue";
import Tab from "components/tab/Tab";
import Player from "components/player/player.vue";
export default {
  name: "app",
  components: {
    MHeader,
    Tab,
    Player
  }
};
</script>
<style lang="stylus">
@import 'common/stylus/index.styl';

#app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    overflow: hidden;
  }
}
</style>

<template>
  <div class="header">
    <div class="main">
      <div class="logo"></div>
      <h2>Chicken Music</h2>
    </div>
    <router-link tag="div" to="/user" class="user">
      <span class="icon-mine"></span>
    </router-link>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../../common/stylus/mixin.styl';
@import '../../../common/stylus/variable.styl';

.header {
  position: relative;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;

  .main {
    display: flex;
    align-items: center;

    .logo {
      width: 30px;
      height: 32px;
      background-size: 30px 32px;
      margin-right: 9px;
      bg-image('logo');
    }

    h2 {
      font-size: 18px;
      color: $color-theme;
    }
  }

  .user {
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    line-height: 44px;
    width: 44px;
    height: 44px;
    font-size: 22px;
    color: $color-theme;
  }
}
</style>

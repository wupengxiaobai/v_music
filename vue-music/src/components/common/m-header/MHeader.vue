<template>
  <div class="header">
    <div class="main">
      <div class="logo"></div>
      <h2>Chicken Music</h2>
    </div>
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
}
</style>

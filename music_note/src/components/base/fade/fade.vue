<template>
  <div class="fade">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>


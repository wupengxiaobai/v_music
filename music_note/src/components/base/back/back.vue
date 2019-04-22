<template>
  <div class="back-component" @click="back">
    <span class="icon-back"></span>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back();
      //   this.$emit("back");
    }
  }
};
</script>


<style lang="stylus" scoped>
@import '~common/stylus/icon.styl';

.back-component {
  position: absolute;
  top: 0;
  left: 10px;
  // width: 44px;
  // height: 44px;
  // text-align: center;
  // line-height: 44px;
  padding: 10px;

  span {
    font-size: 22px;
  }
}
</style>


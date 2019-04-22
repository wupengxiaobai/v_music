<template>
  <div class="random-play-component">
    <div ref="play" class="play" :style="colorStyle" @click.stop="randomPlay">
      <i class="icon-play"></i>
      <span class="text">随机播放全部</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mainColor: {
      type: String,
      default: "#ffcd32"
    }
  },
  methods: {
    randomPlay() {
      this.$emit("randomPlay");
    }
  },
  computed: {
    colorStyle() {
      return `border-color:${this.mainColor};color:${this.mainColor}`;
    }
  }
};
</script>

<style lang="stylus" scoped>
.play {
  display: inline-block;
  box-sizing: border-box;
  width: 135px;
  padding: 7px 0;
  margin: 0 auto;
  text-align: center;
  border: 1px solid #ffcd32;
  color: #ffcd32;
  border-radius: 100px;
  font-size: 0;

  i {
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    font-size: 16px;
  }

  span {
    isplay: inline-block;
    vertical-align: middle;
    font-size: 12px;
  }
}
</style>

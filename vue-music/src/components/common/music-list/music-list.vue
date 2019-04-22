<template>
  <!--  :style="wrapperStyle" -->
  <div class="music-list">
    <div class="back" @click="goback">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bg-img">
      <div class="play-wrapper">
        <div ref="play" class="play" v-show="songs.length>0" @click="randomItem">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <!-- 背景层 -->
    <div class="lay-bg" ref="laybg"></div>
    <!-- 滚动容器 :style="wrapperStyle"-->
    <scroll
      :probeType="3"
      :listenScroll="true"
      :data="songs"
      @scroll="scroll"
      class="list"
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :rank="rank" @select="selectItem" :songs="songs"></song-list>
      </div>
      <loading v-if="!songs.lenth"></loading>
    </scroll>
  </div>
</template>

<script>
import { playlistMiXin } from "common/js/mixin.js";
import Scroll from "components/base/scroll/scroll.vue";
import Loading from "components/base/loading/loading.vue";
import SongList from "components/common/song-list/song-list.vue";
import { prefixStyle } from "common/js/dom";
import { mapActions, mapGetters } from "vuex";
const BOUNDARY__HEIGHT = 40; //  设定距离的高度
const BOTTOM_HEIGHT = 60;
const transform = prefixStyle("transform");
const backdrop = prefixStyle("backdrop-filter");

export default {
  mixins: [playlistMiXin],
  props: {
    rank: {
      type: Boolean,
      default: false
    },
    bgImage: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default() {
        return [];
      }
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      scrollY: 0
    };
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.list.$el.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    randomItem() {
      this.randomPlay({ list: this.songs });
    },
    //   歌曲选择
    selectItem(item, index) {
      // 设置当前列表为播放列表
      // 设置当前列表为顺序播放列表
      // 设置播放器默认展开
      // 设置播放状态为true
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    // scroll 滚动监听
    scroll(pos) {
      this.scrollY = pos.y;
    },
    // 上一层
    goback() {
      this.$router.back();
    },
    ...mapActions(["selectPlay", "randomPlay"])
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    },
    /* wrapperStyle() {
      if (!this.fullScreen) {
        return `bottom:${BOTTOM_HEIGHT}px`;
      }
    }, */
    ...mapGetters(["fullScreen"])
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranslateY, newY);
      this.$refs.laybg.style[transform] = `translate3d(0,${translateY}px,0)`;

      // 向上滚动，图片位置表现设置
      let zIndex = 0;
      let scale = 1;
      let percent = Math.abs(newY / this.imageHeight);
      let blur = 0;
      if (newY < translateY) {
        zIndex = 10;
        this.$refs["bg-img"].style.paddingTop = 0;
        this.$refs["bg-img"].style.height = `${BOUNDARY__HEIGHT}px`;
        this.$refs["play"].style.display = "none";
      } else {
        this.$refs["bg-img"].style.paddingTop = "70%";
        this.$refs["bg-img"].style.height = "0";
        this.$refs["play"].style.display = "block";
      }

      //  向下拉取， 图片表现设置
      if (newY > 0) {
        zIndex = 10;
        scale += percent;
        this.$refs["bg-img"].style[transform] = `scale(${scale})`;
      } else {
        blur = Math.min(20 * percent, 20);
        this.$refs["filter"].style[backdrop] = `blur(${blur})`;
      }
      this.$refs["bg-img"].style.zIndex = zIndex;
    }
  },
  created() {
    //   给scroll组件设置属性, 触发其监听滚动
    this.probeType = 3;
    this.listenScroll = true;
  },
  mounted() {
    //   获取bg-img 高度
    this.imageHeight = this.$refs["bg-img"].clientHeight;
    //   定义最远滚动距离
    this.minTranslateY = -this.imageHeight + BOUNDARY__HEIGHT;
    //   设置list组件top值，使其在正确位置
    this.$refs.list.$el.style.top = `${this.imageHeight}px`;
  },
  components: {
    Scroll,
    SongList,
    Loading
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.music-list {
  position: fixed;
  width: 100%;
  z-index: 300;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    pading: 10px;
    text-align: center;
    line-height: 40px;
    width: 40px;
    height: 40px;
    font-size: 22px;
    color: #ffcd32;
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    color: #fff;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }

    .play-wrapper {
      position: absolute;
      z-index: 2;
      left: 50%;
      bottom: 20px;
      transform: translate3d(-50%, 0, 0);

      .play {
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
    }
  }

  .lay-bg {
    position: relative;
    height: 100%;
    background: $color-background;
  }

  .list {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    // overflow: hidden;
    background: $color-background;

    .song-list-wrapper {
      padding: 20px 30px;
    }
  }
}
</style>

<template>
  <div class="player" v-if="playlist.length>0">
    <!-- 默认播放器 -->
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-if="fullScreen">
        <div class="background">
          <img :src="currentSong.image" alt>
        </div>
        <div class="top">
          <div class="title">
            <div class="down" @click="setFullScreen(1)">
              <i class="icon-back"></i>
            </div>
            <div class="name" v-html="currentSong.name"></div>
          </div>
          <div class="subtitle" v-html="currentSong.singer"></div>
        </div>
        <div
          class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper animationMove" ref="cdWrapper" :class="cdCls">
              <img :src="currentSong.image" alt>
            </div>
            <div class="lyric">{{ playingLyric }}</div>
          </div>
          <scroll class="middle-r" ref="lyricList" v-if="currentLyric">
            <div class="lyric-wrapper" v-if="currentLyric.lines">
              <p
                class="lyric-p"
                :class="{'on':currentNum === index}"
                v-for="(item,index) in currentLyric.lines"
                :key="index"
                ref="lyricLine"
              >{{ item.txt }}</p>
            </div>
          </scroll>
          <div class="dots">
            <div class="dot" :class="{'on':currentShow === 'cd'}"></div>
            <div class="dot" :class="{'on':currentShow !== 'cd'}"></div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <div class="time-l">{{ this.formatTime(currentTime) }}</div>
            <!-- 进度条组件 -->
            <progress-bar :percent="percent" @changeProgress="onProgressChange"></progress-bar>
            <div class="time-r">{{ formatTime(currentSong.duration) }}</div>
          </div>
          <div class="operation-wrapper">
            <div class="mode" @click="changePlayMode">
              <i :class="iconMode"></i>
            </div>
            <div class="prev" @click="prev" :class="disableCls">
              <i class="icon-prev"></i>
            </div>
            <div class="play" @click="togglePlaying" :class="disableCls">
              <i :class="playingIcon"></i>
            </div>
            <div class="next" @click="next" :class="disableCls">
              <i class="icon-next"></i>
            </div>
            <div class="favorite">
              <i @click.stop="toggeleFavorite(currentSong)" :class="getFavoriteIcon(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- mini播放器： 收起固定在底部 -->
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="setFullScreen(0)">
        <div class="avatar">
          <img :src="currentSong.image" alt>
        </div>
        <div class="text">
          <div class="title" v-html="currentSong.name"></div>
          <div class="name" v-html="currentSong.singer"></div>
        </div>
        <div class="play" @click.stop="togglePlaying">
          <progress-circle :radius="32" :percent="percent">
            <i class="minicircle" :class="miniPlayIcon"></i>
          </progress-circle>
        </div>
        <div class="play-list-btn" @click.stop="showPlayList">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio
      ref="audio"
      :src="currentSong.url"
      @play="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>

    <play-list @addSongShow="addSongShow" ref="playlist"></play-list>
    <add-song ref="addsong"></add-song>
  </div>
</template>

<script>
import AddSong from "components/add-song/add-song.vue";
import PlayList from "components/playlist/playlist.vue";
import ProgressBar from "components/base/progress-bar/progress-bar.vue";
import ProgressCircle from "components/base/progress-circle/progress-circle.vue";
import Scroll from "components/base/scroll/scroll.vue";
import Layric from "lyric-parser";
import { getLyric } from "api/song.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { playMode } from "common/js/config";
// import { shuffle } from "common/js/util";
import { playerMixin } from "common/js/mixin.js";
import { prefixStyle } from "common/js/dom";
import animations from "create-keyframe-animation";
const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");
export default {
  mixins: [playerMixin],
  data() {
    return {
      readyNow: false, //  audio 是否 canplay
      currentTime: 0,
      currentLyric: null,
      currentNum: 0,
      currentShow: "cd",
      playingLyric: ""
    };
  },
  methods: {
    //    显示添加歌曲
    addSongShow() {
      this.$refs.addsong.show();
    },
    //   显示播放列表
    showPlayList() {
      this.$refs.playlist.show();
    },
    //   歌词和cd动画(左/右滑)
    middleTouchStart(e) {
      this.touch.initiated = true;
      const touches = e.touches[0];
      this.touch.startX = touches.pageX;
      this.touch.startY = touches.pageY;
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const touch = e.touches[0];
      const deltaX = touch.pageX - this.touch.startX;
      const deltaY = touch.pageY - this.touch.startY;
      //   纵轴滚动大于横向，return ---> 只支持横向滚动
      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        this.touch;
        return;
      }
      const left = this.currentShow === "cd" ? 0 : -window.innerWidth;
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      );
      //   比例
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
      this.$refs.lyricList.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyricList.$el.style[transitionDuration] = 0;
      this.$refs.middleL.style.opacity = 1 - this.touch.percent;
      this.$refs.middleL.style[transitionDuration] = 0;
    },
    middleTouchEnd() {
      let offsetWidth;
      let opacity;
      if (this.currentShow === "cd") {
        //   左划
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth;
          this.currentShow = "lyric";
          opacity = 0;
        } else {
          offsetWidth = 0;
          opacity = 1;
        }
      } else {
        //    右滑
        if (this.touch.percent < 0.9) {
          offsetWidth = 0;
          this.currentShow = "cd";
          opacity = 1;
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }
      this.$refs.lyricList.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyricList.$el.style[transitionDuration] = `300ms`;
      this.$refs.middleL.style.opacity = opacity;
      this.$refs.middleL.style[transitionDuration] = `300ms`;
      this.touch.initiated = false;
    },
    //  歌词获取及对象化处理
    getLayric() {
      //   console.log("--------", this.currentSong);
      this.currentSong
        .getLyric()
        .then(lyric => {
          if (this.currentSong.lyric !== lyric) {
            return;
          }
          this.currentLyric = new Layric(lyric, this.handle);
          if (this.playing) {
            this.currentLyric.play();
          }
        })
        .catch(() => {
          this.currentTime = null;
          this.playingLyric = "";
          this.currentNum = 0;
        });
    },
    //  歌词滚动配置回调
    handle({ lineNum, txt }) {
      this.currentNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        // console.log(lineEl);
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
      this.playingLyric = txt;
    },
    //  audio播放完毕
    end() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop() {
      //  如果模式是循环播放, 歌曲进度调到0的位置重新开始
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      if (this.currentLyric) {
        this.currentLyric.seek(0);
      }
    },
    next() {
      if (!this.readyNow) {
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.playlist.length) {
        index = 0;
      }
      this.SET_CURRENT_INDEX(index);
      if (!this.playing) {
        this.togglePlaying();
      }
      this.readyNow = false;
    },
    // 监听滚动条改变
    onProgressChange(percent) {
      const duration = percent * this.currentSong.duration;
      this.currentTime = duration;
      //  设置audio播放点
      this.$refs.audio.currentTime = this.currentTime;
      if (!this.playing) {
        this.togglePlaying();
      }
      if (this.currentLyric) {
        this.currentLyric.seek(duration * 1000);
      }
    },
    //  audio事件变化触发函数
    updateTime(e) {
      let time = e.target.currentTime;
      this.currentTime = time;
    },
    // 格式化时间
    formatTime(interval) {
      interval = interval | 0;
      let m = (interval / 60) | 0;
      let s = this._pad0(interval % 60);
      return `${m}:${s}`;
    },
    _pad0(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    //  audio标签脚本conplay触发， 开始播放音乐
    ready() {
      this.readyNow = true;
      //    保存当前播放音乐到播放历史中去
      this.savePlayHistory(this.currentSong);
    },
    error() {
      //   console.log("audio加载错误");
      this.readyNow = true;
    },
    //   上
    prev() {
      if (!this.readyNow) return;
      if (this.playlist.length === 1) {
        this.loop();
        return;
      } else {
        let index = this.currentIndex - 1;
        if (index < 0) {
          index = this.playlist.length - 1;
        }
        this.SET_CURRENT_INDEX(index);
        this.SET_PLAYING_STATE(true);
      }
      this.readyNow = false;
    },
    //   下
    next() {
      if (!this.readyNow) return;
      if (this.playlist.length === 1) {
        this.loop();
        return;
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.SET_CURRENT_INDEX(index);
        this.SET_PLAYING_STATE(true);
      }
      this.readyNow = false;
    },
    togglePlaying() {
      this.SET_PLAYING_STATE(!this.playing);
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    //  设置窗口为mini
    setFullScreen(type) {
      if (type) {
        this.SET_FULL_SCREEN(false);
      } else {
        this.SET_FULL_SCREEN(true);
      }
    },
    // JS钩子 + create-keyframe-animation 实现 cdWrapper 的进入css3效果动画
    enter(el, done) {
      let { x, y, scale } = this._getPosAndScale();
      let animationObj = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      };

      animations.registerAnimation({
        name: "move",
        animation: animationObj,
        presets: {
          duration: 400,
          easing: "linear"
        }
      });

      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    afterEnter(el, done) {
      animations.unregisterAnimation("move");
      this.$refs.cdWrapper && (this.$refs.cdWrapper.style.animations = "");
    },
    // 离开时的操作
    leave(el, done) {
      if (this.$refs.cdWrapper) {
        this.$refs.cdWrapper.style.transition = "all 0.4s";
        let { x, y, scale } = this._getPosAndScale();
        this.$refs.cdWrapper.style[
          transform
        ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
        this.$refs.cdWrapper.addEventListener("transitionend", done);
      }
    },
    afterLeave(el, done) {
      if (this.$refs.cdWrapper) {
        this.$refs.cdWrapper.style.transition = "";
        this.$refs.cdWrapper.style[transform] = `translate3d(0,0,0)`;
      }
    },
    // 计算偏移差值及缩放比例
    _getPosAndScale() {
      let targetWidth = 40;
      let targetLeft = 40;
      let targetBottom = 30;
      let marginTop = 80;
      let originWidth = window.innerWidth * 0.8;
      let scale = targetWidth / originWidth;
      let x = -window.innerWidth / 2 + targetLeft;
      let y = window.innerHeight - marginTop - targetBottom; // - originWidth / 2
      return {
        x,
        y,
        scale
      };
    },
    ...mapMutations({
      SET_FULL_SCREEN: "SET_FULL_SCREEN",
      SET_PLAYING_STATE: "SET_PLAYING_STATE",
      SET_CURRENT_INDEX: "SET_CURRENT_INDEX",
      SET_SEQUENCE_LIST: "SET_SEQUENCE_LIST"
      //   SET_MODE: "SET_MODE",
      //   SET_PLAYLIST: "SET_PLAYLIST"
    }),
    ...mapActions(["savePlayHistory"])
  },
  computed: {
    //   播放比例
    percent() {
      return this.currentTime / this.currentSong.duration;
    },
    cdCls() {
      return this.playing ? "play" : "pause";
    },
    playingIcon() {
      return this.playing ? "icon-pause" : "icon-play";
    },
    miniPlayIcon() {
      return this.playing ? "icon-pause-mini" : "icon-play-mini";
    },
    disableCls() {
      return this.readyNow ? "" : "disable";
    },
    ...mapGetters([
      "fullScreen",
      "playlist",
      "currentSong",
      "playing",
      "currentIndex"
      //   "mode",
      //   "sequenceList"
    ])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        return;
      }
      if (newSong.id === oldSong.id) {
        return;
      }
      // 解决切歌歌词跳动, 停止定时器
      if (this.currentLyric) {
        this.currentLyric.stop();
        this.currentTime = 0;
        this.playingLyric = "";
        this.currentNum = 0;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$refs.audio.play();
        this.getLayric();
      }, 1000);
    },
    playing(newPlaying) {
      let audio = this.$refs.audio;
      setTimeout(() => {
        audio && (newPlaying ? audio.play() : audio.pause());
      }, 20);
    }
  },
  components: {
    ProgressBar,
    ProgressCircle,
    Scroll,
    PlayList,
    AddSong
  },
  created() {
    //    关联歌词左滑的数据
    this.touch = {};
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';
@import '~common/stylus/variable.styl';

.player {
  .normal-player {
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    background: $color-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .top {
      position: absolute;
      z-index: 1;
      top: 0;
      width: 100%;
      height: 80px;

      .title {
        position: relative;
        height: 40px;

        .down {
          position: absolute;
          top: 0;
          left: 10px;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;

          i {
            font-size: 22px;
            color: #ffcd32;
            transform: rotate(-90deg);
          }
        }

        .name {
          line-height: 40px;
          text-align: center;
          font-size: 18px;
          color: #fff;
          no-wrap();
        }
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
    }

    .middle {
      position: absolute;
      width: 100%;
      top: 80px;
      z-index: 1;
      bottom: 160px;
      white-space: nowrap;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          width: 80%;
          height: 100%;
          left: 10%;
          top: 0;

          &.play {
            img {
              animation: rotate 20s forwards infinite;
            }
          }

          &.pause {
            img {
              animation-play-state: paused;
            }
          }

          img {
            border-radius: 50%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            width: 100%;
          }
        }

        .lyric {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        bottom: 25px;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          text-align: center;

          .lyric-p {
            line-height: 2.5;
            font-size: 13px;
            opacity: 0.45;
            white-space: pre-wrap;

            &.on {
              opacity: 1;
            }
          }
        }
      }

      .dots {
        height: 10px;
        text-align: center;
        margin-top: -20px;

        .dot {
          margin: 5px;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.66);

          &.on {
            width: 20px;
            background: rgba(255, 255, 255, 1);
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 0px;
      z-index: 1;
      width: 100%;
      height: 160px;

      .progress-wrapper {
        width: 80%;
        position: absolute;
        left: 10%;
        display: flex;
        align-items: center;

        .time-l, .time-r {
          color: #fff;
          font-size: 12px;
          flex: 0 0 30px;
          line-height: 30px;
          text-align: center;
          width: 30px;
          margin: 0 4px;
        }
      }

      .operation-wrapper {
        position: absolute;
        top: 40px;
        left: 5%;
        width: 90%;
        color: #ffcd32;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &>div {
          flex: 1;
          text-align: center;
        }

        .mode, .prev, .next, .favorite {
          font-size: 30px;
        }

        .favorite {
          .icon-favorite {
            color: $color-sub-theme;
          }
        }

        .play {
          font-size: 40px;
        }

        .next, .play, .prev {
          &.disable {
            opacity: 0.5;
          }
        }
      }
    }

    // 动画
    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.4s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.46, -0.44, 0.76, 1.93);
      }
    }

    &.normal-enter, &.normal-leave-to {
      opacity: 0;
      z-index: -1;

      .top {
        transform: translate3d(0, -100%, 0);
      }

      .bottom {
        transform: translate3d(0, 100%, 0);
      }
    }
  }

  .mini-player {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 60px;
    background: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .avatar {
      flex: 0 0 40px;
      width: 40px;
      margin-left: 20px;
      border-radius: 50%;
      overflow: hidden;

      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }

    .text {
      margin-left: 10px;
      flex: 1;
      no-wrap();

      .title {
        margin-bottom: 5px;
        font-size: 14px;
        color: #fff;
        no-wrap();
      }

      .name {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
        no-wrap();
      }
    }

    .play {
      position: relative;
      margin-right: 10px;
      flex: 0 0 40px;
      color: rgba(255, 205, 49, 0.5);
      font-size: 32px;

      .minicircle {
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .play-list-btn {
      flex: 0 0 40px;
      color: rgba(255, 205, 49, 0.5);
      font-size: 30px;
    }

    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s ease;
    }

    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

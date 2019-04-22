<template>
  <transition name="playlistMove">
    <div v-show="showFlag" class="playlist-wrapper">
      <div class="cover" @click="hide"></div>
      <div class="wrapper">
        <div class="main">
          <div class="operation">
            <div class="left" @click="changePlayMode">
              <span class="icon" :class="iconMode"></span>
              <!--modeCls-->
              <span class="text">{{ modeText }}</span>
            </div>
            <div class="right">
              <span @click="clearSongList" class="icon-clear"></span>
            </div>
          </div>
          <scroll ref="scroll" class="playlist" :data="playlist">
            <transition-group name="listgroup" tag="div" class="list-wrapper">
              <div
                ref="listItem"
                class="playitem"
                v-for="(item,index) in sequenceList"
                :key="item.id"
                @click="selectItem(item,index)"
              >
                <div class="left">
                  <span class="icon" :class="getCurrentPlayIcon(item)"></span>
                  <div class="songname">{{ item.name }}</div>
                </div>
                <div class="right">
                  <div
                    class="icon"
                    @click.stop="toggeleFavorite(item)"
                    :class="getFavoriteIcon(item)"
                  ></div>
                  <div @click.stop="deleteSong(item)" class="icon-delete"></div>
                </div>
              </div>
            </transition-group>
          </scroll>
          <div class="insert-song" @click="addSongShow">＋ 添加歌曲到队列</div>
        </div>
        <div class="close" @click="hide">关闭</div>
      </div>
      <comfirm ref="confirm" @confirm="deleteAllSong" confirmBtnText="清除全部" text="确定清除播放列表中全部歌曲吗?"></comfirm>
    </div>
  </transition>
</template>

<script>
import Comfirm from "components/base/confirm/confirm.vue";
import Scroll from "components/base/scroll/scroll.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { playMode } from "common/js/config";
// import { shuffle } from "common/js/util";
import { playerMixin } from "common/js/mixin.js";
export default {
  mixins: [playerMixin],
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    addSongShow() {
      this.$emit("addSongShow");
    },
    //  清除播放列表
    clearSongList() {
      this.$refs.confirm.show();
    },
    deleteAllSong() {
      this.deleteSongList();
    },
    deleteSong(item) {
      this.deleteSong(item);
    },
    //  滚动到当前播放歌曲
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex(song => song.id === current.id);
      this.$refs.scroll.scrollToElement(this.$refs.listItem[index], 300);
    },
    //  切换歌曲播放
    selectItem(item, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex(song => song.id === item.id);
      }
      this.setCurrentIndex(index);
      this.setPlayState(true);
    },
    /* // 修改播放模式
    changePlayMode() {
      let mode = (this.mode + 1) % 3;
      this.setMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      //   重新寻找当前音乐播放索引
      this.resetCurrentIndex(list);
      this.setPlaylist(list);
    },
    resetCurrentIndex(list) {
      let index = list.findIndex(item => item.id === this.currentSong.id);
      this.setCurrentIndex(index);
    }, */
    show() {
      this.showFlag = true;
      //  确定列表在显示后延迟重新渲染
      setTimeout(() => {
        this.$refs.scroll.refresh();
        //  显示即滚动到播放歌曲位置
        this.scrollToCurrent(this.currentSong);
      }, 20);
    },
    hide() {
      this.showFlag = false;
    },
    //  播放icon获取
    getCurrentPlayIcon(item) {
      if (this.currentSong.id === item.id) {
        return "icon-play";
      }
      return "";
    },
    ...mapMutations({
      setMode: "SET_MODE",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayState: "SET_PLAYING_STATE",
      setPlaylist: "SET_PLAYLIST"
    }),
    ...mapActions(["deleteSong", "deleteSongList"])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return;
      }
      this.scrollToCurrent(newSong);
    }
  },
  computed: {
    //   模式按钮表现
    /* modeCls() {
      let mode = this.mode;
      let icon = "icon-";
      if (mode === playMode.sequence) {
        icon += "sequence";
      } else if (mode === playMode.loop) {
        icon += "loop";
      } else if (mode === playMode.random) {
        icon += "random";
      }
      return icon;
    }, */
    ...mapGetters([
      //   "mode",
      "playlist",
      //   "sequenceList",
      "currentSong",
      "currentIndex"
    ])
  },
  components: {
    Scroll,
    Comfirm
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.playlistMove-enter-active, .playlistMove-leaver-active {
  transition: all 0.5s ease;

  .wrapper {
    transition: all 0.3s ease;
    // transform: translate3d(0, 0, 0);
  }
}

.playlistMove-enter, .playlistMove-leave-to {
  opacity: 0;

  .wrapper {
    transform: translate3d(0, 100%, 0);
  }
}

.playlist-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 9999;
  width: 100%;

  .cover {
    position: absolute;
    width: 100%;
    height: 100%;
    background: $color-background-d;
    z-index: 1;
  }

  .wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    z-index: 2;

    .main {
      padding: 0 20px;
      background: $color-highlight-background;
      display: flex;
      flex-direction: column;
      align-items: center;

      .operation {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          span.icon {
            margin-right: 10px;
            vertical-align: middle;
            font-size: 30px;
            color: $color-theme-d;
          }

          span.text {
            vertical-align: middle;
            color: $color-text-l;
          }
        }

        .right {
          color: $color-text-d;
        }
      }

      &>>>.wrapper {
        background: #333;
      }

      .playlist {
        position: relative;
        width: 100%;
        max-height: 240px;
        overflow: hidden;

        .list-wrapper {
          /* position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden; */
        }

        .playitem {
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &.listgroup-enter-active, &.listgroup-leave-active {
            transition: all 0.1s linear;
          }

          &.listgroup-enter, &.listgroup-leave-to {
            height: 0;
          }

          .left {
            flex: 1;
            display: flex;
            align-items: center;

            .songname {
              font-size: 12px;
              color: $color-text-l;
              //   flex: 1;
              width:250px;
              no-wrap();
            }

            .icon {
              width: 20px;
              height: 12px;
              color: $color-theme-d;
              font-size: 12px;
            }
          }

          .right {
            display: flex;
            font-size: 12px;
            color: $color-theme-d;

            .icon {
              margin-right: 15px;

              &.icon-favorite {
                color: $color-sub-theme;
              }
            }
          }
        }
      }

      .insert-song {
        display: inline-block;
        margin: 20px auto 30px auto;
        padding: 8px 16px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 100px;
      }
    }

    .close {
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: $color-text-l;
      background: $color-background;
    }
  }
}
</style>

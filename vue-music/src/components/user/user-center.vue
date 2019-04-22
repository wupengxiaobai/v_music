<template>
  <div class="user-center-component" ref="user-component">
    <div class="header">
      <div @click="back" class="back">
        <span class="icon-back"></span>
      </div>
      <div class="tab">
        <tabs
          class="tabs"
          :tabsArr="tabsArr"
          :currentTabIndex="currentTabIndex"
          @changeTab="changeTab"
        ></tabs>
      </div>
    </div>
    <div class="random-play">
      <random-play @randomPlay="random" mainColor="#fff"></random-play>
    </div>
    <div class="lists">
      <scroll
        class="scroll-list"
        v-if="currentTabIndex===0"
        ref="scrollFavorite"
        :data="favoriteList"
        :delayTime="20"
      >
        <div>
          <song-list :songs="favoriteList" @select="selectSong"></song-list>
        </div>
      </scroll>
      <scroll
        class="scroll-list"
        v-if="currentTabIndex===1"
        ref="scrollPlayHistory"
        :data="playHistory"
        :delayTime="20"
      >
        <div>
          <song-list :songs="playHistory" @select="selectSong"></song-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SongList from "components/common/song-list/song-list.vue";
import Scroll from "components/base/scroll/scroll.vue";
import Tabs from "components/base/tabs/tabs.vue";
import RandomPlay from "components/base/stylecpt/randomplay.vue";
import { Song } from "common/js/song.js";
import { playlistMiXin } from "common/js/mixin.js";
export default {
  mixins: [playlistMiXin],
  data() {
    return {
      currentTabIndex: 0,
      songs: []
    };
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs["user-component"].style.bottom = bottom;
      this.$refs.scrollFavorite && this.$refs.scrollFavorite.refresh();
      this.$refs.scrollPlayHistory && this.$refs.scrollPlayHistory.refresh();
    },
    random() {
      let list =
        this.currentTabIndex === 0 ? this.favoriteList : this.playHistory;
      list = list.map(song => {
        return new Song(song);
      });
      this.randomPlay({ list });
    },
    selectSong(song) {
      this.insertSong(song);
    },
    changeTab(index) {
      this.currentTabIndex = index;
    },
    back() {
      this.$router.back();
    },
    ...mapActions(["insertSong", "randomPlay"])
  },
  created() {
    this.tabsArr = [{ name: "我喜欢的" }, { name: "最近听的" }];
  },
  computed: {
    ...mapGetters(["favoriteList", "playHistory"])
  },
  components: {
    Tabs,
    RandomPlay,
    Scroll,
    SongList
  },
  watch: {
    currentTabIndex(newV, oldV) {
      if (newV === 0) {
        this.$refs.scrollFavorite && this.$refs.scrollFavorite.refresh();
      } else if (newV === 1) {
        this.$refs.scrollPlayHistory && this.$refs.scrollPlayHistory.refresh();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.user-center-component {
  position: fixed;
  z-index: 888;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background: $color-background;
  display: flex;
  flex-direction: column;

  .header {
    // position: relative;
    padding: 5px 10px;

    .back {
      position: absolute;
      width: 40px;
      height: 40px;
      left: 0;
      top: 0;
      text-align: center;
      line-height: 40px;
      font-size: 22px;
      color: $color-theme;
    }

    .tab {
      .tabs {
        margin: 0 auto;
        width: 260px;
      }
    }
  }

  .random-play {
    margin: 10px 0;
    text-align: center;
  }

  .lists {
    flex: 1;
    padding: 20px 20px 0px 20px;
    overflow: hidden;

    .scroll-list {
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>

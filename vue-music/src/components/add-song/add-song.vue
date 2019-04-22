<template>
  <transition name="addsongMove">
    <div class="add-song" v-show="flagShow">
      <div class="top">
        <div class="title">添加歌曲到列表</div>
        <span @click="hide" class="close icon-close"></span>
      </div>
      <div class="search-wrapper">
        <search-box ref="searchBox" @query="onQueryChange" placeholder="搜索歌曲"></search-box>
      </div>
      <div class="searchlist" v-show="query">
        <search-list
          @select="saveSearch"
          @beforeScroll="listScroll"
          :data="searchData"
          :listScroll="true"
          ref="searchList"
        ></search-list>
      </div>
      <div class="tab" v-show="!query">
        <!-- :tabsWidth="tabsWidth" -->
        <div class="tabs-wrapper">
          <tabs @changeTab="changeTab" :currentTabIndex="currentTabIndex" :tabsArr="tabsArr"></tabs>
        </div>
      </div>
      <div class="lists" v-show="!query">
        <scroll
          ref="playScroll"
          class="scrollDiv near-play"
          :data="playHistory"
          v-show="currentTabIndex===0"
        >
          <div>
            <song-list :songs="playHistory" @select="selectItem"></song-list>
          </div>
        </scroll>
        <scroll
          ref="searchScroll"
          class="scrollDiv history-search"
          :data="searchHistory"
          v-show="currentTabIndex===1"
        >
          <div>
            <search-history
              @select="selectHistory"
              @delete="deleteHistory"
              :searchHistory="searchHistory"
            ></search-history>
          </div>
        </scroll>
      </div>
      <top-tip class="toptip" ref="topTip">
        <div class="title">
          <i class="icon-ok"></i>
          <span class="text">{{ text }}</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script>
import TopTip from "components/base/toptip/toptip.vue";
import SearchHistory from "components/base/search-history/search-history.vue";
import SongList from "components/common/song-list/song-list.vue";
import Scroll from "components/base/scroll/scroll.vue";
import SearchList from "components/common/search-list/search-list.vue";
import SearchBox from "components/base/search-box/search-box.vue";
import Tabs from "components/base/tabs/tabs.vue";
import { searchMixin } from "common/js/mixin";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [searchMixin],
  data() {
    return {
      flagShow: false,
      //    tab组件的索引值
      currentTabIndex: 0,
      text: "已添加1首歌曲到播放列表"
    };
  },
  methods: {
    //   添加播放历史中的歌曲到播放列表
    selectItem(song) {
      this.insertSong(song);
      this.$refs.topTip.show();
    },
    //    tab切换
    changeTab(index) {
      this.currentTabIndex = index;
    },
    show() {
      this.flagShow = true;
      //  重新计算当前组件高度
      setTimeout(() => {
        if (this.currentTabIndex === 0) {
          this.$refs.playScroll.refresh();
        } else {
          this.$refs.playScroll.refresh();
        }
      }, 20);
    },
    hide() {
      this.flagShow = false;
    },
    ...mapActions(["insertSong"])
  },
  computed: {
    /* tabsWidth() {
      return 240;
    }, */
    tabsArr() {
      return [
        {
          name: "最近播放"
        },
        {
          name: "搜索历史"
        }
      ];
    },
    ...mapGetters(["playHistory", "searchHistory"])
  },
  components: {
    SearchBox,
    Tabs,
    SearchList,
    Scroll,
    SongList,
    SearchHistory,
    TopTip
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.addsongMove-enter-active, .addsongMove-leave-active {
  transition: all 0.5s;
}

.addsongMove-enter, .addsongMove-leave-to {
  transform: translate3d(100%, 0, 0);
}

.add-song {
  position: fixed;
  z-index: 99991;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: $color-background;
  display: flex;
  flex-direction: column;

  .searchlist {
    padding: 0 20px;
  }

  .top {
    height: 44px;
    position: relative;

    .title {
      width: 100%;
      height: 100%;
      line-height: 44px;
      text-align: center;
      font-size: 18px;
    }

    .close {
      position: absolute;
      top: 0;
      right: 10px;
      text-align: center;
      line-height: 44px;
      width: 44px;
      height: 44px;
      font-size: 20px;
      color: $color-theme;
    }
  }

  .search-wrapper {
    padding: 20px 20px 10px 20px;
  }

  .lists {
    flex: 1;
    overflow: hidden;
    padding: 20px 30px;

    .scrollDiv {
      height: 100%;
      overflow: hidden;
    }
  }

  .toptip {
    .title {
      line-height: 45px;
      text-align: center;
      width: 100%;
      height: 45px;

      i {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
      }

      .text {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }

  .tab {
    .tabs-wrapper {
      margin: 0 auto;
      width: 240px;
    }
  }
}
</style>

<template>
  <div class="search" ref="search">
    <!-- 搜索框 -->
    <search-box class="searchBox" ref="searchBox" @query="onQueryChange"></search-box>
    <scroll ref="moveScroll" :data="moveData" class="nosearching" v-show="hotShow">
      <div>
        <!-- 热门 -->
        <!--  v-show="hotShow && hotKey" -->
        <div class="hot-search">
          <!--  v-show="hotShow && hotKey" -->
          <div class="title">热门搜索</div>
          <div class="list">
            <div
              @click="selectQuery(item)"
              class="item"
              v-for="(item,index) in hotKey"
              :key="index"
            >{{ item.k }}</div>
          </div>
        </div>
        <!-- 搜索历史 -->
        <!--  v-show="searchHistory.length && !boxVal" -->
        <div class="searchhistory-wrapper" v-show="searchHistory.length && !boxVal">
          <div class="title">
            <div class="txt">搜索历史</div>
            <span @click="showConfirm" class="icon-clear"></span>
          </div>
          <search-history
            @select="selectHistory"
            @delete="deleteHistory"
            :searchHistory="searchHistory"
          ></search-history>
        </div>
      </div>
    </scroll>
    <div class="searching" v-show="!hotShow">
      <!-- loading -->
      <loading v-show="!hotShow && loadingShow"></loading>
      <!-- 没结果 -->
      <no-result v-show="boxVal && noSearchData"></no-result>
      <div class="lists" v-show="!hotShow">
        <search-list
          @select="saveSearch"
          @beforeScroll="listScroll"
          :data="searchData"
          :listScroll="true"
          ref="searchList"
        ></search-list>
      </div>
    </div>
    <!-- 弹出框 -->
    <confirm ref="confirm" @confirm="confirm" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Scroll from "components/base/scroll/scroll.vue";
import Confirm from "components/base/confirm/confirm.vue";
import SearchHistory from "components/base/search-history/search-history.vue";
import NoResult from "components/base/no-result/no-result.vue";
import Loading from "components/base/loading/loading";
import SearchBox from "components/base/search-box/search-box.vue";
import SearchList from "components/common/search-list/search-list.vue";
import { getHotKey, search } from "api/search.js";
import { ERR_OK } from "api/config";
import { playlistMiXin } from "common/js/mixin.js";
export default {
  mixins: [playlistMiXin],
  data() {
    return {
      hotKey: [],
      hotShow: true,
      searchData: {},
      loadingShow: true,
      boxVal: "",
      noSearchData: false
    };
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.search.style.bottom = bottom;
      this.$refs.moveScroll.refresh();
    },
    //  弹窗确定->删除
    confirm() {
      this.clearSearchHistory();
    },
    //  弹窗显示
    showConfirm() {
      this.$refs.confirm.show();
    },
    //  选择历史添加inpt中
    selectHistory(item) {
      this.$refs.searchBox.setQuery(item);
    },
    deleteHistory(item) {
      this.deletSearchHistory(item);
    },
    //  保存搜索历史
    saveSearch(item) {
      //   console.log(item);
      this.saveSearchHistory(item.name);
    },
    //   优化输入框滑动失去焦点,移动端键盘隐藏
    listScroll() {
      this.$refs.searchBox.Inpblur();
    },
    //   搜索关键词变化
    onQueryChange(newQuery) {
      this.boxVal = newQuery;
      //   console.log(newQuery);
      if (newQuery.length) {
        this.hotShow = false;
        search(newQuery).then(res => {
          //   console.log(res);
          if (res.code === ERR_OK) {
            this.searchData = res.data;
            // console.log(this.searchData);
            this.loadingShow = false;
            this.noSearchData = false;
            if (
              !this.searchData["album"].count &&
              !this.searchData["mv"].count &&
              !this.searchData["singer"].count &&
              !this.searchData["song"].count
            ) {
              this.noSearchData = true;
            }
          }
        });
      } else {
        this.searchData = {};
        this.hotShow = true;
        this.loadingShow = true;
        this.noSearchData = false;
      }
    },
    //  热门关键词搜索点击
    selectQuery(item) {
      this.$refs.searchBox.setQuery(item.k);
    },
    _getHotKey() {
      getHotKey().then(res => {
        // console.log(res);
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10);
        }
      });
    },
    ...mapActions([
      "saveSearchHistory",
      "deletSearchHistory",
      "clearSearchHistory"
    ])
  },
  computed: {
    moveData() {
      return this.hotKey.concat(this.searchHistory);
    },
    ...mapGetters(["searchHistory"])
  },
  watch: {
    boxVal(newQ) {
      //   this.$refs.searchList.refresh();
      //   this.$refs.moveScroll.refresh();
    }
  },
  created() {
    this._getHotKey();
  },
  components: {
    SearchBox,
    SearchList,
    Loading,
    NoResult,
    SearchHistory,
    Confirm,
    Scroll
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.search {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .searchBox {
    flex: 0 0 40px;
  }

  .nosearching {
    flex: 1;
    overflow: hidden;

    .hot-search {
      .title {
        margin: 20px 0;
        font-size: 14px;
        color: $color-text-l;
      }

      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;

        .item {
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: #333;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }

    .searchhistory-wrapper {
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
        font-size: 14px;
        color: $color-text-l;
      }
    }
  }

  .searching {
    flex: 1;

    .lists {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>

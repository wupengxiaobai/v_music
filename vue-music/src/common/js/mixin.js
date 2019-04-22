import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import {
  shuffle
} from "common/js/util";
import {
  playMode
} from "common/js/config";
import {
  search
} from "api/search.js";
import {
  ERR_OK
} from "api/config";

//  播放列表高度设置 mixin
export const playlistMiXin = {
  computed: {
    ...mapGetters(["playlist"])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  },
}

//  播放组件的 mixin
export const playerMixin = {
  methods: {
    // 切换收藏
    toggeleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
        return
      }
      this.saveFavoriteList(song)
    },
    // 获取收藏icon  
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return `icon-favorite`
      }
      return `icon-not-favorite`
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex(item => item.id === song.id)
      return index > -1
    },
    // 改变播放模式
    changePlayMode() {
      let mode = (this.mode + 1) % 3;
      this.SET_MODE(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      //   重新寻找当前音乐播放索引
      this.resetCurrentIndex(list);
      this.SET_PLAYLIST(list);
    },
    // 随机播放下重新计算索引
    resetCurrentIndex(list) {
      let index = list.findIndex(item => item.id === this.currentSong.id);
      this.SET_CURRENT_INDEX(index);
    },
    ...mapMutations(["SET_MODE", "SET_CURRENT_INDEX", "SET_PLAYLIST"]),
    ...mapActions(['changePlayModel', 'deleteFavoriteList', 'saveFavoriteList'])
  },
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ?
        "icon-sequence" :
        this.mode === playMode.loop ?
        "icon-loop" :
        "icon-random";
    },
    //  播放模式文案
    modeText() {
      let modeText;
      let mode = this.mode;
      if (mode === playMode.sequence) {
        modeText = "顺序播放";
      } else if (mode === playMode.loop) {
        modeText = "循环播放";
      } else if (mode === playMode.random) {
        modeText = "随机播放";
      }
      return modeText;
    },
    ...mapGetters(['mode', 'sequenceList', 'favoriteList'])
  }
}

//  搜索组件 mixin
export const searchMixin = {
  data() {
    return {
      query: "",
      searchData: {}
    }
  },
  methods: {
    // 搜索框的焦点操作  
    listScroll() {
      this.$refs.searchBox.Inpblur();
    },
    //  搜索框内容发送变化
    onQueryChange(newQuery) {
      this.query = newQuery;
      //   请求搜索数据
      if (newQuery.length) {
        search(newQuery).then(res => {
          //   console.log(res);
          if (res.code === ERR_OK) {
            this.searchData = res.data;
          }
        });
      } else {
        this.searchData = {};
      }
    },
    //  选择历史添加inpt中
    selectHistory(item) {
      this.$refs.searchBox.setQuery(item);
    },
    deleteHistory(item) {
      this.deletSearchHistory(item);
    },
    //  搜索内容点击 -> 保存搜索历史
    saveSearch(item) {
      //   console.log(item);
      this.saveSearchHistory(item.name);
    },
    ...mapActions([
      "saveSearchHistory",
      "deletSearchHistory"
    ])
  }
}

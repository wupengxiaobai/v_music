import * as types from './mutations-type'

const mutations = {
  //    设置歌手
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  //   播放器相关********
  //    设置播放状态
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  //    设置是否全屏播放
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  //    设置播放列表
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  //    顺序播放列表
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  //    设置播放模式
  [types.SET_MODE](state, mode) {
    state.mode = mode
  },
  //    设置当前播放索引
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  //    歌单相关*****
  //    设置歌单列表
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  //    排行相关 ***
  [types.SET_TOP_LIST](state, toplist) {
    state.toplist = toplist
  },
  //    设置本地搜索历史
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  //    设置播放历史
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  //    设置收藏列表
  [types.SET_FAVORITE_LIST](state, favorite) {
    state.favoriteList = favorite
  }
}

export default mutations

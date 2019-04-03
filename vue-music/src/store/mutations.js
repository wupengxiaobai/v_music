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
    state.fllScreen = flag
  },
  //    设置播放列表
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  //    设置顺序播放列表
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
  }
}

export default mutations

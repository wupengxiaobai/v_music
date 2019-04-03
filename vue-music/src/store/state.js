import {
  playMode
} from 'common/js/config'

const state = {
  singer: {},
  /**
   * 播发器相关
   *  */
  playing: false, //  播放状态
  fullScreen: true, //  是否全屏播放
  playlist: [], //  播放列表
  sequenceList: [], //  顺序播放列表
  mode: playMode.sequence, //  播放模式(默认顺序播放)
  currentIndex: -1, //  当前播放索引
}

export default state

/**
 * 一次动作多次操作mutations 推荐使用 actions 来作"一次性"的提交工作
 */
import * as types from './mutations-type'

export const selectPlay = function ({
  commit,
  state
}, {
  list,
  index
}) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

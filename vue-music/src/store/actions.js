/**
 * 一次动作多次操作 mutations 推荐使用 actions 来作"一次性"的提交工作
 */
import * as types from './mutations-type'
import {
  playMode
} from 'common/js/config'

import {
  shuffle
} from 'common/js/util'

import {
  saveSearch,
  deletSearch,
  clearSearch,
  savePlay,
  saveFavorite,
  deleteFromFavorite
} from 'common/js/cache'

function findIndex(list, song) {
  return list.findIndex(item => item.id === song.id)
}

//  选择播放列表
export const selectPlay = function ({
  commit,
  state
}, {
  list,
  index
}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
    // commit(types.SET_CURRENT_INDEX, index)
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

//  随机播放
export const randomPlay = function ({
  commit
}, {
  list
}) {
  commit(types.SET_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

//  添加歌曲到列表并播放
export const insertSong = function ({
  commit,
  state
}, song) {
  let playlist = state.playlist.slice();
  //   设置歌曲添加目标位置索引
  let targetIndex = state.currentIndex + 1;
  //   查找当前列表中是否有待插入歌曲， 并返回其索引
  let fpIndex = findIndex(playlist, song)
  //   插入歌曲 -> 索引+1
  playlist.splice(targetIndex, 0, song)
  //   如果列表已经包含该歌曲，需要删除原歌曲
  if (fpIndex > -1) {
    if (targetIndex > fpIndex) {
      //    插入到歌曲之后 - > 删除原歌曲
      playlist.splice(fpIndex, 1)
      targetIndex--
    } else {
      //    插入到歌曲之前，删(索引+1)即可
      playlist.splice(fpIndex + 1, 1)
    }
  }

  let sequenceList = state.sequenceList.slice();
  let targetSIndex = findIndex(state.sequenceList, song) + 1
  let fSIndex = findIndex(state.sequenceList, song)
  sequenceList.splice(targetSIndex, 0, song)
  if (fSIndex > -1) {
    if (targetSIndex > fSIndex) {
      sequenceList.splice(fSIndex, 1)
    } else {
      sequenceList.splice(fSIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, targetIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

//  删除播放列表中的歌曲
export const deleteSong = function ({
  commit,
  state
}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)

  //    删除的歌曲在当前播放歌曲之前
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    // commit(types.SET_PLAYING_STATE, true)
  }
}

//  删除播放列表
export const deleteSongList = function ({
  commit
}) {
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}


//  保存搜索到搜索历史
export const saveSearchHistory = function ({
  commit
}, query) {
  let history = saveSearch(query)
  commit(types.SET_SEARCH_HISTORY, history)
}

//  删除某一条搜索记录
export const deletSearchHistory = function ({
  commit
}, query) {
  let history = deletSearch(query)
  commit(types.SET_SEARCH_HISTORY, history)
}

//  删除全部搜索数据
export const clearSearchHistory = function ({
  commit
}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

//  保存播放歌曲到播放历史和本地
export const savePlayHistory = function ({
  commit
}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

//  保存歌曲到收藏列表
export const saveFavoriteList = function ({
  commit
}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

//  删除收藏列表中的歌曲
export const deleteFavoriteList = function ({
  commit
}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFromFavorite(song))
}

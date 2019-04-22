//  歌手相关
export const singer = state => state.singer

//  播放内置组件相关
export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = state => state.playlist[state.currentIndex] || {}

//  歌单相关
export const disc = state => state.disc

//  排行相关
export const toplist = state => state.toplist

//  搜索历史
export const searchHistory = state => state.searchHistory

//  播放历史 
export const playHistory = state => state.playHistory

//  收藏列表
export const favoriteList = state => state.favoriteList

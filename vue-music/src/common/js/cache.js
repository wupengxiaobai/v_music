//  操作和 storage 相关的逻辑 js 文件
import storage from 'good-storage'

//  搜索历史本地记录标识
const SEARCH_KEY = '__search__';
//  播放历史本地记录标识
const PLAY_KEY = '__play__';
//  收藏歌曲本地记录标识
const FAVORITE_KEY = '__favorite__';
//  搜索历史限定长度
const SEARCH_MAX_LENGTH = 15;
//  播放历史限定长度
const PLAY_MAX_LENGTH = 200;
//  收藏歌曲限定长度
const FAVORITE_LENGTH = 200;

//  插入数据到数组: 插入到第一条位置，超出长度删除最后一个
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) { //  第一条数据
    return
  }
  if (index > 0) { //  有数据, 且不是第一条
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) { //  超出长度, 删除最后一个
    arr.pop()
  }
  return arr
}

//  删除数组中的某一条记录
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}


/**
 * 获取搜素记录
 */
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

/**
 * 保存数据到 localStorage, 返回 搜索本地保存的搜索数据
 * @param {*} query 
 */
export function saveSearch(query) {
  let searchs = storage.get(SEARCH_KEY, [])
  insertArray(searchs, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searchs)
  return searchs
}

/**
 * 清除一条搜索记录, 保存本地
 * @param {*} query 
 */
export function deletSearch(query) {
  let searchs = storage.get(SEARCH_KEY, [])
  deleteFromArray(searchs, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searchs)
  return searchs
}

/**
 * 清除搜索记录, 保存本地
 */
export function clearSearch() {
  let searchs = []
  storage.set(SEARCH_KEY, searchs)
  return searchs
}


/**
 * 保存歌曲到播放记录到本地
 */
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, []);
  insertArray(songs, song, (item) => {
      return item.id === song.id
    },
    PLAY_MAX_LENGTH);
  storage.set(PLAY_KEY, songs);
  return songs;
}

/**
 * 获取本地播放记录
 */
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}


/**
 * 保存收藏到本地记录
 */
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, []);
  insertArray(songs, song, (item) => item.id === song.id, FAVORITE_LENGTH);
  storage.set(FAVORITE_KEY, songs);
  return songs;
}

/**
 * 从收藏本地记录中剔除某歌曲
 */
export function deleteFromFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, item => item.id === song.id)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

/**
 * 获取本地收藏记录
 */
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

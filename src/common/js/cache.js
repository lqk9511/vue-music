// localStorage 缓存相关逻辑
import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

// 定义收藏的key
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200
/**
 * @param {Array} arr 要插入元素的数组
 * @param {any} val 要插入的值
 * @param {Function} compare 比较函数
 * @param {Number} maxLen 数组的最大值
 */
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
/**
 * @param {Array} arr 要在哪个数组中删除
 * @param {Function} compare 比较函数
 */
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 保存最近播放历史的localStorage
export function savePlay(song) {
  // 获得当前的PLAY_KEY的本地缓存，如果没有的话就默认给一个空数组
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}

// 获得最近播放的历史
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

// 保存收藏的歌曲
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 删除收藏的歌曲
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 每次获取收藏的歌曲
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

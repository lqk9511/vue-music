import * as types from './mutation-types'
import {
  playMode
} from 'common/js/config'
import {
  shuffle
} from 'common/js/util'
import {
  saveSearch,
  deleteSearch,
  clearSearch
} from 'common/js/cache'

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
    debugger
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
export const randomPlay = function ({
  commit
}, {
  list
}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const insertSong = function ({
  commit,
  state
}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录下当前的歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前有没有这个歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 要插入的位置是当前的索引的下一个
  currentIndex++
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  // 如果已经包含这首歌
  if (fsIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 删除歌曲
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
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  const playingState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}

// 封装搜索记录的缓存
export const saveSearchHistory = function ({
  commit
}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// 封装删除搜索历史
export const deleteSearcHistory = function ({
  commit
}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 清除所有的搜索历史
export const clearSearchHistory = function ({
  commit
}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// 清空所有歌曲
export const deleteSongList = function ({
  commit
}) {
  commit(types.SET_PLAYLIST, [])

  commit(types.SET_SEQUENCE_LIST, [])

  commit(types.SET_CURRENT_INDEX, -1)

  commit(types.SET_PLAYING_STATE, false)
}

import {
  getLyric,
  getMusicUrl
} from 'api/song'
import {
  ERR_OK
} from 'api/config'
import {
  Base64
} from 'js-base64'
export default class Song {
  constructor({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    image,
    url
  }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          // eslint-disable-next-line
          reject('no lyric')
        }
      })
    })
  }
  getMusicUrl() {
    return new Promise((resolve, reject) => {
      getMusicUrl(this.mid, 1337607920).then((res) => {
        if (res.data.code === 0) {
          this.musicUrl = `http://dl.stream.qqmusic.qq.com/C400${this.mid}.m4a?guid=1337607920&vkey=${res.data.data.items[0].vkey}&uin=0&fromtag=66`
          resolve(this.musicUrl)
        } else {
          // eslint-disable-next-line
          reject('no url')
        }
      })
    })
  }
}

export function createSong(musicData) {
  let vkey = ''
  // let guid = ''
  // getSongKey(musicData.songmid, musicData.songid).then((res) => {
  //   console.log(res)
  //   if (res.code === 0) {
  //     vkey = res.data.items[0].vkey
  //     // guid = musicData.songid
  //     console.log(res)
  //   } else {
  //     vkey = 'no key'
  //   }
  // })
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://isure.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=32`
    // url: `http://thirdparty.gtimg.com/C100${musicData.songmid}.m4a?fromtag=38`
    // url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0`
    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=1819638027&uin=0&fromtag=66`
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=1795238832&vkey=${vkey}&uin=4913&fromtag=38`
  })
}

// function getMusicKey() {
//   let vkey = ''
//   getSongKey(musicData.songmid, musicData.songid).then((res) => {
//     console.log(res)
//     if (res.code === 0) {
//       vkey = res.data.items[0].vkey
//       return vkey
//       // guid = musicData.songid
//       console.log(res)
//     } else {
//       vkey = 'no key'
//     }
//   })
// }

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}

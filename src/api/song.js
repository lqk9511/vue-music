import {
  commonParams
} from './config'
// import jsonp from 'common/js/jsonp'
// import {
//   commonParams,
//   options
// } from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = 'api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    var ret = res.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res = ret
    return Promise.resolve(res)
  })
}

export function getMusicUrl(songmid, guid) {
  const url = 'api/musicUrl'
  const data = Object.assign({}, commonParams, {
    g_tk: 1500144158,
    notice: 0,
    songmid,
    guid,
    filename: `C400${songmid}.m4a`,
    cid: 205361747,
    hostUin: 0,
    needNewCode: 0,
    platfrom: 'yqq',
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}

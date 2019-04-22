import {
  getLyric
} from 'api/song.js'
import {
  ERR_OK
} from 'api/config';
import {
  Base64
} from 'js-base64';

//  歌曲类
export class Song {
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
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(res => {
        if (res.code === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('lyric error')
        }
      })
    })
  }
}

// 单例模式： 跳过new，函数式调用获取歌曲的相关信息
export function createSong(musicData, vkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    songmid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=5124515117&vkey=4829F9F763140B98D82A8C210B33FFDA2BE4B17185B9E3B9F21E37907426149197554481C2025CC5FE9825397A9C294D498FD6F2CD35FC32&uin=0&fromtag=38`
    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=5124515117&vkey=${vkey}&uin=0&fromtag=38`
  })
}

function filterSinger(singers) {
  let ret = []
  singers.filter(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}

//  歌手
export class Singer {
  constructor({
    id,
    name
  }) {
    this.id = id;
    this.name = name;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`;
    this.bAvatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`;
  }
}

// 歌手专辑
export class singerZJ {
  constructor({
    id,
    name,
    time,
    desc
  }) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.desc = desc;
    this.img = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${id}.jpg?max_age=2592000`;
  }
}

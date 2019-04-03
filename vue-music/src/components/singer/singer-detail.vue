<template>
  <transition name="singerAni">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from "components/common/music-list/music-list.vue";
import { mapGetters } from "vuex";
import { getSingerDetail, getSingerZJData } from "api/singer";
import { singerZJ } from "common/js/singer";
import { createSong } from "common/js/song";
import { ERR_OK } from "api/config";
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      songs: [],
      singerJZ: []
    };
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push("/singer");
      }
      getSingerDetail(this.singer.id).then(res => {
        res.data && (this.songs = this._normalizeSongs(res.data.list));
      });
    },
    // 处理获的歌曲相关数据
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        ret.push(createSong(item.musicData));
      });
      return ret;
    },
    // 歌手专辑数据获取&处理
    _getSingerZJData() {
      getSingerZJData(this.singer.id).then(res => {
        // 处理专辑数据
        if (res.code === ERR_OK) {
          let zjArr = [];
          let list = res.singerAlbum.data.list;
          list.forEach(zj => {
            zjArr.push(
              new singerZJ({
                id: zj.album_mid,
                name: zj.album_name,
                time: zj.pub_time,
                desc: zj.desc
              })
            );
          });
          this.singerJZ = zjArr;
        }
      });
    }
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.bAvatar;
    },
    ...mapGetters(["singer"])
  },
  created() {
    this._getSingerDetail();
    this._getSingerZJData();
  },
  components: {
    MusicList
  }
};
</script>

<style lang="stylus" scoped>
.singerAni-enter-active, .singerAni-leave-active {
  transition: all 0.3s;
  transform: translate3d(100%, 0, 0);
}

.singerAni-enter, .singerAni-enter-to {
  transform: translate3d(0, 0, 0);
}
</style>

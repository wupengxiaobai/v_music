<template>
  <transition name="discTrans">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import MusicList from "components/common/music-list/music-list.vue";
import { getMusicList } from "api/ranking.js";
import { createSong } from "common/js/song";
import { ERR_OK } from "api/config";
export default {
  data() {
    return {
      songs: []
    };
  },
  methods: {
    _getMusicList() {
      getMusicList(this.toplist.id).then(res => {
        if (!this.toplist.id) {
          this.$router.push("/ranking");
        }
        if (res.code !== ERR_OK) return;
        // 处理数据
        this.songs = this._nomalizeSongs(res.songlist);
        // console.log(this.songs);
      });
    },
    _nomalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        let musicData = item.data;
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  computed: {
    rank() {
      return true;
    },
    title() {
      return this.toplist.topTitle;
    },
    bgImage() {
      //   return this.toplist.picUrl;
      if (this.songs.length) {
        return this.songs[0].image;
      }
    },
    ...mapGetters(["toplist"])
  },
  created() {
    this._getMusicList();
  },
  components: {
    MusicList
  }
};
</script>

<style lang="stylus" scoped>
.topList {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background: red;
}

.topListTrans-enter-active, .topListTrans-leave-active {
  transition: all 0.3s;
}

.topListTrans-enter, .topListTrans-leave-to {
  opacity: 0;
}
</style>

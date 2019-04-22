<template>
  <transition name="discTrans">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import { createSong } from "common/js/song";
import { getDisc } from "api/recommend";
import { mapGetters } from "vuex";
import MusicList from "components/common/music-list/music-list.vue";
export default {
  data() {
    return {
      songs: []
    };
  },
  methods: {
    getDisc() {
      getDisc(this.disc.dissid).then(res => {
        if (!this.disc.dissid) {
          this.$router.push("/recommend");
        }
        // 处理数据
        this.songs = this._nomalizeSongs(res.cdlist[0].songlist);
        console.log(this.songs);
      });
    },
    _nomalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  computed: {
    title() {
      return this.disc.dissname;
    },
    bgImage() {
      return this.disc.imgurl;
    },
    ...mapGetters(["disc"])
  },
  created() {
    this.getDisc();
  },
  components: {
    MusicList
  }
};
</script>

<style lang="stylus" scoped>
.disc {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background: red;
}

.discTrans-enter-active, .discTrans-leave-active {
  transition: all 0.3s;
}

.discTrans-enter, .discTrans-leave-to {
  opacity: 0;
}
</style>

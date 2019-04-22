<template>
  <scroll ref="scroll" :data="data[0]" @beforeScroll="beforeScroll" :beforeScroll="listScroll">
    <div class="search-list">
      <div class="list-type" v-for="(list,listIndex) in data" :key="listIndex">
        <div class="title border-bottom-1px" v-if="list.itemlist.length">
          <span class="image" :style="bgPosition(list.type)"></span>
          <span class="text">{{ list.name }}</span>
        </div>
        <div
          class="item"
          @click="selectSearch(list, item)"
          v-for="(item, index) in list.itemlist"
          :key="index"
        >{{ item.name }}{{ list.type!==2 ? ' - '+item.singer:'' }}</div>
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/base/scroll/scroll.vue";
import { Singer } from "common/js/singer";
import { createSong } from "common/js/song";
import { mapMutations, mapActions } from "vuex";
import { getSongDetail } from "api/search";
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    listScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    refresh() {
      this.$refs.scroll.refresh();
    },
    beforeScroll() {
      this.$emit("beforeScroll");
    },
    //  选择搜索
    selectSearch(list, item) {
      //    歌手点击
      if (list.type === 2) {
        const singer = new Singer({
          id: item.mid,
          name: item.name
        });
        this.$router.push({
          path: `/singer/${singer.id}`
        });
        //   提交歌手到vuex的数据仓库中
        this.setSinger(singer);
      }
      //  单曲点击, 往当前播放列表添加歌曲 -> 一大波命令 mutations 操作
      if (list.type === 1) {
        getSongDetail(item.name).then(res => {
          let song = this._normalizeSong(res.data.data.song.list, item);
          if (!song) {
            return;
          }
          this.insertSong(song);
        });
      }
      //  mv点击
      //  专辑点击

      //  保存搜索历史
      this.$emit("select", item);
    },
    _normalizeSong(list, song) {
      if (!song.id) {
        return false;
      }
      let res = createSong(
        list.find(item => {
          return item.songmid === song.mid;
        })
      );
      return res;
    },
    bgPosition(type) {
      if (type === 1) {
        //  单曲
        return `background-position:-20px -220px`;
      } else if (type === 2) {
        //  歌手
        return `background-position:-20px -240px`;
      } else if (type === 3) {
        //  专辑
        return `background-position:-40px 0`;
      } else if (type === 4) {
        //  MV
        return `background-position:0px -220px`;
      }
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    ...mapActions(["insertSong"])
  },
  components: {
    Scroll
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';
@import '~common/stylus/variable.styl';

.search-list {
  color: $color-text-l;

  .list-type {
    margin: 10px 0;

    .title {
      padding: 5px 10px;
      margin-bottom: 10px;
      border-bottom-1px($color-text-d);

      .image {
        display: inline-block;
        margin-right: 4px;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        background-image: url('icon_sprite.png');
      }

      .text {
        display: inline-block;
        vertical-align: middle;
      }
    }

    .item {
      padding: 5px 0;
      no-wrap();
    }
  }
}
</style>

<template>
  <scroll class="ranking">
    <div>
      <loading v-if="!rankingData.length"></loading>
      <div class="list" v-if="rankingData.length">
        <div class="item" v-for="(item,index) in rankingData" :key="index">
          <div class="img">
            <img v-lazy="item.picUrl" alt>
          </div>
          <div class="rank-wrapper">
            <div class="rank-item" v-for="(song,songIndex) in item.songList" :key="songIndex">
              <span>{{ songIndex+1 }}</span>
              <span class="desc">{{song.songname}}-{{song.singername}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import { ERR_OK } from "api/config.js";
import { getRanking } from "api/ranking.js";
import Scroll from "components/base/scroll/scroll.vue";
import Loading from "components/base/loading/loading.vue";
export default {
  data() {
    return {
      rankingData: []
    };
  },
  methods: {
    getRanking() {
      getRanking().then(res => {
        if (res.code === ERR_OK) {
          this.rankingData = res.data.topList;
        }
      });
    }
  },
  created() {
    this.getRanking();
  },
  components: {
    Scroll,
    Loading
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.ranking {
  width: 100%;

  .list {
    width: 100%;
    padding: 0 20px 20px;
    box-sizing: border-box;

    .item {
      width: 100%;
      margin-top: 20px;
      display: flex;

      .img {
        flex: 0 0 100px;
        height: 100px;
        width: 100px;

        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }

      .rank-wrapper {
        flex: 1;
        padding: 11px 20px;
        font-size: 12px;
        color: $color-text-d;
        background: $color-highlight-background;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .rank-item {
          span:nth-of-type(1) {
            margin-right: 3px;
          }

          .desc {
            display: inline-block;
            width: 180px;
            no-wrap();
            /* white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis; */
          }
        }
      }
    }
  }
}
</style>

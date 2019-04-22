<template>
  <div class="song-list">
    <ul>
      <li
        @click="selectItem(song,songIndex)"
        v-for="(song,songIndex) in songs"
        :key="songIndex"
        class="item"
      >
        <div class="rank" v-show="rank">
          <span :class="getRankCls(songIndex)">{{ getRankTxt(songIndex) }}</span>
        </div>
        <div class="content">
          <h2 class="name">{{ song.name }}</h2>
          <p class="desc">{{ getDesc(song) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      }
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getRankTxt(index) {
      return index + 1;
    },
    getRankCls(index) {
      if (index < 3) {
        return `icon icon_${index}`;
      } else {
        return `txt`;
      }
    },
    selectItem(item, index) {
      this.$emit("select", item, index);
    },
    getDesc(song) {
      return `${song.singer}·${song.album}`;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.song-list {
  .item {
    display: flex;
    align-items: center;
    height: 64px;
    font-size: $font-size-medium;

    .rank {
      span {
        margin-right: 30px;

        &.icon {
          display: inline-block;
          width: 25px;
          height: 24px;
          background-size: 25px 24px;

          &.icon_0 {
            bg-image('first');
          }

          &.icon_1 {
            bg-image('second');
          }

          &.icon_2 {
            bg-image('third');
          }
        }

        &.txt {
          display: inline-block;
          text-align: center;
          width: 25px;
          color: #ffcd32;
          font-size: 18px;
        }
      }
    }

    .content {
      .desc {
        margin-top: 4px;
        color: $color-text-d;
        no-wrap();
      }
    }
  }
}
</style>

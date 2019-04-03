<template>
  <div class="song-list">
    <ul>
      <li
        @click="selectItem(song,songIndex)"
        v-for="(song,songIndex) in songs"
        :key="songIndex"
        class="item"
      >
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
    }
  },
  methods: {
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

    .desc {
      margin-top: 4px;
      color: $color-text-d;
      no-wrap();
    }
  }
}
</style>

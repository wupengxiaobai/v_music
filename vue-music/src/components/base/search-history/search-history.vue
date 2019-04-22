<template>
  <div class="search-history">
    <div
      @click="selectItem(item)"
      class="history-item"
      v-for="(item,index) in searchHistory"
      :key="index"
    >
      <span>{{ item }}</span>
      <span class="icon-delete" @click.stop="deleteOne(item)"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchHistory: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    selectItem(item) {
      this.$emit("select", item);
    },
    deleteOne(item) {
      this.$emit("delete", item);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.search-history {
  .history-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 13px 0;

    span {
      font-size: 12px;
      color: $color-text-l;
    }
  }
}
</style>

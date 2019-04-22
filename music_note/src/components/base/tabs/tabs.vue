<template>
  <div class="tabs-component">
    <ul class="tab-wrapper">
      <li
        @click="changeTabActive(index)"
        class="tab"
        :class="{'on':index===currentTabIndex}"
        v-for="(item,index) in tabsArr"
        :key="index"
      >{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tabsArr: {
      type: Array,
      default() {
        return [];
      }
    },
    currentTabIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    changeTabActive(index) {
      this.$emit("changeTab", index);
    }
  }
};
</script>

<style lang="stylus" scoped>
.tabs-component {
  .tab-wrapper {
    border: 1px solid #333;
    border-radius: 5px;
    display: flex;

    .tab {
      padding: 8px;
      text-align: center;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.3);
      list-style: none;
      flex: 1;

      &.on {
        background: #333;
        color: #fff;
      }
    }
  }
}
</style>

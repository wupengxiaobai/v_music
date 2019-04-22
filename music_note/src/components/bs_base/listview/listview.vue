<template>
  <scroll
    class="listview"
    ref="listView"
    :data="data"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="scroll"
  >
    <!-- 列表 -->
    <ul>
      <li v-for="(group,index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li
            v-for="(item, itemIndex) in group.items"
            :key="itemIndex"
            class="list-group-item"
            @click="selectItem(item)"
          >
            <img v-if="item.avatar" class="avatar" v-lazy="item.avatar" alt>
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 快速导航 -->
    <div class="list-shortcut" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li
          class="item"
          :class="{'active':currentShotcut == shortIndex}"
          v-for="(short,shortIndex) in shortcutList"
          :key="shortIndex"
          :data-index="shortIndex"
          @touchstart="onShortcutTouchStart"
        >{{ short }}</li>
      </ul>
    </div>
    <!-- 吸顶元素 -->
    <div class="list-fixed" ref="fixed" v-if="fiexedTitle">
      <h2 class="fixed-title">{{ fiexedTitle }}</h2>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/bs_base/scroll/scroll.vue";
import { getData } from "common/js/dom.js";
//  快速导航项高度
const SHORTCUT_HEIGHT = 18;
//  标题高度
const TITLE_HEIGHT = 30;

export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentShotcut: 0, //  高亮索引
      scrollY: -1, //  联动监听滚动高度
      diff: 0 // 吸顶区块的滚动位置差
    };
  },
  methods: {
    refresh() {
      this.$refs.listView.refresh();
    },
    //   事件派发给外部, 传递当前点击的元素
    selectItem(item) {
      this.$emit("selectItem", item);
    },
    //   点击滚动至位置
    onShortcutTouchStart(e) {
      //  获取当前节点的data-index值
      let currentIndex = getData(e.target, "index");
      //  保存当前索引与move事件对比计算差别个数
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.currentIndex = currentIndex;
      //   滚动到指定节点位置
      this._scrollTo(currentIndex);
    },
    // 滑动至位置
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0];
      //   计算偏移索引个数
      this.touch.y2 = firstTouch.pageY;
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / SHORTCUT_HEIGHT);
      //   计算目标索引位置
      let currentIndex = parseInt(this.touch.currentIndex) + delta;
      this._scrollTo(currentIndex);
    },
    // 滚动事件: scroll组件根据时机派发该事件执行
    scroll(pos) {
      this.scrollY = pos.y;
    },
    // 滚动到指定节点位置
    _scrollTo(index) {
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      //  指定scroll组件滚动到某位置
      this.$refs.listView &&
        this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0);
    },
    // 计算 list-group 的高度集合数组
    _computedHeight() {
      this.listHeight = [];
      let list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  computed: {
    //   快速导航数据构建
    shortcutList() {
      return this.data.map(group => group.title.substring(0, 1));
    },
    fiexedTitle() {
      if (this.scrollY > 0) {
        return "";
      }
      return this.data[this.currentShotcut]
        ? this.data[this.currentShotcut].title
        : "";
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._computedHeight();
      }, 20);
    },
    // 滚动高度监听
    scrollY(newY) {
      const listHeight = this.listHeight;
      // 滚动到顶部, newY > 0
      if (newY > 0) {
        this.currentShotcut = 0;
        return;
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentShotcut = i;
          //   吸顶容器需要： 求差值
          this.diff = height2 + newY;
          return;
        }
      }
      //  滚动到底部, 且 -newY 大于最后一个元素的上限
      this.currentShotcut = listHeight.length - 2;
    },
    // 吸顶高度差监听
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.diff &&
        (this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`);
    },
    listHeight(newA) {
      console.log(newA);
    }
  },
  components: {
    Scroll
  },
  created() {
    this.touch = {};
    this.listHeight = [];
    this.listenScroll = true;
    this.probeType = 3;
    // 初始化, 计算高度. 数据变化也会进行重新计算
    setTimeout(() => {
      this._computedHeight();
    }, 20);
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.listview {
  position: relative;
  height: 100%;
  overflow: hidden;
  z-index: 99;

  .list-group {
    height: 100%;
    overflow: hidden;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: 12px;
      color: $color-text-l;
      background: #333;
    }

    .list-group-item {
      padding: 20px 0 0 30px;
      list-style: none;
      display: flex;
      align-items: center;

      &:last-child {
        padding-bottom: 20px;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: 14px;
      }

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        vertical-align: top;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      list-style: none;
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: 12px;

      &.active {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    z-index: 1;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 12px;
    color: $color-text-l;
    background: $color-highlight-background;
  }
}
</style>

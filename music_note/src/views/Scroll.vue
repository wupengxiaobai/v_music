<template>
  <div class="scroll">
    <default
      :title="title"
      :content="content"
      :types="types"
    >
      <scroll-component
        :data="oneArray"
        class="list"
        :pullup="true"
        @scrollToEnd="loadMore"
      >
        <div>
          <div class="item" v-for="(item,index) in oneArray" :key="index">{{ index+1 }}</div>
        </div>
      </scroll-component>
    </default>
  </div>
</template>

<script>
import ScrollComponent from "components/bs_base/scroll/scroll.vue";
import Default from "./Default.vue";
export default {
  data() {
    return {
      title: "bs-封装scroll组件",
      oneArray: new Array(100)
    };
  },
  methods: {
    loadMore() {
      if (this.oneArray.length >= 300) {
        console.log("no more...");
        return;
      }
      console.log("loading more...");
      this.oneArray = this.oneArray.concat(new Array(100));
    }
  },
  created() {
    this.content = [
      {
        cont: "内容超出滚动"
      },
      {
        cont: "接受N个参数，N个事件外派"
      },
      {
        cont:
          "当前演示上拉加载加载 <br> <small> 通过传入 pullup 为 true --> 开启上拉加载 <br> 开启监听滚动到底部超出50，即向外派发scrollToEnd事件</small>"
      }
    ];
    this.types = [
      {
        desc: "基于better-scroll的滚动组件"
      }
    ];
  },
  components: {
    Default,
    ScrollComponent
  }
};
</script>


<style lang="stylus" scoped>
@import '~common/stylus/icon.styl';

.toptip-title {
  padding: 10px;
  text-align: center;
}

.list {
  height: 100%;
  overflow: hidden;
}
</style>


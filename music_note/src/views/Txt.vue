<template>
  <div class="txt">
    <back></back>
    <div class="title">
      <p v-html="title"></p>
    </div>
    <scroll :data="list" class="scroll">
      <div class="content">
        <ul v-if="list.length">
          <li class="list-item" v-for="(item,index) in list" :key="index">
            {{index+1}}.
            <span v-html="item.title"></span>
            <p v-for="(item,index) in item.desc" :key="index" v-html="item"></p>
            <pre v-if="item.pre" v-html="item.pre"></pre>
            <div v-if="item.content" v-html="item.content"></div>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/bs_base/scroll/scroll.vue";
import Back from "components/base/back/back.vue";
export default {
  props: {
    title: {
      type: String,
      default: "文案说明标题"
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Back,
    Scroll
  }
};
</script>

<style lang="stylus" scoped>
.txt {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #222;

  .title {
    height: 44px;
    line-height: 44px;
    font-weight: bold;
    padding: 0 10px;
  }

  .scroll {
    width: 100%;
    height: calc(100% - 44px);
    overflow: hidden;
  }

  .content {
    text-align: left;

    .list-item {
      padding: 5px;
      font-size: 12px;

      p {
        text-indent: 2em;
      }
    }
  }
}
</style>


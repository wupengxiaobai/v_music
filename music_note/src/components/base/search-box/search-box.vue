<template>
  <div class="serach-box">
    <span class="icon-search"></span>
    <input ref="input" v-model="query" type="text" :placeholder="placeholder">
    <span class="icon-dismiss" @click="claer" v-show="query"></span>
  </div>
</template>

<script>
import { debounce } from "common/js/util";
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手"
    },
    delayTime: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    //   主动失去焦点
    Inpblur() {
      this.$refs.input.blur();
    },
    //  设置query关键词
    setQuery(query) {
      this.query = query;
    },
    claer() {
      this.query = "";
    }
  },
  created() {
    this.$watch(
      "query",
      debounce(newQuery => {
        this.$emit("query", newQuery);
      }, this.delayTime)
    );
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/icon.styl';
@import '~common/stylus/variable.styl';

.serach-box {
  height: 40px;
  background: $color-highlight-background;
  border-radius: 6px;
  display: flex;
  align-items: center;

  span {
    width: 40px;
    text-align: center;
    font-size: 22px;
    color: $color-background;
  }

  input {
    flex: 1;
    height: 100%;
    border: 0;
    background: transparent;
    outline: none;
  }
}
</style>

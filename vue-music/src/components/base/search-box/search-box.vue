<template>
  <div class="serach-box">
    <span class="icon-search"></span>
    <input ref="inputW" v-model="query" type="text" :placeholder="placeholder">
    <span @click="claer" v-show="query" class="icon-dismiss"></span>
  </div>
</template>

<script>
import { debounce } from "common/js/util";
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手"
    }
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    //   失去焦点
    Inpblur() {
      this.$refs.inputW.blur();
      console.log("input 失去焦点执行... 键盘收起");
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
    this.$watch("query", debounce(newQuery => {
        this.$emit("query", newQuery);
      }, 200)
    );
  },
  watch: {
    /* query(newQuery) {
      this.$emit("query", newQuery);
    } */
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.serach-box {
  margin-bottom: 20px;
  height: 40px;
  width: 100%;
  background: $color-highlight-background;
  border-radius: 6px;
  display: flex;
  align-items: center;

  span {
    flex: 0 0 24px;
    margin: 0 10px;
    font-size: 24px;
    color: $color-background;
  }

  input {
    flex: 1;
    height: 100%;
    background: transparent;
    outline: none;
  }
}
</style>

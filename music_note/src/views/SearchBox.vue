<template>
  <div class="search-box">
    <default :title="title" :content="content" :types="types">
      <search-box-component @query="onQueryChange" :placeholder="placeholder"></search-box-component>
      <div slot="result">{{ this.query }}</div>
    </default>
  </div>
</template>

<script>
import SearchBoxComponent from "components/base/search-box/search-box.vue";
import Default from "./Default.vue";
export default {
  data() {
    return {
      title: "searchbox 组件",
      placeholder: "输入框的提示",
      query: ""
    };
  },
  methods: {
    onQueryChange(query) {
      //   console.log(query);
      this.query = query;
    }
  },
  created() {
    this.content = [
      {
        cont: "searchbox 组件输入框"
      },
      {
        cont: "主要工作是发送请求搜索key值相关数据"
      },
      {
        cont: "传递一个placeholder提示数据"
      },
      {
        cont: "内部监听并派发 输入数据变化 触发回调"
      }
    ];
    this.types = [{ desc: "搜索框组件" }];
  },
  components: {
    Default,
    SearchBoxComponent
  }
};
</script>


<style lang="stylus" scoped>
.search {
}
</style>


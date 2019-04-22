<template>
  <div class="loading">
    <default
      @handleClickComponent="handleClickComponent"
      :title="title"
      :content="content"
      :types="types"
    >
      <loading-component text="loading..." ref="loading"></loading-component>
    </default>
  </div>
</template>

<script>
import LoadingComponent from "components/base/loading/loading.vue";
import Default from "./Default.vue";
export default {
  data() {
    return {
      title: "加载 组件"
    };
  },
  methods: {
    handleClickComponent() {
      this.$refs.loading && this.$refs.loading.show();
      setTimeout(() => {
        this.$refs.loading.hide();
      }, 2000);
    }
  },
  created() {
    this.content = [
      {
        cont: "loading 组件"
      },
      {
        cont: "接受一个数据参数 <br> <small>text --> 说明文案 </small>"
      },
      {
        cont:
          "组件内部有两个方法 <br> <small> show --> loading显示 <br> hide --> loading隐藏<small>"
      }
    ];
    this.types = [
      {
        desc: "请求数据, 请点击我"
      }
    ];
  },
  components: {
    Default,
    LoadingComponent
  }
};
</script>


<style lang="stylus" scoped>
@import '~common/stylus/icon.styl';

.toptip-title {
  padding: 10px;
  text-align: center;
}
</style>


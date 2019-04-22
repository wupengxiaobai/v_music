<template>
  <div class="back">
    <default :title="title" :content="content" :types="types">
      <back-component></back-component>
    </default>
  </div>
</template>

<script>
import BackComponent from "components/base/back/back.vue";
import Default from "./Default.vue";
export default {
  data() {
    return {
      title: "back公共组件"
    };
  },
  created() {
    this.content = [
      {
        cont: "back组件是项目中最基本的组件"
      },
      {
        cont: '主要工作是控制"后退", 点击执行 "back" 的方法调用 $router.back()'
      },
      {
        cont: "左上角的按钮即是该组件的使用"
      }
    ];
    this.types = [
      {
        picLink: "adada",
        desc: "返回上级"
      }
    ];
  },
  components: {
    Default,
    BackComponent
  }
};
</script>


<style lang="stylus" scoped>
.back {
}
</style>


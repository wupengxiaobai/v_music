<template>
  <div class="request">
    <txt :title="title" :list="list"></txt>
  </div>
</template>

<script>
import Txt from "./Txt.vue";
export default {
  data() {
    return {
      title: "create-keyframe-animation依赖",
      list: [
        {
          title: "create-keyframe-animation说明",
          desc: ["js 实现c3动画"]
        },
        {
          title: "使用",
          desc: [
            "安装依赖包 npm install create-keyframe-animation -D",
            "文档 https://github.com/HenrikJoreteg/create-keyframe-animation"
          ],
          pre: ``
        }
      ]
    };
  },
  components: {
    Txt
  }
};
</script>


<style lang="stylus" scoped>
.request {
}
</style>


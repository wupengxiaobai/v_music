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
      title: "js-base64依赖",
      list: [
        {
          title: "js-base64说明",
          desc: ["编码相互转换"]
        },
        {
          title: "使用",
          desc: [
            "安装依赖包 npm install js-base64 -D",
            "文档 https://github.com/dankogai/js-base64"
          ],
          pre: `
// 引入 fastclick 依赖  
import fastclick from 'fastclick'
//  注册使用
fastclick.attach(document.body)
          `
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


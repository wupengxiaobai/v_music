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
      title: "fastclick依赖",
      list: [
        {
          title: "fastclick说明",
          desc: ["解决移动端的点击延迟300ms依赖"]
        },
        {
          title: "使用",
          desc: [
            "安装依赖包 npm install fastclick -D",
            "main.js 引入使用即可"
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


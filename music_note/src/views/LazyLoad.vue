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
      title: "图片资源lazyload",
      list: [
        {
          title: "lazyload说明",
          desc: ["图片懒加载"]
        },
        {
          title: "使用",
          desc: [
            "安装依赖包 npm install fastclick -D",
            "main.js 引入使用即可"
          ],
          pre: `
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    //  加载默认图标
    loading: require('common/image/default.png'),
    attempt: 1
}) 
/**
 * 使用 lazyl 代替src 引入资源链接
 * ***/
v-lazy="imgUrl" 代替 :src="imgUrl"
          `
        }
      ]
    };
  },
  created() {},
  components: {
    Txt
  }
};
</script>


<style lang="stylus" scoped>
.request {
}
</style>


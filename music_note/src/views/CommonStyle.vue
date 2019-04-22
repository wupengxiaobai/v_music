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
      title: "公共样式",
      list: [
        {
          title: "样式文件说明",
          desc: [
            "在src/common目录下一般会存在公共样式文件, 我们这里是stylus目录",
            "index.styl --> 我们在 APP.vue中直接引入 index.js, 覆盖到全局上",
            "base.styl --> 每个页面都会使用到的基础样式, 一般是在 index.js中被引入",
            "icon.styl --> icon样式文件, 里面是处理好的字体图标样式, 我们需要的时候单独引入",
            "mixin.styl --> mixin 混入样式, 里面可能是边框/图片/换行/等混入样式, 我们需要的时候单独引入",
            "reset.styl --> 重置样式, 重置web初始样式, 一般是在 index.js 中被引入",
            "variable.styl --> 变量定义的样式文件, 这里面定义了一些样式变量. 如 颜色/字体大小 等,方便我们在开发中使用, 一般在 index.js 中被引入"
          ]
        },
        {
          title: "其他说明",
          desc: [
            "我们在App.vue中引入index.styl, 直接重置web基础样式",
            "我们在某个 组件中使用icon图标, 需要引入icon.styl独立样式文件, 我们引入其",
            "我们在某个 组件中使用背景图片/换行/边框等, 需要引入mixin.styl, 我们引入混入公共样式文件"
          ],
          pre: `
\/\* App.vue 引入公共的样式 \*\/
\<style scoped lang="stylus"\>
\@import \'\~common/stylus/index.styl\'
\<\/style\>

\/\* xxx.vue 引入 mxin.styl 并调用\*\/
\<style scoped lang="stylus"\>
\@import \'\~common/stylus/mixin.styl\';
.avatar\{
\/\/  二三倍图背景 --> avatar@2x.png / avatar@3x.png
    bg-image\('avatar'\)
\}
\.txt\{
    \/\/  不换行mixin
    no-wrap\(\)
\}
\<\/style\>

`,
          content: `<br/>
          公共样式的独立, 有利于我们在开发中快捷灵活得使用css变量or方法来对页面的css块进行开发
          `
        }
      ]
    };
  },
  created() {
    this.types = [
      {
        picLink: "bs依赖使用注意",
        desc: "bs使用注意点"
      }
    ];
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


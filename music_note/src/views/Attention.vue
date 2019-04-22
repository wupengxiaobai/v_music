<template>
  <div class="attention">
    <txt :title="title" :list="list"></txt>
  </div>
</template>

<script>
import Txt from "./Txt.vue";
export default {
  data() {
    return {
      title: "better-scroll使用注意点",
      list: [
        {
          title: "初始化滚动条件",
          desc: ["内容大于外包容器"]
        },
        {
          title: "重绘时机",
          desc: [
            "重绘即重新计算高度, 避免高度变化导致滚动高度计算不正确",
            "时机1: 比如数据发生变化, 重绘.",
            "时机2: 比如动画结束之后, 重绘.",
            "时机3: 比如原本是display:none, 显示后需要重绘",
            "时机4: 比如原本是不存在的(v-if走了false), 存在后需要重绘"
          ],
          content: `<br/>
          better-scroll组件的refresh()方法可以重新计算高度并绘制
            如我们基于better-scroll封装的scroll组件:<br />
            a.接收一个props(data) 监听data变化, 延迟调用(20ms) scroll 的 refresh 方法<br />
            b.当存在 v-show 判断显示或隐藏, 不确定数据完全传输完毕, 我们延迟调用(100ms) refresh 方法<br />
            c.当组件内部存在 transition 动画时, 我们在动画执行完毕后(动画100ms, 我们设置scrolldelyTime时间120ms)调用 refresh  方法<br />
            d.当组件的高度发生变化, 我们也需要调用 refresh 重绘
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
.attention {
}
</style>


<template>
  <div class="toptip">
    <default
      @handleClickComponent="handleClickComponent"
      :title="title"
      :content="content"
      :types="types"
    >
      <top-tip-component class="toptip" ref="toptip" :delayTime="delayTime">
        <div class="toptip-title">
          <span class="icon-ok"></span>
          <span>点击了盒子</span>
        </div>
      </top-tip-component>
    </default>
  </div>
</template>

<script>
import TopTipComponent from "components/base/toptip/toptip.vue";
import Default from "./Default.vue";
export default {
  data() {
    return {
      title: "toptip公共组件",
      delayTime: 2000
    };
  },
  methods: {
    handleClickComponent() {
      this.$refs.toptip && this.$refs.toptip.show();
    }
  },
  created() {
    this.content = [
      {
        cont: "工作是头部动画展示内容修订的提示"
      },
      {
        cont: "接受一个参数 <br> <small>delayTime --> 隐藏延迟时间</small>"
      },
      {
        cont: "点击显示的toptip可马上隐藏"
      }
    ];
    this.types = [
      {
        desc: "头部提示, 请点击我"
      }
    ];
  },
  components: {
    Default,
    TopTipComponent
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


<template>
  <div class="confirm">
    <default
      @handleClickComponent="handleClickComponent"
      :title="title"
      :content="content"
      :types="types"
    >
      <confirm-component @cancel="cancel" @confirm="confirm" text="这是一个 confirm 组件" ref="confirm"></confirm-component>
    </default>
  </div>
</template>

<script>
import ConfirmComponent from "components/base/confirm/confirm.vue";
import Default from "./Default.vue";
export default {
  data() {
    return {
      title: "confirm组件",
      delayTime: 2000
    };
  },
  methods: {
    handleClickComponent() {
      this.$refs.confirm && this.$refs.confirm.show();
    },
    confirm() {
      console.log("这里是confirm组件确定回调");
    },
    cancel() {
      console.log("这里是confirm组件取消回调");
    }
  },
  created() {
    this.content = [
      {
        cont: "confirm组件"
      },
      {
        cont:
          "接受三个数据参数 <br> <small>text --> 提示文案 <br> confirmBtnText --> 确认按钮文案 <br> cancelBtnText --> 取消按钮文案</small>"
      },
      {
        cont:
          "组件向外派发两种事件 <br> <small> cancel --> 取消事件回调 <br> confirm --> 确认事件回调<small>"
      }
    ];
    this.types = [
      {
        desc: "询问提示, 请点击我"
      }
    ];
  },
  components: {
    Default,
    ConfirmComponent
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


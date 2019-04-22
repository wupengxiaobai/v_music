<template>
  <div class="tabs">
    <default :title="title" :content="content" :types="types">
      <tabs-component @changeTab="changeTab" :currentTabIndex="currentTabIndex" :tabsArr="tabsArr"></tabs-component>
      <div v-if="currentTabIndex===0">当前选中选项卡{{ currentTabIndex+1 }}</div>
      <div v-else>当前选中选项卡{{ currentTabIndex+1 }}</div>
    </default>
  </div>
</template>

<script>
import TabsComponent from "components/base/tabs/tabs.vue";
import Default from "./Default.vue";
export default {
  data() {
    return {
      title: "tabs公共组件",
      tabsArr: [
        {
          name: "选项1"
        },
        {
          name: "选项2"
        }
      ],
      currentTabIndex: 0
    };
  },
  methods: {
    changeTab(index) {
      this.currentTabIndex = index;
    }
  },
  created() {
    this.content = [
      {
        cont: "主要工作是控制内容展示"
      },
      {
        cont:
          "需要传递给组件的参数 <br> <small>currentTabIndex --> 指定选项卡高亮的索引</small>  <small>tabsArr --> 指定选项卡内容的数组对象</small>  "
      },
      {
        cont: "向外派发一个changeTab事件, 携带参数(当前选项索引) "
      }
    ];
    this.types = [
      {
        desc: "选项卡组件演示"
      }
    ];
  },
  components: {
    Default,
    TabsComponent
  }
};
</script>


<style lang="stylus" scoped>
.back {
}
</style>


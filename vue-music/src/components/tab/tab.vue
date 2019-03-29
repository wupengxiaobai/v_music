<template>
  <div class="tab">
    <router-link to="/singer">歌手</router-link>
    <router-link to>搜索</router-link>
    <router-link to>榜单</router-link>
    <router-link to>首页</router-link>
  </div>
</template>

<script>
export default {
  props: {
    tabData: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
</style>

<template>
  <div class="default">
    <back-component></back-component>
    <div class="description">
      <div class="title" v-html="title"></div>
      <div class="content">
        <p v-for="(item,index) in content" :key="index">
          <span>{{ index+1 + ' '}}</span>
          <span v-html="item.cont"></span>
        </p>
      </div>
    </div>
    <div class="main">
      <div
        class="img_txt_item"
        @click="handleClickComponent"
        v-for="(item,index) in types"
        :key="index"
      >
        <div class="component-wrapper">
          <slot></slot>
        </div>
        <div class="txt" v-html="item.desc"></div>
      </div>
      <slot name="result"></slot>
    </div>
  </div>
</template>

<script>
import BackComponent from "components/base/back/back.vue";
export default {
  props: {
    title: {
      type: String,
      default: "相关描述"
    },
    content: {
      type: Array,
      default() {
        return [];
      }
    },
    types: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    handleClickComponent() {
      this.$emit("handleClickComponent");
    }
  },
  components: {
    BackComponent
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.default {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: $color-background;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  &>div {
    border: 1px solid $color-text;
    margin: 10px;
  }
}

.description {
  flex: 0 0 300px;

  .title {
    font-weight: bold;
    margin: 10px 0;
  }

  .content {
    text-align: left;
    margin: 10px;
  }
}

.main {
  flex: 1;
  display: flex;
  flex-wrap: wrap;

  .img_txt_item {
    border: 1px solid $color-text;
    // min-width: 250px;
    // max-width: 375px;
    width:350px;
    margin: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    .component-wrapper {
      position: relative;
      width: 100%;
      min-height:270px;
      max-height: 350px;
      overflow: hidden;
      width: 100%;
    }

    .txt {
      margin: 10px 0;
    }
  }
}
</style>

<template>
  <div class="search">
    <div>
      <div class="serach-box">
        <span class="icon-search"></span>
        <input type="text" placeholder="搜索歌词/歌手">
      </div>
      <div class="history">
        <div class="title">搜索历史</div>
        <div class="list">
          <div class="item" v-for="(item,index) in 19" :key="index">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.search {
  padding: 20px;

  .serach-box {
    margin-bottom: 20px;
    height: 40px;
    width: 100%;
    background: $color-highlight-background;
    border-radius: 6px;
    display: flex;
    align-items: center;

    span {
      flex: 0 0 24px;
      margin: 0 10px;
      font-size: 24px;
      color: $color-background;
    }

    input {
      flex: 1;
      height: 100%;
      background: transparent;
      outline: none;
    }
  }

  .history {
    .title {
      margin-bottom: 20px;
      font-size: 14px;
      color: $color-text-l;
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;

      .item {
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: #333;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>

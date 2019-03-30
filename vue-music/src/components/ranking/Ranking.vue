<template>
  <div class="ranking">
    <div class="list">
      <div class="item" v-for="(item,index) in 6" :key="index">
        <div class="img">
          <img src="http://y.gtimg.cn/music/photo_new/T003R300x300M000004QyERN1CmImq.jpg" alt>
        </div>
        <div class="rank-wrapper">
          <div class="rank-item" v-for="(rank,rankIndex) in 3" :key="rankIndex">
            <span>{{ rankIndex+1 }}</span>
            <span>花田错 (Live)-吴青峰</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

.ranking {
  .list {
    margin: 0 20px;

    .item {
      margin-top: 20px;
      display: flex;

      .img {
        flex: 0 0 100px;
        height: 100px;
        width: 100px;

        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }

      .rank-wrapper {
        flex: 1;
        padding: 11px 20px;
        font-size: 12px;
        color: $color-text-d;
        background: $color-highlight-background;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .rank-item {
          span:nth-of-type(1) {
            margin-right: 3px;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="recommend">
    <scroll ref="scroll" :data="recommendData" class="recommend-content">
      <div>
        <!-- slider组件 -->
        <slider v-if="sliderData.length">
          <div class="slider-item" v-for="(sliderItem,imgIndex) in sliderData" :key="imgIndex">
            <!-- :href="sliderItem.linkUrl" -->
            <a href="javascript:;">
              <img @load.once="imgLoad" :src="sliderItem.picUrl" alt>
            </a>
          </div>
        </slider>
        <div class="title">热门歌单推荐</div>
        <!-- loading 组件 -->
        <loading v-show="!recommendData.length"></loading>
        <div class="list" v-if="recommendData.length">
          <div class="item" v-for="(item, index) in recommendData" :key="index">
            <div class="avatar">
              <img v-lazy="item.imgurl" alt>
            </div>
            <div class="info">
              <div class="name" v-html="item.creator.name"></div>
              <div class="desc" v-html="item.dissname"></div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getSlider, getRecommend } from "api/recommend";
import { ERR_OK } from "api/config";
import Slider from "components/base/slider/slider.vue";
import Scroll from "components/base/scroll/scroll.vue";
import Loading from "components/base/loading/loading.vue";
export default {
  data() {
    return {
      sliderData: [], //  轮播数据
      recommendData: [], // 推荐数据
      checkedImgLoad: false
    };
  },
  methods: {
    //   请求轮播数据
    getSliderData() {
      getSlider().then(res => {
        if (res.code === ERR_OK) {
          this.sliderData = res.data.slider;
        }
      });
    },
    // 请求推荐榜单数据
    getRecommendData() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          //   setTimeout(() => {
          this.recommendData = res.data.list;
          //   }, 2000);
        }
      });
    },
    //  当轮播一条数据请求完成 => 高度成功被渲染, 我们执行better-scroll组件的refresh方法, 重新计算滚动的高度
    imgLoad() {
      if (!this.checkedImgLoad) {
        this.$refs.scroll.refresh();
        this.checkedImgLoad = true;
      }
    }
  },
  created() {
    this.getSliderData();
    this.getRecommendData();
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

.recommend {
  position: relative;

  .recommend-content {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .title {
      height: 65px;
      line-height: 65px;
      text-align: center;
      font-size: 14px;
      color: $color-theme;
    }

    .list {
      padding: 0 20px;

      .item {
        padding-bottom: 20px;
        display: flex;

        .avatar {
          width: 60px;
          height: 60px;
          margin-right: 20px;

          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        }

        .info {
          flex: 1;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .name {
            color: #fff;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }
  }
}
</style>

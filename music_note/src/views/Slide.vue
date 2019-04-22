<template>
  <div>
    <default :title="title" :content="content" :types="types">
      <slider-component v-if="slideArr.length">
        <div class="slider-item" v-for="(sliderItem,imgIndex) in slideArr" :key="imgIndex">
          <a href="javascript:;">
            <img :src="sliderItem.pic" alt>
          </a>
        </div>
      </slider-component>
    </default>
  </div>
</template>

<script>
import SliderComponent from "components/bs_base/slide/slide.vue";
import Default from "./Default.vue";
export default {
  data() {
    return {
      title: "bs-封装slide组件",
      slideArr: [
        {
          pic:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555694752710&di=97c219de5565bf5d0b92efa07e044353&imgtype=0&src=http%3A%2F%2Fimg5.xiazaizhijia.com%2Fwalls%2F20160713%2Fmiddle_49caaae79579886.jpg"
        },
        {
          pic:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555694752710&di=97c219de5565bf5d0b92efa07e044353&imgtype=0&src=http%3A%2F%2Fimg5.xiazaizhijia.com%2Fwalls%2F20160713%2Fmiddle_49caaae79579886.jpg"
        },
        {
          pic:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555694752710&di=97c219de5565bf5d0b92efa07e044353&imgtype=0&src=http%3A%2F%2Fimg5.xiazaizhijia.com%2Fwalls%2F20160713%2Fmiddle_49caaae79579886.jpg"
        },
        {
          pic:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555694752710&di=97c219de5565bf5d0b92efa07e044353&imgtype=0&src=http%3A%2F%2Fimg5.xiazaizhijia.com%2Fwalls%2F20160713%2Fmiddle_49caaae79579886.jpg"
        },
        {
          pic:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555694752710&di=97c219de5565bf5d0b92efa07e044353&imgtype=0&src=http%3A%2F%2Fimg5.xiazaizhijia.com%2Fwalls%2F20160713%2Fmiddle_49caaae79579886.jpg"
        }
      ]
    };
  },
  methods: {},
  created() {
    this.content = [
      {
        cont: "基础轮播组件"
      },
      {
        cont:
          "接收轮播初始化所需的数据 <br> <small>loop --> 是否循环 <br> autoPlay --> 是否自动轮播 <br> interval --> 切换时间</small>"
      },
      {
        cont: "插槽 往组件中插入(slide-item)项组成轮播"
      }
    ];
    this.types = [
      {
        desc: "基于better-scroll组件封装的轮播"
      }
    ];
    this.types = [
      {
        desc: "基于better-scroll组件封装的轮播"
      }
    ];
  },
  components: {
    Default,
    SliderComponent
  }
};
</script>


<style lang="stylus" scoped></style>


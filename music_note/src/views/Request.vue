<template>
  <div class="request">
    <txt :title="title" :list="list"></txt>
  </div>
</template>

<script>
import Txt from "./Txt.vue";
export default {
  data() {
    return {
      title: "请求模块独立",
      list: [
        {
          title: "何为请求独立?",
          desc: [
            "将所有请求相关的操作封装在一个独立文件下(api/)",
            "api目录下应该要求有一个配置文件, 关于请求的配置 config.js, 如 ERR_OK 的配置等",
            "页面请求文件独立, 一个页面一个文件, 如关于 recommend 页面的请求写在 recommend.js"
          ]
        },
        {
          title: "栗子说明",
          desc: [
            "我们需要请求一个 '推荐'数据接口, 我们在api文件目录下单独创建一个 recommend.js 文件, 编写获取推荐歌单的方法, 并暴露该方法. 组件中引入该方法, 直接调用其即可获取数据"
          ],
          pre:`
/* api/recommend.js 推荐歌单数据获取 */
export async function getRecommend() {
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    rnd: Math.random(),
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 19
  })

  let ret = await axios.get('/getRocommend', {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })

  return ret
}

/*recommend.vue 调用获取数据*/
getRecommend() {
    getRecommend().then(res => {
    if (res.code === ERR_OK) {
        this.recommendData = res.data.recommend;
    }
    });
},
`,
          content: `<br/>
          请求模块独立出来的优势<br/>
            如此我们可以更加方便的管理请求, 维护(接口修改等)时可以到达事半功倍, 不用零散地去寻找单独的组件.<br/>
            在组件内部直接调用该方法, 只需要引入使用, 避免组件内部写入接口调用逻辑, 组件逻辑看似可以达到更加简介.<br/>
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
.request {
}
</style>


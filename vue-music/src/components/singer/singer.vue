<template>
  <div class="singer">
    <loading v-if="!singersData.length"></loading>
    <list-view :data="singersData"></list-view>
  </div>
</template>

<script>
import listView from "components/base/listview/listview.vue";
import Loading from "components/base/loading/loading.vue";
import { getSinger } from "api/singer.js";
import { ERR_OK } from "api/config";
import Singer from "common/js/singer";
const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;

export default {
  data() {
    return {
      singersData: []
    };
  },
  methods: {
    //  获取数据
    _getSingerData() {
      getSinger().then(res => {
        if (res.code === ERR_OK) {
          this.singersData = this._normalizeSinger(res.data.list);
        }
      });
    },
    //  处理数据为所需数据
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        //  构造热门数据, 默认前十条热门
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }
        //  构造字母数据
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });
      //   对数据作有序排序处理
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    }
  },
  created() {
    this._getSingerData();
  },
  components: {
    listView,
    Loading
  }
};
</script>

<style lang="stylus" scoped>
.singer {
  flex: 1;
}
</style>

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
      title: "公共js",
      list: [
        {
          title: "js文件说明",
          desc: [
            "在src/common目录下一般会存在公共js文件, 我们把可以共用的js逻辑都写在该目录下",
            "dom.js --> dom操作的js文件",
            "util.js --> 工具函数js文件",
            "cache.js --> 本地存储操作的js文件",
            "mixin.js --> mixin 混入js, 各组件中可复用的js逻辑可以在mixin.js下定义, 组件中引入即可",
            "config.js --> 一些固定变量的配置",
            "variable. --> 变量定义的样式文件, 这里面定义了一些样式变量. 如 颜色/字体大小 等,方便我们在开发中使用, 一般在 index.js 中被引入",
            "song.js --> 定义song类的一些属性， 包括基础的独有的name，id, mid 等等，以及可复用的方法getLyric. 调用该类实例化可以获得一个song的对象，相比普通的对象拓展性更强大"
          ]
        },
        {
          title: "举例说明",
          desc: [
            "dom.js 中的简单给dom添加class类名",
            "util.js 中的一个debounce防抖方法",
            "cache.js 中的其中的设置歌曲收藏的缓存",
            "mxin.js 中的一个playlist（根据列表中是否有数据提示设置页面的bottom值） mixins方法"
          ],
          pre: `
/*dom操作的一个给dom添加类名的方法*/
hasClass(el, className){
    let reg = new RegExp('^|\\s',className,'\\s|$')
    return reg.test(el.className)
}
export function addClass(el, className){
    if(hasClass(el,className)){
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}
/**
 * 必要的dom操作时使用
 * ***/

/*util.js的debounce防抖函数*/
export debounce(func, delayTime){
    let timer;
    return function(...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            func.apply(this, args)
        },delayTime)
    }
}
/**
 * 用在了输入框内容发生改变监听调用 debounce 进行防抖的处理
 * ***/

/*cache.js的一个操作本地收藏的函数，返回结果*/
import storage from 'good-storage'
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 1000
//  插入数据到数组: 插入到第一条位置，超出长度删除最后一个
function insertArray(arr, val, compare, maxLength){
    let index = arr.findIndex(compare)
    if(index===0){
        return
    }
    if(index>0){
        arr.splice(index,1)
    }
    arr.unshift(val)
    if(maxLength && arr.length > maxLength){
        arr.pop()
    }
    return arr
}
//  删除数组中一条记录
function deleteFromArray(arr, compare){
    let index = arr.findIndex(compare)
    if(index>-1){
        arr.slice(index,1)
    }
    return arr
}
//  保存收藏到本地并返回
export saveFavorite = function(song){
    let favoritelist = storage.get(FAVORITE_KEY, [])
    insertArray(favoritelist, song, (item) => {
        return item.id === song.id
    }, FAVORITE_MAX_LENGTH)
    storage.set(FAVORITE_KEY, favoritelist)
    return favoritelist
}
//  删除本地收藏的一曲
export deleteFromFavorite(song){
    let favoritelist = storage.get(FAVORITE_KEY, [])
    deleteFromArray(favoritelist, item =>  item.id === song.id)
    storage.set(FAVORITE_KEY, favoritelist)
    return favoritelist
}
//  获取本地收藏的记录
export loadFavorite = function(){
    return storage(FAVORITE_KEY, [])
}
/**
 * 在 store 中的 actions 中编写本地修改vuex数据并操作本地的方法引入以上 cache.js 中的方法, 方便操作
 * ***/

/*mixins.js的一个提示编写某函数的设置高度的mixins*/
export playlistMixin = {
  computed: {
    ...mapGetters(["playlist"])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  },
}
/**
 * 在组件中引入 playlistMixin, 并设置 mixins:[playlistMixin] 编写handlePlaylist方法执行设置页面高度即可
 * ***/
methods: {
    handlePlaylist(list){
        if(list.length>0){
            this.$refs.wraper.bottom = '60px'
            this.$refs.scroll.refresh()
        }
    }
}
          `,
          content: `<br/>
公共js的独立：<br/>
引入即用，有利组件内部methods的简洁和针对性<br/>

          `
        }
      ]
    };
  },
  created() {},
  components: {
    Txt
  }
};
</script>


<style lang="stylus" scoped>
.request {
}
</style>


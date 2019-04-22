<template>
  <div id="app">
    <div id="nav">
      <h4>无依赖常用非业务组件</h4>
      <router-link to="/back">back组件</router-link>|
      <router-link to="/tabs">tabs组件</router-link>|
      <router-link to="/toptip">toptip组件</router-link>|
      <router-link to="/confirm">confirm组件</router-link>|
      <router-link to="/loading">loading组件</router-link>|
      <router-link to="/searchbox">searchBox组件</router-link>|
      <br>
      <h4>基于better-scroll的常用非业务组件</h4>
      <router-link to="/scroll">滚动组件</router-link>|
      <router-link to="/slide">轮播组件</router-link>|
      <router-link to="/listview">联动组件</router-link>|
      <router-link to="/attention">bs使用注意</router-link>|
      <br>
      <h4>其他独立模块</h4>
      <router-link to="/api">请求独立</router-link>|
      <router-link to="/commonstyle">公共样式</router-link>|
      <router-link to="/commonjs">公共js</router-link>|
      <h4>常用依赖</h4>
      <router-link to="/fastclick">fastclick依赖的使用</router-link>|
      <router-link to="/lazyload">lazyLoad依赖的使用</router-link>|
      <router-link to="/jsBase64">jsBase64依赖的使用</router-link>|
      <router-link to="/createanimationkeyframe">create-keyframe-animation 的使用</router-link>|



      
    </div>
    <router-view/>
  </div>
</template>
<style lang="stylus">
* {
  margin: 0;
  padding: 0;
  color: #fff;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  h4 {
    padding: 20px;
    color: #f40;
  }
}
</style>

<template>
  <div class="container">
    <ul class="navBar">
      <a href="javascript:;">
        <router-link to="/tuijian" tag="li" class="myactive"
          >个性推荐</router-link
        ></a
      >
      <a href="javascript:;">
        <router-link to="/dingzhi" tag="li" class="myactive"
          >专属定制</router-link
        ></a
      >
      <a href="javascript:;">
        <router-link to="/gedan" tag="li" class="myactive">歌单</router-link></a
      >
      <a href="javascript:;">
        <router-link to="/newsongs" tag="li" class="myactive"
          >最新音乐</router-link
        ></a
      >
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      songList: [],
      navContent: ["个性推荐", "专属定制", "歌单", "最新音乐"],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.container {
  // border: 1px solid black;
  .navBar {
    margin-left: -60px;
    display: flex;
    a {
      display: flex;
      color: #000;
      font-weight: bold;
      li {
        margin: 0 20px;
        border: 2px solid transparent;
        // padding: 2px;
      }
      li:hover {
        border-bottom: 2px solid #fb2856;
      }
    }
  }
}
</style>

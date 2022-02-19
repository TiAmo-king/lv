<template>
  <div class="container">
    <ul class="navBar">
      <a href="javascript:;">
        <router-link to="/vedio" tag="li" class="myactive">视频</router-link></a
      >
      <a href="javascript:;">
        <router-link to="/mv" tag="li" class="myactive"> MV </router-link></a
      >
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      property: "value",
    };
  },
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

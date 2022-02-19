<template>
  <div>
    <div class="nav">
      <div class="left">
        <router-link to="mv" @click.native="flushCom">最新MV</router-link>
      </div>
      <div class="ringht">
        <router-link
          v-for="(item, i) in tagName"
          :key="i"
          :to="{ path: 'mv', query: { name: item } }"
          @click.native="flushCom"
          >{{ item }}</router-link
        >
      </div>
    </div>
    <keep-alive v-if="upd">
      <video-list></video-list>
    </keep-alive>
  </div>
</template>
<script>
import videoList from "./command.vue";
export default {
  name: "mv",
  data() {
    return {
      tagName: ["内地", "港台", "欧美", "日本", "韩国"],
      upd: true,
    };
  },
  created() {},
  methods: {
    flushCom() {
      this.upd = false;
      this.$nextTick(function () {
        this.upd = true;
      });
    },
  },
  components: {
    videoList,
  },
};
</script>
<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  .left {
    width: 100px;
    height: 30px;
    border: 1px solid gainsboro;
    border-radius: 20px;
    a {
      color: black;
      display: block;
      padding: 5px;
      margin-left: 15px;
      font-size: 14px;
    }
  }
  .ringht {
    a {
      color: gray;
      font-size: 12px;
      margin: 10px;
    }
    a:hover {
      color: black;
    }
  }
}
</style>

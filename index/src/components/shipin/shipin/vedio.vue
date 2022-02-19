<template>
  <div>
    <div class="nav">
      <div class="left">
        <router-link to="vedio" @click.native="flushCom">全部视频</router-link>
      </div>
      <div class="ringht">
        <router-link
          :to="{ path: 'vedio', query: { id: this.tagsId[0].id } }"
          @click.native="flushCom"
          >{{ tagsId[0].name }}</router-link
        >
        <router-link
          :to="{ path: 'vedio', query: { id: this.tagsId[1].id } }"
          @click.native="flushCom"
          >{{ tagsId[1].name }}</router-link
        >
        <router-link
          :to="{ path: 'vedio', query: { id: this.tagsId[2].id } }"
          @click.native="flushCom"
          >{{ tagsId[2].name }}</router-link
        >
        <router-link
          :to="{ path: 'vedio', query: { id: this.tagsId[3].id } }"
          @click.native="flushCom"
          >{{ tagsId[3].name }}</router-link
        >
        <router-link
          :to="{ path: 'vedio', query: { id: this.tagsId[4].id } }"
          @click.native="flushCom"
          >{{ tagsId[4].name }}</router-link
        >
        <router-link
          :to="{ path: 'vedio', query: { id: this.tagsId[5].id } }"
          @click.native="flushCom"
          >{{ tagsId[5].name }}</router-link
        >
        <router-link
          :to="{ path: 'vedio', query: { id: this.tagsId[6].id } }"
          @click.native="flushCom"
          >{{ tagsId[6].name }}</router-link
        >
        <router-link
          :to="{ path: 'vedio', query: { id: this.tagsId[7].id } }"
          @click.native="flushCom"
          >{{ tagsId[7].name }}</router-link
        >
        <router-link
          :to="{ path: 'vedio', query: { id: this.tagsId[8].id } }"
          @click.native="flushCom"
          >{{ tagsId[8].name }}</router-link
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
  name: "vedio",
  data() {
    return {
      upd: true,
      tagsId: [
        { id: 0 },
        { id: 0 },
        { id: 0 },
        { id: 0 },
        { id: 0 },
        { id: 0 },
        { id: 0 },
        { id: 0 },
        { id: 0 },
      ],
    };
  },
  created() {
    this.getTag();
  },
  components: {
    videoList,
  },
  methods: {
    getTag() {
      this.$http.get("/video/group/list").then((res) => {
        this.tagsId = res.data.data;
      });
    },
    flushCom() {
      (this.upd = false),
        this.$nextTick(function () {
          this.upd = true;
        });
    },
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

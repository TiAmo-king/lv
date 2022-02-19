<template>
  <div>
    <ul class="gedan">
      <li
        v-for="(item, index) in songList"
        :key="index"
        @click="songListDetails(item)"
      >
        <div class="music_box">
          <a href="javascript:;" class="img_a" @onmouseover="bg()">
            <img v-lazy="item.coverImgUrl" alt="" srcset="" />
          </a>
          <a href="javascript:;" class="i_a">
            <i class="iconfont icon-zanting"></i>
          </a>
          <div class="content">{{ item.name }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      songList: [],
    };
  },
  created() {
    this.getSongList();
  },
  methods: {
    // 歌曲列表
    async getSongList() {
      await this.$http.get("/top/playlist").then((res) => {
        this.songList = res.data.playlists;
        console.log(res);
      });
    },
    songListDetails(item) {
      this.$router.push({ path: "songListDetails", query: { item: item } });
    },
  },
};
</script>
<style lang="less" scoped>
.gedan {
  margin: 20px 20px;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 250px;
    height: 270px;
    justify-content: center;
    margin: 10px 20px 10px 20px;
    .img_a {
      color: black;
      img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
      }
    }
    .music_box {
      position: relative;
      .i_a {
        display: none;
        position: absolute;
        left: 80px;
        top: 80px;
        font-size: 50px;
      }
      .content {
        width: 205px;
      }
    }
  }
}
</style>

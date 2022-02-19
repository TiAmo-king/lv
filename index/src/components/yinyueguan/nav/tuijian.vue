<template>
  <div>
    <template>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in bannerImg" :key="index">
          <a href="javascript:;"
            ><img v-lazy="item.imageUrl" alt="" height="260px"
          /></a>
        </el-carousel-item>
      </el-carousel>
    </template>
    <div>
      <router-link to="/gedan" style="color: black">
        <strong>推荐歌单></strong>
      </router-link>
    </div>
    <div>
      <ul class="gedan">
        <li
          v-for="(item, index) in songList"
          :key="index"
          @click="songListDetails(item)"
        >
          <div class="music_box">
            <a href="javascript:;" class="img_a">
              <img v-lazy="item.picUrl" alt="" srcset="" />
            </a>
            <a href="javascript:;" class="i_a">
              <i class="iconfont icon-zanting"></i>
            </a>
            <div class="content">{{ item.name }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bannerImg: [],
      songList: [],
    };
  },
  created() {
    this.getPersonalized();
    this.getSongList();
  },
  methods: {
    //   推荐歌单
    async getSongList() {
      await this.$http.get("/personalized").then((res) => {
        this.songList = res.data.result;
        console.log(res.data.result);
      });
    },
    // 获取轮播图
    async getPersonalized() {
      await this.$http.get("/banner").then((res) => {
        // console.log(res.data);
        this.bannerImg = res.data.banners;
      });
    },
    songListDetails(item) {
      this.$router.push({ path: "songListDetails", query: { item: item } });
    },
  },
};
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel {
  width: 1360px;
  margin: 0 85px;
}
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

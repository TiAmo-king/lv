<template>
  <div>
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="(item, i) in bannerInfo" :key="i">
        <div class="banner">
          <el-tag class="tagsty" type="danger">{{ item.typeTitle }}</el-tag>
          <img v-lazy="item.pic" alt="" height="300px" width="100%" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bannerInfo: [],
    };
  },
  created() {
    this.getBnnerInfo();
  },
  methods: {
    async getBnnerInfo() {
      await this.$http.post("/dj/banner").then((res) => {
        this.bannerInfo = res.data.data;
        console.log(res.data);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.el-carousel__item img {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.banner {
  position: relative;
  .tagsty {
    display: block;
    position: absolute;
    z-index: 99;
    right: 0;
    bottom: 20px;
  }
}
</style>

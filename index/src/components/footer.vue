<template>
  <div>
    <!-- <div class="footer">
      <div class="left">
        <div class="img_box">
          <img
            v-if="this.$store.state.rowData.artists"
            v-lazy="this.$store.state.rowData.artists[0].img1v1Url"
            alt=""
          />
          <img
            v-else-if="this.$store.state.rowData.al"
            v-lazy="this.$store.state.rowData.al.picUrl"
            alt=""
          />
          <img v-else v-lazy="this.$store.state.rowData.blurCoverUrl" alt="" />
        </div>
        <div class="arname">
          <div class="name">
            <span>
              {{ this.$store.state.rowData.name }}
            </span>
          </div>
          <div class="ar">
            <span v-if="this.$store.state.rowData.artists">
              {{ this.$store.state.rowData.artists | ararr }}
            </span>
            <span v-else-if="this.$store.state.rowData.dj">
              {{ this.$store.state.rowData.dj.nickname }}
            </span>
            <span v-else-if="this.$store.state.rowData.ar">
              {{ this.$store.state.rowData.ar | ararr }}
            </span>
            <span v-else></span>
          </div>
        </div>
      </div>
      <div class="center">
        <audio :src="this.$store.state.songUrl" controls autoplay></audio>
      </div>
      <div class="right">
        <i class="iconfont icon-bofangduilie"></i>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.footer {
  display: flex;
  align-items: center;
  bottom: 0px;
  width: 1904px;
  height: 100px;
  background: #f75555;
  .left {
    flex: 2;
    display: flex;
    border: 1px solid#000;
    margin: 10px;
    .img_box {
      overflow: hidden;
      width: 80px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      img {
        height: 80px;
      }
    }
    .arname {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      justify-content: center;
      margin: 10px;
      .name {
        font-size: 16px;
      }
      .ar {
        margin-top: 10px;
        font-size: 12px;
      }
    }
  }
  .center {
    flex: 5;
    display: flex;
    justify-content: center;
  }
  .right {
    flex: 2;
    margin: 10px;
    border: 1px solid#000;
  }
}
</style>

<template>
  <div>
    <div class="bgimg" v-bind:style="bgStyle">
      <div class="jpOut">
        <img v-lazy="src" alt="" />
        <div class="content">
          <div class="contentStyle">
            <span> 精品歌单 </span>
          </div>
          <br />
          <div>
            {{ name }}
          </div>
          <br />
          <div>
            <!-- {{jpGedanList[0]}} -->
            {{ copywriter }}
          </div>
        </div>
      </div>
    </div>
    <gedanlist></gedanlist>
  </div>
</template>
<script>
import gedanlist from "../gedan/gedanInfo/gedanInfo.vue";
export default {
  data() {
    return {
      jpGedanList: [],
      src: "",
      name: "",
      copywriter: "",
      baImg: "",
      bgStyle: {
        // background:'url('+this.bgImg+')',
        width: "763px",
        // backgroundColor:'red'
      },
      gdTypeList: [],
      showAllTypeVisible: false,
    };
  },
  created() {
    this.getJingPin();
    this.getGDType();
  },
  methods: {
    // 精品歌单
    async getJingPin() {
      const { data: res } = await this.$http.get("/top/playlist/highquality");
      console.log(res.playlists);
      this.jpGedanList = res.playlists;
      this.src = res.playlists[0].coverImgUrl;
      this.name = res.playlists[0].name;
      this.copywriter = res.playlists[0].copywriter;
      this.bgImg = res.playlists[0].creator.backgroundUrl;
      console.log(this.bgImg);
    },
    // 歌单分类
    async getGDType() {
      const { data: res } = await this.$http.get("/playlist/catlist");
      this.gdTypeList = res;
      console.log(res);
    },
    bg() {
      document.getElementById("i_a").style.display = "block";
    },
    gedanInfo() {
      console.log(1);
      this.$router.push("/gedanInfo");
    },
  },
  components: {
    gedanlist,
  },
};
</script>
<style lang="less" scoped>
.bgimg {
  width: 600px;
  margin: 0 60px;
  .jpOut {
    display: flex;

    img {
      width: 200px;
      height: 200px;
      border-radius: 10px;
      margin: 0 20px;
    }
    .content {
      display: flex;
      flex-direction: column;
      .contentStyle {
        width: 100px;
        height: 30px;
        padding-top: 10px;
        border: 1px orange solid;
        border-radius: 30%;
        span {
          display: block;
          text-align: center;
          // padding-top: -2px;
        }
      }
    }
  }
}
.allTypeGUI {
  // display: block;
  position: absolute;
  border: 1px solid red;
  height: 600px;
  width: 750px;
  .ulOut {
    display: flex;
    flex-direction: column;
    li {
      .ulIn {
        display: flex;
        flex-direction: row;
        li {
          margin: 0 10px;
        }
      }
    }
  }
}
</style>

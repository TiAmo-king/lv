<template>
  <div>
    <h1>你的雷达歌单</h1>
    <span style="font-size: 12px; color: grey"
      >根据您的红心收藏为您推荐更多的宝藏歌曲</span
    >
    <div>
      <div class="btn_box">
        <el-button size="mini" class="btn_style" ref="btn1" @click="left">
          <i class="el-icon-arrow-left"></i>
        </el-button>
        <el-button size="mini" class="btn_style" ref="btn1" @click="right">
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </div>
      <ul class="gedan">
        <li
          @click="songListDetails(item)"
          v-for="(item, index) in songList"
          :key="index"
          class="li_div"
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
    <h1>午间音乐漫游时刻</h1>
    <ul class="gedan1">
      <li
        @click="songListDetails(item)"
        v-for="(item, index) in songList"
        :key="index"
        class="li_div"
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
</template>
<script>
export default {
  data() {
    return {
      songList: [],
      left_number: 0,
    };
  },
  created() {
    this.getSongList();
  },
  methods: {
    async getSongList() {
      await this.$http.get("/personalized?limit=10").then((res) => {
        this.songList = res.data.result;
        console.log(res.data.result);
      });
    },
    animate(offset) {
      //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
      //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
      var li_div = document.querySelector(".li_div");
      var newLeft = parseInt(li_div.style.left) + offset;
      li_div.style.left = newLeft + "px";
      this.left_number = newLeft;
      console.log(newLeft);
    },
    left() {
      if (this.left_number == 0) {
        // this.$refs.btn1.style.disabled = true
      } else {
        this.animate(433);
      }
    },
    right() {
      if (this.left_number <= -1299) {
        // this.$refs.btn1[2].style.disabled = true
      } else {
        this.animate(-433);
      }
    },
    songListDetails(item) {
      this.$router.push({ path: "songListDetails", query: { item: item } });
    },
  },
};
</script>
<style lang="less" scoped>
.gedan {
  margin: 20px -30px;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  li {
    width: 250px;
    height: 270px;
    justify-content: center;
    margin: 10px 26px 10px 26px;
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
.btn_box {
  display: flex;
  justify-content: flex-end;
  .btn_style {
    margin-right: 30px;
  }
}
.gedan1 {
  margin: 20px 25px;
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

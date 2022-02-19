<template>
  <div>
    <div class="header">
      <div class="active">
        <img
          v-lazy="alInfo.blurPicUrl"
          alt=""
          width="250px"
          style="border-radius: 10px"
        />
      </div>
      <div class="content">
        <div class="top" style="margin-top: 0">
          <el-tag type="danger">{{ alInfo.type }}</el-tag>
          <strong style="margin-left: 10px">{{ alInfo.name }}</strong>
        </div>
        <div class="top">
          <div class="heng">
            <a
              href="#"
              style="background: #f56c6c; border: none; margin-left: 0"
            >
              <div class="left">
                <span style="color: #fff">
                  <i class="iconfont icon-zanting"></i>
                  播放全部
                </span>
              </div>
            </a>
            <a href="#">
              <div class="left">
                <span>
                  <i class="iconfont icon-tianjiadao"></i>
                  收藏{{ alContent.subCount }}
                </span>
              </div>
            </a>
            <a href="#">
              <div class="left">
                <span v-if="status">
                  <i class="iconfont icon-fenxiang"></i>
                  分享{{ alInfo.info.shareCount | wang }}
                </span>
              </div>
            </a>
          </div>
        </div>
        <div class="top">
          <span style="margin-left: 10px; color: grey" v-if="status">
            歌手：
            <a href="javascript:;" style="color: rgb(0, 195, 255)">{{
              alInfo.artist.name
            }}</a>
          </span>
          <span style="margin-left: 10px; color: grey">
            时间：{{ alInfo.publishTime | onlyDate }}
          </span>
        </div>
      </div>
    </div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      style="margin-top: 30px"
    >
      <el-tab-pane label="歌曲列表" name="first">
        <el-table
          :data="$store.state.songList"
          style="width: 100%"
          @row-click="oneRowData"
          @cell-dblclick="getBack"
          :row-style="rowStyle"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column type="index" width="50">
            <i @click="downSong" class="iconfont icon-xiazai"></i>
          </el-table-column>
          <el-table-column prop="name" label="音乐标题"> </el-table-column>
          <el-table-column width="350" label="歌手">
            <template slot-scope="scope" v-if="scope.row.ar">
              {{ scope.row.ar | ararr }}
            </template>
          </el-table-column>
          <el-table-column width="250" prop="al.name" label="专辑">
          </el-table-column>
          <el-table-column width="150" label="时长">
            <template slot-scope="scope">
              {{ scope.row.dt | shichang }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="评论" v-model="this.$store.state.total" name="second">
        <pin-lun></pin-lun>
      </el-tab-pane>
      <el-tab-pane label="专辑详情" name="third">
        <strong style="font-size: 20px">专辑介绍</strong><br />
        <span style="margin-top: 20px; display: block">
          <span v-html="desc"></span>
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import pinLun from "../../command/pinlun.vue";
export default {
  name: "playlist",
  data() {
    return {
      songList: [],
      alInfo: [],
      activeName: "first",
      desc: "",
      alContent: {},
      status: false,
    };
  },
  components: {
    pinLun,
  },
  created() {
    let row = this.$route.query.row;
    console.log(row);
    this.getAlInfo(row);
    this.getComment(row);
  },
  mounted() {},
  methods: {
    async getAlInfo(row) {
      await this.$http.get("/album?id=" + row.id).then((res) => {
        // this.songList = res.data.songs;
        this.$store.commit("newSongList", res.data.songs);
        this.alInfo = res.data.album;
        this.desc = this.alInfo.description.replaceAll("\n", "<br />");
        this.status = true;
        // console.log(res);
      });
      await this.$http.get("/album/detail/dynamic?id=" + row.id).then((res) => {
        this.alContent = res.data;
        // console.log(res.data);
      });
    },
    // 获取评论内容
    async getComment(row) {
      await this.$http.get("/comment/album?id=" + row.id).then((res) => {
        this.$store.commit("newTotal", res.data.total);
        this.$store.commit("newHotComment", res.data.hotComments);
        this.$store.commit("newComments", res.data.comments);
      });
    },
    handleClick() {
      // console.log(tab, event);
    },
    getBack(row, cell, event) {
      console.log(cell);
      console.log(event);
      this.$store.commit("newRowName", row.name);
      this.$store.dispatch("getBack", row);
    },
    rowStyle({ row }) {
      if (this.$store.state.rowName === row.name) {
        return { "background-color": "#F7EDED", cursor: "pointer" };
      }
      return { cursor: "pointer" };
    },
    oneRowData(row) {
      this.$http.get("song/url?id=" + row.id).then((res1) => {
        this.songUrl = res1.data.data[0].url;
      });
    },
    // 下载歌曲
    downSong() {
      console.log(this.songUrl);
      window.open(this.songUrl, "_blank");
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;

  .content {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    margin-left: 20px;
    .top {
      margin-top: 30px;
      strong {
        font-size: 25px;
      }
      .heng {
        display: flex;
        a {
          margin-left: 10px;
          border: 1px solid rgb(172, 170, 170);
          border-radius: 20px;
          width: 150px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #000;
        }
      }
    }
  }
}
</style>

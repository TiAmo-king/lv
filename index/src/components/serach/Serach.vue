<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单曲" name="first">
        <router-link
          tag="a"
          :to="{
            path: 'geshou',
            query: { id: 1 },
          }"
        >
          <span style="margin: 5px; color: #000"> 最佳匹配 </span>
          <el-card>
            <div class="tags" v-if="this.$store.state.isShow1">
              <div>
                <img
                  :src="this.$store.state.artistList[0].picUrl"
                  alt=""
                  srcset=""
                />
              </div>
              <span style="margin-left: 10px"
                >歌手：{{ this.$store.state.artistList[0].name }}</span
              >
              <span style="color: grey">{{
                this.$store.state.artistList[0].alias
              }}</span>
            </div>
          </el-card>
        </router-link>

        <el-table
          @row-dblclick="getBack"
          :data="this.$store.state.songList"
          :row-style="rowStyle"
          @row-click="oneRowData"
          style="width: 100%"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column type="index" width="50">
            <i @click="downSong" class="iconfont icon-xiazai"></i>
          </el-table-column>
          <el-table-column prop="name" label="音乐标题"> </el-table-column>
          <el-table-column label="歌手" width="200">
            <template slot-scope="scope" v-if="scope.row.artists">
              {{ scope.row.artists | ararr }}
            </template>
          </el-table-column>
          <el-table-column prop="album.name" label="专辑" width="200">
          </el-table-column>
          <el-table-column label="时长" width="60">
            <template slot-scope="scope">
              {{ scope.row.duration | shichang }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 专辑列表 -->
      <el-tab-pane label="专辑" name="second">
        <el-table
          :data="this.$store.state.albumList"
          @cell-click="pushInfo"
          style="width: 100%"
        >
          <el-table-column width="140px">
            <template slot-scope="scope">
              <img v-lazy="scope.row.blurPicUrl" alt="" width="130px" />
            </template>
          </el-table-column>
          <el-table-column prop="name"> </el-table-column>
          <el-table-column width="500px">
            <template slot-scope="scope">
              <a href="#" style="color: rgb(1, 208, 245)">{{
                scope.row.artist.name
              }}</a>
              {{ scope.row.artist.alias[0] }}
            </template>
          </el-table-column>
        </el-table>

        <!-- 视频 -->
      </el-tab-pane>
      <el-tab-pane label="视频" name="three">
        <div class="videoStyle">
          <ul>
            <li v-for="(item, i) in this.$store.state.videoList" :key="i">
              <a
                href="javascript:;"
                @click="openVideoDialog(item.vid, item.type)"
              >
                <img v-lazy="item.coverUrl" alt="" />
                <div style="width: 400px">
                  <el-tag type="danger" size="mini" v-show="item.type === 0"
                    >MV</el-tag
                  >
                  <span style="color: #000">{{ item.title }}</span>
                  <div
                    style="
                      font-siez: 12px;
                      color: rgb(0, 225, 255);
                      margin-top: 5px;
                    "
                  >
                    {{ item.creator[0].userName }}
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <video-dialog></video-dialog>

      <el-tab-pane label="电台" name="fourth">
        <el-table
          @cell-click="DJInfo"
          :data="this.$store.state.djRadio"
          style="width: 100%"
        >
          <el-table-column width="140px">
            <template slot-scope="scope">
              <img v-lazy="scope.row.dj.avatarUrl" alt="" width="130px" />
            </template>
          </el-table-column>
          <el-table-column prop="name"> </el-table-column>
          <el-table-column width="500px">
            <template slot-scope="scope" v-if="scope.row.dj.nickname">
              <span style="color: grey">by:{{ scope.row.dj.nickname }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="用户" name="six">
        <el-table :data="this.$store.state.userList" style="width: 100%">
          <el-table-column width="140px">
            <template slot-scope="scope">
              <img
                v-lazy="scope.row.avatarUrl"
                alt=""
                width="130px"
                style="border-radius: 50%"
              />
            </template>
          </el-table-column>
          <el-table-column prop="nickname" width="800px"> </el-table-column>
          <el-table-column prop="detailDescription">
            <template slot-scope="scope">
              <span v-if="scope.row.detailDescription === ''">
                网易音乐人
              </span>
              <span v-else>{{ scope.row.detailDescription }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import videoDialog from "../command/videoDialog.vue";
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  created() {},
  mounted() {},
  components: {
    videoDialog,
  },
  methods: {
    handleClick() {},
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
    // 带行数据跳转至专辑
    pushInfo(row) {
      console.log(row);
      this.$router.push({ path: "playlist", query: { row: row } });
    },
    // 打开video对话框传入id查询视频详情
    openVideoDialog(id, type) {
      console.log(id);
      if (type === 0) {
        this.getMVUrl(id);
        this.getMVInfo(id);
        this.$nextTick(function () {
          this.$store.commit("newIsShow3", true);
        });
      } else {
        this.getVideoUrl(id);
        this.getVideoInfo(id);
        this.$nextTick(function () {
          this.$store.commit("newIsShow3", true);
        });
      }
      this.$store.commit("newShowVisible", true);
    },
    // video请求
    async getVideoInfo(id) {
      // 视频详细信息
      await this.$http.get("/video/detail?id=" + id).then((res) => {
        this.$store.commit("newVideoInfo", res.data.data);
        // console.log(res.data.data);
      });
      // mv评论
      await this.$http.get("/comment/video?id=" + id).then((res) => {
        this.$store.commit("newHotComment", res.data.hotComments);
        this.$store.commit("newComments", res.data.comments);
        this.$store.commit("newTotal", res.data.total);
      });
      await this.$http.get("/video/timeline/recommend").then((res) => {
        // 推荐视频
        this.$store.commit("newVideoRecommend", res.data.datas);
        let list = [];
        list = res.data.datas;
        console.log(list);
      });
      // mv评论点赞数据
      await this.$http.get("/video/detail/info?vid=" + id).then((res) => {
        this.$store.commit("newVideoDetail", res.data);
        // console.log(res.data);
      });
      // this.$store.commit("newIsShow3", true)
    },

    // mv请求
    getMVInfo(id) {
      // 视频详细信息
      this.$http.get("/mv/detail?mvid=" + id).then((res) => {
        this.$store.commit("newVideoInfo", res.data.data);
        // console.log(res.data.data);
      });
      // mv评论
      this.$http.get("/comment/mv?id=" + id).then((res) => {
        this.$store.commit("newHotComment", res.data.hotComments);
        this.$store.commit("newComments", res.data.comments);
        this.$store.commit("newTotal", res.data.total);
      });
      // mv评论点赞数据
      this.$http.get("/mv/detail/info?mvid=" + id).then((res) => {
        this.$store.commit("newVideoDetail", res.data);
        // console.log(res.data);
      });
      this.$http.get("/video/timeline/recommend").then((res) => {
        // 推荐视频
        this.$store.commit("newVideoRecommend", res.data.datas);
      });
    },
    async getMVUrl(id) {
      // mvurl
      await this.$http.get("/mv/url?id=" + id).then((res) => {
        this.$store.commit("newVideoUrl", res.data.data.url);
      });
    },
    async getVideoUrl(id) {
      await this.$http.get("/video/url?id=" + id).then((res) => {
        this.$store.commit("newVideoUrl", res.data.urls[0].url);
      });
    },
    oneRowData(row) {
      this.$http.get("song/url?id=" + row.id).then((res1) => {
        this.songUrl = res1.data.data[0].url;
        console.log(this.songUrl);
      });
    },
    // 下载歌曲
    downSong() {
      console.log(this.songUrl);
      window.open(this.songUrl, "_blank");
    },

    DJInfo(row) {
      this.$router.push({ path: "/diantaiInfo", query: { id: row.id } });
    },
  },
};
</script>
<style lang="less" scoped>
.el-card {
  margin: 5px;
  width: 500px;
  .tags {
    display: flex;
    align-items: center;
    div {
      width: 100px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      img {
        height: 120px;
      }
    }
  }
}
.videoStyle {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 50px;
      img {
        width: 400px;
      }
    }
  }
}
</style>

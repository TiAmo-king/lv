<template>
  <div>
    <div class="header">
      <div class="active">
        <img
          v-lazy="gedanInfo.coverImgUrl"
          alt=""
          width="250px"
          style="border-radius: 10px"
        />
      </div>
      <div class="content">
        <div class="top" style="margin-top: 0">
          <el-tag type="danger">歌单</el-tag>
          <strong style="margin-left: 10px">{{ gedanInfo.name }}</strong>
        </div>
        <div class="top" style="display: flex; align-items: center">
          <!-- <img v-if="gedanInfo.creator.avatarUrl !== undefined" :src="gedanInfo.creator.avatarUrl" alt="" width="30px;" style="border-radius:50%" /> -->
          <!-- <a href="#" style="margin-left: 5px; color: cadetblue"
            >{{ gedanInfo.creator.nickname }}
          </a> -->
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
                  收藏{{ gedanInfo.subscribedCount | wang }}
                </span>
              </div>
            </a>
            <a href="#">
              <div class="left">
                <span>
                  <i class="iconfont icon-fenxiang"></i>
                  分享{{ gedanInfo.shareCount | wang }}
                </span>
              </div>
            </a>
            <a href="#">
              <div class="left">
                <span>
                  <i class="iconfont icon-xiazai"></i>
                  下载全部
                </span>
              </div>
            </a>
          </div>
        </div>
        <div class="top">
          <span style="margin-left: 10px; color: grey">
            标签：
            <a href="javascript:;" style="color: rgb(0, 195, 255)">{{
              gedanInfo.tags
            }}</a>
          </span>
          <span style="margin-left: 10px; color: grey">
            播放：{{ gedanInfo.playCount | wang }}
          </span>
          <span
            style="
              margin-left: 10px;
              color: grey;
              margin-top: 10px;
              display: block;
            "
          >
            简介：{{ gedanInfo.description }}
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
        <el-table :data="songList" style="width: 100%" @cell-dblclick="getBack">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="name" label="音乐标题"> </el-table-column>
          <el-table-column width="350" label="歌手">
            <!-- <template slot-scope="scope">
                <div v-show="scope.row.ar ">
                    {{ scope.row.ar | ararr }}
                </div>
              
            </template> -->
          </el-table-column>
          <!-- <el-table-column width="250" prop="al.name" label="专辑">
          </el-table-column> -->
          <el-table-column width="150" label="时长">
            <!-- <template slot-scope="scope">
              {{ scope.row.dt | shichang }}
            </template> -->
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- <el-tab-pane label="评论" v-model="this.$store.state.total" name="second">
        <pin-lun></pin-lun>
      </el-tab-pane>
      <el-tab-pane label="专辑详情" name="third">
        <strong style="font-size: 20px">专辑介绍</strong><br />
        <span style="margin-top: 20px; display: block">
          <span v-html="desc"></span>
        </span>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
// import pinLun from "../../command/pinlun.vue";
export default {
  name: "playlist",
  data() {
    return {
      songList: [],
      alInfo: [],
      activeName: "first",
      desc: "",
      tracks: [],
      gedanInfo: [],
    };
  },
  components: {
    // pinLun,
  },
  created() {
    let item = this.$route.query.item;
    this.getAlInfo(item);
    this.getComment(item);
  },
  mounted() {},
  methods: {
    getAlInfo(item) {
      this.$http.get("/playlist/detail?id=" + item.id).then(async (res) => {
        this.$store.commit("newSongList", res.data.playlist.tracks);
        this.gedanInfo = res.data.playlist;
      });
    },
    // 获取评论内容
    async getComment(item) {
      await this.$http.get("/comment/album?id=" + item.id).then((res) => {
        this.$store.commit("newTotal", res.data.total);
        this.$store.commit("newHotComment", res.data.hotComments);
        this.$store.commit("newComments", res.data.comments);
      });
    },
    handleClick() {},
    getBack(row) {
      this.$store.dispatch("getBack", row);
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
      margin-top: 10px;
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

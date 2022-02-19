<template>
  <div>
    <ul>
      <li v-for="(item, i) in videoList" :key="i">
        <div>
          <a href="javascript:;">
            <img
              v-lazy="item.data.coverUrl"
              onerror="onerror=null"
              @click="showDialog(videoInfo[i], item)"
              alt="加载失败，请重试"
            />
          </a>
          <div class="title">
            {{ item.data.title }}
          </div>
          <div style="font-size: 12px; color: rgb(172, 170, 170)">
            by:{{ actorName[i] }}
          </div>
        </div>
      </li>
    </ul>
    <el-dialog
      top="0"
      close-on-press-escape
      :visible.sync="showVisible"
      :before-close="closeDialog"
      width="70%"
    >
      <div style="" class="dialog abow_dialog">
        <div class="shipin">
          <video
            v-if="srcUrl"
            id="movie"
            ref="videoRef"
            :src="srcUrl"
            controls
            autoplay
          ></video>
          <!-- MV详情 -->
          <div class="MVInfo">
            <div class="cover">
              <img v-lazy="MVMoreInfo.coverUrl" alt="" />
              <span>{{ MVMoreInfo.title }}</span>
            </div>

            <div>
              <h1 style="line-height: 0px; font-size: 30px">
                {{ MVMoreInfo.name }}
              </h1>
              <!-- 收藏点赞次数 -->
              <div class="count">
                <a href="#">
                  <div class="left">
                    <span>
                      <i class="iconfont icon-dianzan"></i>
                      赞{{ MVdetail.likedCount }}
                    </span>
                  </div>
                </a>
                <a href="#">
                  <div class="left">
                    <span>
                      <i class="iconfont icon-tianjiadao"></i>
                      收藏{{ MVMoreInfo.subscribeCount }}
                    </span>
                  </div>
                </a>
                <a href="#">
                  <div class="left">
                    <span>
                      <i class="iconfont icon-fenxiang"></i>
                      分享{{ MVMoreInfo.shareCount }}
                    </span>
                  </div>
                </a>
                <a href="#">
                  <div class="left">
                    <span>
                      <i class="iconfont icon-xiazai"></i>
                      下载MV
                    </span>
                  </div>
                </a>
              </div>
              <!-- 视频标签 -->
              <div style="line-height: 40px">
                <el-tag
                  style="margin: 10px"
                  v-for="(item, i) in MVMoreInfo.videoGroup"
                  :key="i"
                  type="info"
                  >{{ item.name }}</el-tag
                >
              </div>
              <div style="color: rgb(172, 170, 170); line-height: 40px">
                <span>发布：{{ MVMoreInfo.publishTime | dateFormat }}</span>
                <span style="margin-left: 10px"
                  >播放次数：{{ MVMoreInfo.playTime }}</span
                >
              </div>
              <!-- 简介隐藏显示 -->
              <div
                @click="showRemark"
                id="marke"
                class="suoxie"
                style="width: 705px"
              >
                <span>{{ MVMoreInfo.description }}</span>
                <img
                  id="xianxia"
                  src="../../../assets/icon/向下.png"
                  alt=""
                  width="20px"
                />
              </div>
            </div>
          </div>
          <!-- 评论 -->
          <div class="pinlun">
            <div>
              <div class="pinglin1">
                <h1 style="font-size: 30px">评论</h1>
                <span class="total" style="font-size: 10px; padding-top: 50px"
                  >({{ videoComments.total }})</span
                >
              </div>
              <div class="conmentsIn">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入评论内容"
                  v-model="commentsInpute"
                >
                </el-input>
                <el-button type="danger" size="mini">评论</el-button>
              </div>
              <!-- 精彩评论 -->
              <div class="conmentsList">
                <strong>精彩评论</strong>
                <ul>
                  <li v-for="(item, i) in hotComments" :key="i">
                    <div>
                      <div class="comStyle">
                        <img v-lazy="item.user.avatarUrl" alt="" />
                        <div class="nameconten">
                          <a href="javascript:;" v-if="status1"
                            >{{ item.user.nickname }}：</a
                          >
                          <span style="font-size: 12px">{{
                            item.content
                          }}</span>
                        </div>
                      </div>

                      <div class="dianz">
                        <div style="timec">
                          {{ item.time | dateFormat }}
                        </div>
                        <div style="dcount">
                          <a href="#" style="color: rgb(172, 170, 170)"
                            ><img
                              src="../../../assets/images/赞.png"
                              style="width: 20px; height: 20px"
                              alt=""
                            />
                            {{ item.likedCount }}</a
                          >
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- 最新评论 -->
              <div class="conmentsList">
                <strong>最新评论({{ videoComments.total }})</strong>
                <ul>
                  <li v-for="(item, i) in comments" :key="i">
                    <div>
                      <div class="comStyle">
                        <img v-lazy="item.user.avatarUrl" alt="" />
                        <div class="nameconten">
                          <a href="javascript:;" v-if="status1"
                            >{{ item.user.nickname }}：</a
                          >
                          <span style="font-size: 12px">{{
                            item.content
                          }}</span>
                        </div>
                      </div>
                      <!-- 评论时间 -->
                      <div class="dianz">
                        <div style="timec">
                          {{ item.time | dateFormat }}
                        </div>
                        <div style="dcount">
                          <a href="#"
                            ><img
                              src="../../../assets/images/赞.png"
                              style="width: 20px; height: 20px"
                              alt=""
                          /></a>
                          {{ item.likedCount }}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="tuijian">
          <strong style="font-size: 20px">相关推荐</strong>
          <div class="outbox" v-for="(item, i) in tuiJianList" :key="i">
            <a href="#">
              <img v-lazy="item.data.coverUrl" alt="" />
            </a>
            <div style="padding-left: 10px" class="content">
              <div style="padding-top: 20px">
                <span style="font-size: 16px">{{ item.data.title }}</span>
              </div>

              <div style="padding-top: 20px">
                <a href="#" style="color: rgb(172, 170, 170)" v-if="status2"
                  >by:{{ item.data.creator.nickname }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoList: [],
      videoInfo: [],
      showVisible: false,
      srcUrl: "",
      MVMoreInfo: [], //MV详细信息
      MVdetail: [], //MV信息
      videoComments: [], //所有评论
      commentsInpute: "", //输入的评论内容
      hotComments: [], //精彩评论
      comments: [], //评论列表
      tuiJianList: [], //推荐视频
      tuiJianUrl: [],
      videoUrl: "",
      actorName: [],
      status1: false,
      status2: false,
    };
  },
  created() {
    console.log(this.$route.query.id);
    let tagId = this.$route.query.id;
    this.getTagsVideo(tagId);
  },
  mounted() {},
  updated() {},
  methods: {
    // 获取分类标签之后查询
    async getTagsVideo(tagId) {
      if (tagId === undefined) {
        await this.$http.get("/video/timeline/all").then((res1) => {
          this.videoList = res1.data.datas;

          console.log(res1.data.datas);
          for (let i = 0; i < this.videoList.length; i++) {
            this.$http
              .get("/video/url?id=" + this.videoList[i].data.vid)
              .then((res2) => {
                this.videoInfo[i] = res2.data.urls[0].url;
              });

            this.actorName[i] = this.videoList[i].data.creator.nickname;

            console.log(this.actorName);
          }
        });
      } else {
        this.$http.get("/video/group?id=" + tagId).then((res) => {
          if (res.data.code === 200) this.videoList = res.data.datas;
          console.log(this.videoList);
          for (let i = 0; i < this.videoList.length; i++) {
            this.$http
              .get("/video/url?id=" + this.videoList[i].data.vid)
              .then((res2) => {
                this.videoInfo[i] = res2.data.urls[0].url;
              });
          }
        });
      }
    },
    showDialog(url, item) {
      console.log(item.data.vid);
      this.showVisible = true;
      this.MVUrl = url;
      this.getMVInfo(item.data.vid);
      this.getMVcontent(item.data.vid);
      this.getMVdetail(item.data.vid);
      this.getTuiJian(item.data.vid);
      this.getVideoUrl(item.data.vid);
    },
    closeDialog() {
      this.showVisible = false;
      document.getElementById("movie").pause();
      document.getElementById("marke").className = "suoxie";
      document.getElementById("xianxia").style.display = "block";
    },
    // 获取视频详细数据
    async getMVInfo(id) {
      await this.$http.get("/video/detail?id=" + id).then((res) => {
        let temp = res.data.data;
        for (const i in temp) {
          this.MVMoreInfo[i] = temp[i];
        }
        // this.MVMoreInfo = Object.values(res.data.data)
        console.log(this.MVMoreInfo);
      });
    },
    // 获取评论
    async getMVcontent(id) {
      await this.$http.get("/comment/video?id=" + id).then((res) => {
        this.videoComments = res.data;
        this.hotComments = res.data.hotComments;
        this.comments = res.data.comments;
        this.status1 = true;
        console.log(res.data);
      });
    },
    async getVideoUrl(id) {
      await this.$http.get("/video/url?id=" + id).then((res) => {
        this.srcUrl = res.data.urls[0].url;
        console.log(this.srcUrl);
      });
    },
    // 获取歌曲的播放下载收藏数
    async getMVdetail(id) {
      await this.$http.get("/video/detail/info?vid=" + id).then((res) => {
        // console.log(res.data);
        this.MVdetail = res.data;
      });
    },
    // 相关推荐
    async getTuiJian() {
      await this.$http.get("/video/timeline/recommend").then(async (res) => {
        // 推荐视频
        this.tuiJianList = res.data.datas;
        // console.log(this.tuiJianList);
        for (let i = 0; i < this.tuiJianList.length; i++) {
          await this.$http
            .get("/video/url?id=" + this.tuiJianList[i].data.vid)
            .then(async (res1) => {
              // 相关视频
              this.tuiJianUrl[i] = res1.data.urls[0];
            });
        }
        this.status2 = true;
        // console.log(this.tuiJianUrl);
      });
    },
    showRemark() {
      document.getElementById("marke").className = "";
      document.getElementById("xianxia").style.display = "none";
    },
  },
};
</script>
<style lang="less" scoped>
ul {
  display: flex;
  flex-wrap: wrap;

  li {
    margin: 20px 40px;
    img {
      // display: block;
      position: relative;
      border-radius: 10px;
      width: 400px;
      height: 226px;
    }
  }
  .title {
    width: 400px;
  }
}
video {
  width: 700px;
}
.el-dialog {
  .el-dialog__body {
    max-height: 500px !important;
    min-height: 100px;
    overflow-y: auto;
  }
}
.dialog {
  display: flex;

  .shipin {
    width: 60%;
    .MVInfo {
      .cover {
        display: flex;
        align-items: center;
        img {
          height: 80px;
          width: 80px;
          border-radius: 50%;
        }
      }
      .suoxie {
        width: 705px;
        display: flex;
        span {
          display: block;
          width: 680px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .count {
        display: flex;
        a {
          color: black;
          .left {
            width: 120px;
            height: 30px;
            border: 1px solid gainsboro;
            border-radius: 20px;
            span {
              display: block;
              padding: 5px;
              padding-left: 20px;
            }
          }
        }
      }
    }
  }
  .pinlun {
    width: 700px;
    .pinglin1 {
      display: flex;
    }
    .conmentsIn {
      display: flex;
      .el-button {
        margin: 45px 5px;
        height: 30px;
      }
    }
    .conmentsList {
      ul {
        margin: 20px -40px;
        li {
          margin: 0 0;
          width: 700px;
          display: flex;
          flex-wrap: wrap;
          .comStyle {
            display: flex;
            img {
              margin-top: 10px;
              width: 70px;
              height: 70px;
              border-radius: 50%;
            }
            .nameconten {
              margin-top: 10px;
              a {
                color: rgb(35, 180, 247);
              }
            }
          }
          .dianz {
            margin-left: 70px;
            margin-top: -15px;
            font-size: 12px;
            color: rgb(172, 170, 170);
            width: 630px;
            display: flex;
            // border: 1px solid black;
            justify-content: space-between;
            .timec {
              position: absolute;
              margin-left: 100px;
            }
            .dcount {
              img {
                display: block;
                padding-top: 10px;
              }
              a:visited {
                color: red;
              }
            }
          }
        }
      }
    }
  }
  .tuijian {
    width: 40%;
    height: 900px;
    overflow: hidden;
    .outbox {
      margin-top: 15px;
      width: 100%;
      height: 160px;
      display: flex;
      img {
        width: 300px;
        height: 150px;
        border-radius: 10px;
        .content {
          a:hover {
            color: black;
          }
        }
      }
    }
  }
}
</style>

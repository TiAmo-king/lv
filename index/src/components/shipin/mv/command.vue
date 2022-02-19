<template>
  <div>
    <ul>
      <li v-for="(item, i) in MVList" :key="i">
        <div class="boderr">
          <a href="javascript:;">
            <img
              v-lazy="item.cover"
              onerror="onerror=null"
              @click="showDialog(MVUrlList[i], item)"
              alt="加载失败，请重试"
            />
          </a>
          <div class="title">
            {{ item.name }}
          </div>
          <div>{{ item.artistName }}</div>
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
            id="movie"
            ref="videoRef"
            :src="MVUrl"
            controls
            autoplay
          ></video>
          <!-- MV详情 -->
          <div class="MVInfo">
            <div class="cover">
              <img v-lazy="MVMoreInfo.cover" alt="" />
              <span>{{ MVMoreInfo.artistName }}</span>
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
                      收藏{{ MVMoreInfo.subCount }}
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
              <div style="color: rgb(172, 170, 170); line-height: 40px">
                <span>发布：{{ MVMoreInfo.publishTime }}</span>
                <span style="margin-left: 10px"
                  >播放次数：{{ MVMoreInfo.playCount }}</span
                >
              </div>
              <!-- 简介隐藏显示 -->
              <div
                @click="showRemark"
                id="marke"
                class="suoxie"
                style="width: 705px"
              >
                <span>{{ MVMoreInfo.desc }}</span>
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
                  >({{ MVcomments.total }})</span
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
                <strong>最新评论({{ MVcomments.total }})</strong>
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
          <strong style="font-size:20px；color:black">相关推荐</strong>
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
      MVList: [],
      MVUrlList: [],
      MVId: [],
      MVUrl: "",
      showVisible: false,
      MVMoreInfo: [], //MV详细信息
      MVdetail: [], //MV信息
      MVcomments: [], //所有评论
      commentsInpute: "", //输入的评论内容
      hotComments: [], //精彩评论
      comments: [], //评论列表
      tuiJianList: [], //推荐视频
      tuiJianUrl: [],
      status1: false,
      status2: false,
    };
  },
  created() {
    console.log(this.$route.query.name);
    let tagName = this.$route.query.name;
    this.getTagsMV(tagName);
  },
  mounted() {},
  updated() {},
  methods: {
    getTagsMV(tagName) {
      // 如果为默认的全部则执行全部MV的请求
      if (tagName === undefined) {
        this.$http.get("/mv/first").then((res1) => {
          this.MVList = res1.data.data;
          console.log(this.MVId);
          for (let i = 0; i < this.MVList.length; i++) {
            this.$http.get("/mv/url?id=" + this.MVList[i].id).then((res2) => {
              this.MVUrlList[i] = res2.data.data.url;
            });
          }
        });
      }
      // 获用传过来的参数分类查询MV
      else {
        this.$http.get("/mv/first?area=" + tagName).then((res) => {
          if (res.data.code === 200) this.MVList = res.data.data;
          for (let i = 0; i < this.MVList.length; i++) {
            this.$http.get("/mv/url?id=" + this.MVList[i].id).then((res2) => {
              // console.log(res2.data.data.url);
              this.MVUrlList[i] = res2.data.data.url;
            });
          }
        });
      }
    },
    showDialog(url, item) {
      this.showVisible = true;
      this.MVUrl = url;
      this.getMVInfo(item.id);
      this.getMVcontent(item.id);
      this.getMVdetail(item.id);
      this.getTuiJian(item.id);
    },
    closeDialog() {
      this.showVisible = false;
      document.getElementById("movie").pause();
      document.getElementById("marke").className = "suoxie";
      document.getElementById("xianxia").style.display = "block";
    },
    // 获取MV详细数据
    async getMVInfo(id) {
      await this.$http.get("/mv/detail?mvid=" + id).then((res) => {
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
      await this.$http.get("/comment/mv?id=" + id).then((res) => {
        console.log(res.data);
        this.MVcomments = res.data;
        this.hotComments = res.data.hotComments;
        this.comments = res.data.comments;
        this.status1 = true;
      });
    },
    // 获取歌曲的播放下载收藏数
    async getMVdetail(id) {
      await this.$http.get("/mv/detail/info?mvid=" + id).then((res) => {
        console.log(res.data);
        this.MVdetail = res.data;
      });
    },
    // 相关推荐
    async getTuiJian() {
      await this.$http.get("/video/timeline/recommend").then(async (res) => {
        // 推荐视频
        this.tuiJianList = res.data.datas;
        console.log(this.tuiJianList);
        for (let i = 0; i < this.tuiJianList.length; i++) {
          await this.$http
            .get("/video/url?id=" + this.tuiJianList[i].data.vid)
            .then(async (res1) => {
              // 相关视频
              this.tuiJianUrl[i] = res1.data.urls[0];
            });
        }
        this.status2 = true;
        console.log(this.tuiJianUrl);
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
      position: relative;
      width: 400px;
      border-radius: 10px;
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

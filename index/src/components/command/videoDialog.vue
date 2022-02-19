<template>
  <div>
    <el-dialog
      top="0"
      close-on-press-escape
      :visible.sync="this.$store.state.showVisible"
      :before-close="closeDialog"
      width="70%"
    >
      <div style="" class="dialog abow_dialog">
        <div class="shipin">
          <video
            id="movie"
            ref="videoRef"
            :src="$store.state.videoUrl"
            controls
            autoplay
          ></video>
          <!-- MV详情 -->
          <div class="MVInfo">
            <div class="cover" v-if="$store.state.videoInfo.cover">
              <img v-lazy="$store.state.videoInfo.cover" alt="" />
              <span>{{ $store.state.videoInfo.artistName }}</span>
            </div>
            <div class="cover" v-else>
              <img v-lazy="$store.state.videoInfo.avatarUrl" alt="" />
              <span v-if="$store.state.isShow3">{{
                $store.state.videoInfo.creator.nickname
              }}</span>
            </div>
            <div>
              <h1 style="line-height: 0px; font-size: 30px">
                {{ $store.state.videoInfo.title }}
              </h1>
              <!-- 收藏点赞次数 -->
              <div class="count">
                <a href="#">
                  <div class="left">
                    <span>
                      <i class="iconfont icon-dianzan"></i>
                      赞{{ $store.state.videoDetail.likedCount }}
                    </span>
                  </div>
                </a>
                <a href="#">
                  <div class="left">
                    <span
                      v-if="$store.state.videoInfo.subscribeCount === undefined"
                    >
                      <i class="iconfont icon-tianjiadao"></i>
                      收藏{{ $store.state.videoInfo.subCount }}
                    </span>
                    <span v-else>
                      <i class="iconfont icon-tianjiadao"></i>
                      收藏{{ $store.state.videoInfo.subscribeCount }}
                    </span>
                  </div>
                </a>
                <a href="#">
                  <div class="left">
                    <span>
                      <i class="iconfont icon-fenxiang"></i>
                      分享{{ $store.state.videoInfo.shareCount }}
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
                  v-for="(item, i) in $store.state.videoInfo.videoGroup"
                  :key="i"
                  type="info"
                  >{{ item.name }}</el-tag
                >
              </div>
              <div style="color: rgb(172, 170, 170); line-height: 40px">
                <span
                  >发布：{{
                    $store.state.videoInfo.publishTime | onlyDate
                  }}</span
                >

                <span
                  style="margin-left: 10px"
                  v-if="$store.state.videoInfo.playTime === undefined"
                  >播放次数：{{ $store.state.videoInfo.playCount | wang }}</span
                >
                <span style="margin-left: 10px" v-else
                  >播放次数：{{ $store.state.videoInfo.playTime | wang }}</span
                >
              </div>
              <!-- 简介隐藏显示 -->
              <div
                @click="showRemark"
                id="marke"
                class="suoxie"
                style="width: 705px"
              >
                <span>{{ $store.state.videoInfo.desc }}</span>
                <img
                  id="xianxia"
                  src="../../assets/icon/向下.png"
                  alt=""
                  width="20px"
                />
              </div>
            </div>
          </div>
          <!-- 评论 -->
          <div class="pinlun">
            <div>
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
                  <li
                    v-for="(item, i) in this.$store.state.hotComment"
                    :key="i"
                  >
                    <div>
                      <div class="comStyle">
                        <img v-lazy="item.user.avatarUrl" alt="" />
                        <div class="nameconten">
                          <a href="javascript:;" v-if="$store.state.isShow3"
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
                              src="../../assets/images/赞.png"
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
                <strong>最新评论({{ this.$store.state.total }})</strong>
                <ul>
                  <li v-for="(item, i) in this.$store.state.comments" :key="i">
                    <div>
                      <div class="comStyle">
                        <img v-lazy="item.user.avatarUrl" alt="" />
                        <div class="nameconten">
                          <a href="javascript:;" v-if="$store.state.isShow3"
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
                              src="../../assets/images/赞.png"
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
          <div
            class="outbox"
            v-for="(item, i) in $store.state.videoRecommend"
            :key="i"
          >
            <a href="#">
              <img v-lazy="item.data.coverUrl" alt="" />
            </a>
            <div style="padding-left: 10px" class="content">
              <div style="padding-top: 20px">
                <span style="font-size: 16px">{{ item.data.title }}</span>
              </div>

              <div style="padding-top: 20px">
                <a
                  href="#"
                  style="color: rgb(172, 170, 170)"
                  v-if="item.data.creator.nickname"
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
  name: "",
  data() {
    return {
      commentsInpute: "",
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    closeDialog() {
      this.$store.state.showVisible = false;
      document.getElementById("movie").pause();
      document.getElementById("marke").className = "suoxie";
      document.getElementById("xianxia").style.display = "block";
    },
    showRemark() {
      document.getElementById("marke").className = "";
      document.getElementById("xianxia").style.display = "none";
    },
  },
};
</script>
<style lang="less" scoped>
.el-dialog {
  .el-dialog__body {
    max-height: 500px !important;
    min-height: 100px;
    overflow-y: auto;
  }
}
video {
  width: 700px;
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
    margin-top: 20px;
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

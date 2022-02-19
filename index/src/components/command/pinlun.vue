<template>
  <div>
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
            <li v-for="(item, i) in this.$store.state.hotComment" :key="i">
              <div>
                <div class="comStyle">
                  <img v-lazy="item.user.avatarUrl" alt="" />
                  <div class="nameconten">
                    <a href="javascript:;">{{ item.user.nickname }}：</a>
                    <span style="font-size: 12px">{{ item.content }}</span>
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
                    <a href="javascript:;">{{ item.user.nickname }}：</a>
                    <span style="font-size: 12px">{{ item.content }}</span>
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
</template>

<script>
export default {
  data() {
    return {
      commentsInpute: "",
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.pinlun {
  // width: 700px;
  .pinglin1 {
    display: flex;
  }
  .conmentsIn {
    margin-top: 20px;
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
        //   width: 700px;
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
            width: 1450px;
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
          width: 1450px;
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
</style>

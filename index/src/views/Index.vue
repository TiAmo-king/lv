<template>
  <div>
    <el-container>
      <el-aside>
        <div>
          <div class="header_log">
            <span
              style="
                display: block;
                padding: 10px;
                color: #fff;
                font-size: 25px;
              "
            >
              某云音乐
            </span>
          </div>
          <el-menu
            :default-active="this.$router.path"
            class="el-menu-vertical-demo"
            unique-opened
            background-color="#fff"
            text-color="#000"
            router
            active-text-color="#EC4141"
          >
            <el-menu-item index="mysong">
              <i class="iconfont icon-wode" style="font-size: 18px"></i>
              <span slot="title" style="margin-left: 10px; font-size: 18px"
                >我的音乐</span
              >
            </el-menu-item>
            <el-menu-item index="yinyueguan">
              <i class="iconfont icon-yinleguan" style="font-size: 18px"></i>
              <span slot="title" style="margin-left: 10px; font-size: 18px"
                >发现音乐</span
              >
            </el-menu-item>
            <el-menu-item index="paihang">
              <i
                class="iconfont icon-bofangliebiao"
                style="font-size: 18px"
              ></i>
              <span slot="title" style="margin-left: 10px; font-size: 18px"
                >音乐排行榜</span
              >
            </el-menu-item>
            <el-menu-item index="shipin">
              <i class="iconfont icon-tianjiadao" style="font-size: 18px"></i>
              <span slot="title" style="margin-left: 10px; font-size: 18px"
                >视频/MV</span
              >
            </el-menu-item>
            <el-menu-item index="diantai">
              <i class="iconfont icon-diantai" style="font-size: 18px"></i>
              <span slot="title" style="margin-left: 10px; font-size: 18px"
                >电台</span
              >
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container class="container">
        <el-header>
          <el-row>
            <el-col :span="8" class="mbx">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-caret-left"
                circle
                @click="back"
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-caret-right"
                circle
                disabled
              ></el-button>
            </el-col>
            <el-col :span="6" class="serach">
              <!-- <el-input placeholder="请输入歌曲或歌手" v-model="serachKey">
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  type="danger"
                  @click="serachSong"
                >
                </el-button>
              </el-input> -->
              <div class="seach_box">
                <div class="radius"></div>
                <input
                  type="text"
                  ref="serachInput"
                  placeholder="搜索"
                  v-model="serachKey"
                />
                <div @click="serachSong"><i class="el-icon-search"></i></div>
              </div>
            </el-col>
            <el-col :span="2" class="loginFont">
              <div>
                <el-avatar :size="35" src="../assets/logo.png"></el-avatar>
              </div>
              <div class="font_login">
                <a href="javascript:;" @click="showDialog">未登录</a>
              </div>
            </el-col>
          </el-row>
          <el-dialog title="" :visible.sync="showDialogVisible" width="20%">
            <div class="login_dialog">
              <h2>扫码登录</h2>
              <el-image :src="ewmSrc" alt="" :lazy="true"></el-image>
              <div>
                使用
                <a href="javascript:;">网易云音乐APP</a>
                扫码登录
              </div>
            </div>
          </el-dialog>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- 播放器 -->
    <div class="footer">
      <div class="left">
        <div class="img_box">
          <img
            v-if="this.$store.state.rowData.artists"
            :src="this.$store.state.rowData.artists[0].img1v1Url"
            alt=""
          />
          <img
            v-else-if="this.$store.state.rowData.al"
            :src="this.$store.state.rowData.al.picUrl"
            alt=""
          />
          <img v-else :src="this.$store.state.rowData.blurCoverUrl" alt="" />
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
            <span v-else> </span>
          </div>
        </div>
      </div>
      <div class="center">
          <audio :src="this.$store.state.songUrl" controls autoplay></audio>
      </div>
      <div class="right">
        <a
          href="javascript:;"
          style="color: #000"
          @click="$store.dispatch('showDraw')"
        >
          <i class="iconfont icon-bofangduilie" style="font-size: 30px"></i>
        </a>
      </div>
    </div>
    <!-- 抽屉 -->
      <el-drawer
        title="当前播放"
        :visible.sync="$store.state.drawer"
        :with-header="false"
      >
        <el-table
          :data="$store.state.songList"
          @row-dblclick="getBack"
          :row-style="rowStyle"
          style="width: 100%"
        >
          <el-table-column width="50"> </el-table-column>
          <el-table-column prop="name" label="音乐标题"> </el-table-column>
          <el-table-column label="歌手" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.artists">
                {{ scope.row.artists | ararr }}
              </span>
              <span v-else-if="scope.row.dj">
                {{ scope.row.dj.nickname }}
              </span>
              <span v-else-if="scope.row.ar">
                {{ scope.row.ar | ararr }}
              </span>
              <span v-else> </span>
            </template>
          </el-table-column>
          <el-table-column label="时长" width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.duration">
                {{ scope.row.duration | shichang }}
              </span>
              <span v-else-if="scope.row.dt">
                {{ scope.row.dt | shichang }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-drawer>
  </div>
</template>
<script>
import axios from "axios";
// import aplayer from 'vue-aplayer'
// import divFooter from "../components/footer.vue";
export default {
  data() {
    return {
      showDialogVisible: false,
      makeKey: "",
      ewmSrc: "",
      myDate: 0,
      statusRes: "",
      serachKey: "薛之谦",
      currentTime: 0,
      allTime: 0,
      drawer: false,
      dt:this.$store.state.rowData.dt
    };
  },
  components: {
    
    // divFooter,
  },
  created() {},
  mounted() {
    this.myDate = Date.now();
    // let serachIpt = this.$refs['serachInput']
    this.$refs["serachInput"].addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        this.serachSong();
      }
    });
  },
  updated() {},
  methods: {
    // 搜索歌曲
    serachSong() {
      this.$store.dispatch("serachSong", this.serachKey);
      if (this.$route.path !== "/serach") this.$router.push("/serach");
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
    back() {
      this.$router.go(-1);
    },
    go() {
      this.$router.go(1);
    },

    // 打开登录界面
    async showDialog() {
      this.showDialogVisible = true;
      this.getMakeKey();
      this.login()
      //const {data:res} = await this.$http.get('/login/qr/check?key='+this.makeKey+'&timerstamp='+this.myDate)
    },
    // 获取生成二维码的建
    async getMakeKey() {
      const { data: res } = await this.$http.get("/login/qr/key");
      if (res.data.code !== 200) this.$msg.error("获取失败");
      this.makeKey = res.data.unikey;
      const { data: res1 } = await this.$http.get(
        "login/qr/create?key=" + this.makeKey + "&qrimg=" + this.makeKey
      );
      this.ewmSrc = res1.data.qrimg;
    },
    async checkStatus() {
      await axios({
        url: `/login/qr/check?key=${this.makeKey}&timerstamp=${this.myDate}`,
        withCredentials: true,
      }).then((res) => {
        this.statusRes = res.data;
        console.log(res);
      });
    },
    async getLoginStatus() {
      axios({
        url: `/login/status?timerstamp=${this.myDate}`,
        withCredentials: true,
      }).then((res) => {
        console.log(res);
      });
    },
    login() {
      let timer = setInterval(() => {
        const statusRes = this.checkStatus();
        if (this.$cookie.get("loginStatus") !== "") {
          if (statusRes.code === 800) {
            alert("二维码已过期,请重新获取");
            clearInterval(timer);
          }
          if (statusRes.code === 803) {
            // 这一步会返回cookie
            clearInterval(timer);
            this.$msg.success('登录成功')
          }
          this.$cookie.set("loginStatus", this.statusRes.cookie, 1);
        }
      }, 3000);
    },
  },
};
</script>
<style lang="less" scoped>
.el-aside {
  height: 869px;
  background: #fff;
  .header_log {
    width: 300px;
    height: 60px;
    background: #ec4141;
  }
  ul {
    height: 808px;
  }
}
.el-header {
  height: 300px;
  width: 1602px;
  background: #ec4141;
  .mbx {
    margin: 15px 0;
  }
  .serach {
    margin: 15px 0;
    .seach_box {
      position: relative;
      .radius {
        position: absolute;
        left: -20px;
        top: 0;
        width: 20px;
        height: 32px;
        background-color: #f56c6c;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
      input {
        width: 320px;
        height: 30px;
        border: none;
        color: #fff;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        outline: none;
        background-color: #f56c6c;
      }
      input::placeholder {
        color: #fff;
      }
      div {
        position: absolute;
        right: 60px;
        top: 4px;
        width: 30px;
        height: 30px;
        z-index: 99;
      }
    }
  }
  .loginFont {
    margin: 15px 0 0 500px;
    .el-avatar {
      float: left;
    }
    .font_login {
      margin: 5px 0;
      margin-left: 40px;
      a {
        color: #8f6266;
        font-size: 12px;
      }
    }
  }
  .login_dialog {
    display: flex;
    justify-content: center;
    flex-direction: column;
    h2 {
      text-align: center;
    }
    div {
      text-align: center;
    }
  }
}
.container {
  height: 869px;
}
.el-main {
  width: 100%;
  height: 780px;
  width: 1602px;
  background: #ffffff;
}

.footer {
  display: flex;
  align-items: center;
  bottom: 0px;
  width: 1902px;
  height: 100px;
  // background: #EC4141;
  border-top: 1px solid rgb(216, 215, 215);
  .el-slider__button-wrapper{
    width: 200px;
  }
  .left {
    flex: 2;
    display: flex;
    margin: 10px;
    // border: 1px solid black;
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
    flex: 7;
    // border: 1px solid black;
    display: flex;
    justify-content: center;
    audio{
      width: 100%;
      background: none;
      outline: none;
    }
  }
  .right {
    flex: 1;
    // border: 1px solid black;
    margin: 10px;
    margin-left: 200px;
  }
}
</style>

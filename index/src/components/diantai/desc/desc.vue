<template>
  <div>
    <div class="header">
      <div class="active">
        <img
          v-lazy="authInfo.avatarUrl"
          alt=""
          width="250px"
          style="border-radius: 10px"
        />
      </div>
      <div class="content">
        <div class="top" style="margin-top: 0">
          <el-tag type="danger">播客</el-tag>
          <strong style="margin-left: 10px">{{ authInfo.brand }}</strong>
        </div>
        <div class="top" style="display: flex; align-items: center">
          <img
            v-lazy="authInfo.avatarUrl"
            alt=""
            width="30px;"
            style="border-radius: 50%"
          />
          <a href="#" style="margin-left: 5px; color: cadetblue"
            >{{ authInfo.nickname }}
          </a>
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
                  收藏{{ shareDataList.subCount | wang }}
                </span>
              </div>
            </a>
            <a href="#">
              <div class="left">
                <span>
                  <i class="iconfont icon-fenxiang"></i>
                  分享{{ shareDataList.shareCount | wang }}
                </span>
              </div>
            </a>
          </div>
        </div>
        <div class="top">
          <el-tag type="danger">{{ DJDetailListRadio.category }}</el-tag>
          <span style="margin-left: 10px; color: grey">{{
            DJDetailListRadio.desc
          }}</span>
        </div>
      </div>
    </div>
    <div style="margin-top: 30px">
      <div class="paixu">
        <span>共{{ DJDetailList.length }}期</span>
        <span style="font-size: 12px; color: rgb(172, 170, 170)">
          排序
          <a href="javascript:;" @click="zhengxu">
            <el-tag type="danger" size="mini">正序</el-tag>
          </a>
          <a href="javascript:;" @click="daoxu" style="margin-left: 5px">
            <el-tag type="danger" size="mini">倒叙</el-tag>
          </a>
        </span>
      </div>
      <el-table
        :data="DJDetailList"
        style="width: 100%"
        @row-dblclick="getBack"
        :row-style="rowStyle"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column width="180">
          <template slot-scope="scope">
            <div class="weizhi">
              <a href="#" class="dianji">
                <i
                  class="iconfont icon-yinlequan"
                  style="font-size: 30px; color: #f56c6c"
                ></i>
              </a>
            </div>
            <img
              style="border-radius: 10px"
              v-lazy="scope.row.blurCoverUrl"
              alt=""
              width="80px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="mainSong.name"> </el-table-column>
        <el-table-column width="27px">
          <i class="iconfont icon-yinlequan"></i>
        </el-table-column>
        <el-table-column width="80px" prop="listenerCount">
          <template slot-scope="scope">
            {{ scope.row.listenerCount | wang }}
          </template>
        </el-table-column>
        <el-table-column width="27px">
          <i class="iconfont icon-dianzan"></i>
        </el-table-column>
        <el-table-column width="80px" prop="likedCount"> </el-table-column>
        <el-table-column width="120px" prop="createTime">
          <template slot-scope="scope">
            {{ scope.row.createTime | onlyDate }}
          </template>
        </el-table-column>
        <el-table-column width="80px" prop="duration">
          <template slot-scope="scope">
            {{ scope.row.duration | shichang }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      DJDetailList: [], //电台节目
      authInfo: {}, //作者信息
      sorts: true,
      id: null,
      shareDataList: [], //收藏分享次数
      DJDetailListRadio: {}, //DJ中的简介
    };
  },
  created() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getDJdetail(this.id);
    this.getShareData(this.id);
  },
  methods: {
    // 获取电台详情列表
    async getDJdetail(id) {
      await this.$http
        .get("/dj/program?rid=" + id + "&&asc=" + this.sorts + "&&limit=20000")
        .then((res) => {
          this.DJDetailList = res.data.programs;
          for (let i = 0; i < this.DJDetailList.length; i++) {
            this.DJDetailList[i].id = res.data.programs[i].mainSong.id;
          }
          this.authInfo = this.DJDetailList[0].dj;
          this.DJDetailListRadio = this.DJDetailList[0].radio;
          console.log(this.authInfo);
          console.log(res);
        });
    },
    async getShareData(id) {
      await this.$http.get("/dj/detail?rid=" + id).then((res) => {
        this.shareDataList = res.data.data;
        console.log(res.data.data);
      });
    },

    zhengxu() {
      this.sorts = true;
      console.log(1);
      this.getDJdetail(this.id);
    },
    daoxu() {
      this.sorts = !this.sorts;
      this.getDJdetail(this.id);
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
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
    .top {
      margin-top: 20px;
      .heng {
        display: flex;
        a {
          margin-left: 10px;
          border: 1px solid rgb(172, 170, 170);
          border-radius: 20px;
          width: 120px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #000;
        }
      }
    }
  }
}
.cell {
  position: relative;
  .weizhi {
    position: absolute;
    left: 35px;
    top: 40px;
  }
}
.paixu {
  display: flex;
  justify-content: space-between;
}
</style>

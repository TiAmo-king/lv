<template>
  <div>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second"></el-tab-pane>
    </el-tabs> -->
    <div class="nav_position1">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="全部">
          <el-table
            :data="songAllList"
            @row-dblclick="getBack"
            :row-style="rowStyle"
            stripe
            style="width: 100%"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="album.picUrl" width="150">
              <template slot-scope="scope">
                <el-popover placement="top-start" title="" trigger="hover">
                  <img
                    v-lazy="scope.row.album.picUrl"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    slot="reference"
                    v-lazy="scope.row.album.picUrl"
                    style="width: 100px; height: 100px"
                  />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="name"> </el-table-column>
            <el-table-column prop="artists[0].name" width="180">
            </el-table-column>
            <el-table-column prop="album.name" width="180"> </el-table-column>

            <el-table-column prop="duration" width="100"> </el-table-column>
            <el-table-column width="1">
              <audio :src="this.$store.state.songUrl"></audio>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="华语">
          <el-table
            :data="songZHList"
            @row-dblclick="getBack"
            stripe
            :row-style="rowStyle"
            style="width: 100%"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="album.picUrl" width="150">
              <template slot-scope="scope">
                <el-popover placement="top-start" title="" trigger="hover">
                  <img
                    v-lazy="scope.row.album.picUrl"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    slot="reference"
                    v-lazy="scope.row.album.picUrl"
                    style="width: 100px; height: 100px"
                  />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="name"> </el-table-column>
            <el-table-column prop="artists[0].name" width="180">
            </el-table-column>
            <el-table-column prop="album.name" width="180"> </el-table-column>

            <el-table-column prop="duration" width="100"> </el-table-column>
            <el-table-column width="1">
              <audio :src="this.$store.state.songUrl"></audio>
            </el-table-column> </el-table
        ></el-tab-pane>
        <el-tab-pane label="欧美">
          <el-table
            :data="songEAList"
            @row-dblclick="getBack"
            stripe
            :row-style="rowStyle"
            style="width: 100%"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="album.picUrl" width="150">
              <template slot-scope="scope">
                <el-popover placement="top-start" title="" trigger="hover">
                  <img
                    v-lazy="scope.row.album.picUrl"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    slot="reference"
                    v-lazy="scope.row.album.picUrl"
                    style="width: 100px; height: 100px"
                  />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="name"> </el-table-column>
            <el-table-column prop="artists[0].name" width="180">
            </el-table-column>
            <el-table-column prop="album.name" width="180"> </el-table-column>

            <el-table-column prop="duration" width="100"> </el-table-column>
            <el-table-column width="1">
              <audio :src="this.$store.state.songUrl"></audio>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="韩国">
          <el-table
            :data="songHRList"
            @row-dblclick="getBack"
            stripe
            :row-style="rowStyle"
            style="width: 100%"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="album.picUrl" width="150">
              <template slot-scope="scope">
                <el-popover placement="top-start" title="" trigger="hover">
                  <img
                    v-lazy="scope.row.album.picUrl"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    slot="reference"
                    v-lazy="scope.row.album.picUrl"
                    style="width: 100px; height: 100px"
                  />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="name"> </el-table-column>
            <el-table-column prop="artists[0].name" width="180">
            </el-table-column>
            <el-table-column prop="album.name" width="180"> </el-table-column>

            <el-table-column prop="duration" width="100"> </el-table-column>
            <el-table-column width="1">
              <audio :src="this.$store.state.songUrl"></audio>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="日本">
          <el-table
            :data="songJPList"
            @row-dblclick="getBack"
            stripe
            :row-style="rowStyle"
            style="width: 100%"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="album.picUrl" width="150">
              <template slot-scope="scope">
                <el-popover placement="top-start" title="" trigger="hover">
                  <img
                    v-lazy="scope.row.album.picUrl"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    slot="reference"
                    v-lazy="scope.row.album.picUrl"
                    style="width: 100px; height: 100px"
                  />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="name"> </el-table-column>
            <el-table-column prop="artists[0].name" width="180">
            </el-table-column>
            <el-table-column prop="album.name" width="180"> </el-table-column>

            <el-table-column prop="duration" width="80"> </el-table-column>
            <el-table-column width="1">
              <audio :src="this.$store.state.songUrl"></audio>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabPosition: "top",
      songAllList: [],
      songZHList: [],
      songEAList: [],
      songHRList: [],
      songJPList: [],
    };
  },
  created() {
    this.getSongAllList();
    // this.getshijianchuo()
    this.getSongZHList();
    this.getSongEAList();
    this.getSongHRList();
    this.getSongJPList();
  },
  methods: {
    // 获取所有歌曲列表
    async getSongAllList() {
      await this.$http.get("/top/song?type=0").then((res) => {
        this.songAllList = res.data.data;
        console.log(res.data.data);
        // console.log(this.songList[1].picUrl);
      });
    },
    // 获取华语
    async getSongZHList() {
      await this.$http.get("/top/song?type=7").then((res) => {
        this.songZHList = res.data.data;
        // console.log(this.songList[1].picUrl);
      });
    },
    // 获取欧美
    async getSongEAList() {
      await this.$http.get("/top/song?type=96").then((res) => {
        this.songEAList = res.data.data;
        // console.log(this.songList[1].picUrl);
      });
    },
    // 获取韩国
    async getSongHRList() {
      await this.$http.get("/top/song?type=16").then((res) => {
        this.songHRList = res.data.data;
      });
    },
    // 获取日本
    async getSongJPList() {
      await this.$http.get("/top/song?type=8").then((res) => {
        this.songJPList = res.data.data;
      });
    },
    //
    // 时间戳转换
    shijianchuo() {
      for (let i = 0; i < this.songList.length; i++) {
        var time = new Date(this.songList[i].song.duration);
        var mm = time.getMinutes();
        var s = time.getSeconds();
        this.songList[i].song.duration = mm + ":" + s;
      }
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
  //
};
</script>
<style lang="less" scoped>
.nav_position1 {
  display: flex;
  justify-content: center;
}
.el-tabs {
  width: 1904px;
}
.el-tabs__nav-scroll {
  display: flex;
  align-content: center;
}
</style>

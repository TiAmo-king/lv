<template>
  <div>
    <div>
      <img src="" alt="" />
      <div></div>
    </div>
    <el-table
      @row-dblclick="getBack"
      :row-style="rowStyle"
      @row-click="oneRowData"
      :data="mySong"
      style="width: 100%"
    >
      <el-table-column type="index" width="50">
        <i @click="downSong" class="iconfont icon-xiazai"></i>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题"> </el-table-column>
      <el-table-column label="姓名" width="300">
        <template slot-scope="scope" v-if="scope.row.ar">
          <div>
            {{ scope.row.ar | ararr }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" width="300">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mySong: [],
      songUrl: "",
    };
  },
  mounted() {
    this.getMySongList();
  },
  methods: {
    async getMySongList() {
      await this.$http
        .get("/recommend/songs")
        .then((res) => {
          this.mySong = res.data.data.dailySongs;
          console.log(res);
          console.log(res.data.songs);
        })
        .catch((rej) => {
          this.$msg.error("获取音乐失败", rej);
        });
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
<style lang="less"></style>

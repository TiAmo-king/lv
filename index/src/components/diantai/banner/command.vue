<template>
  <div>
    <!-- 导航栏 -->
    <div class="nav">
      <ul v-if="status">
        <router-link
          :to="{ path: 'hotinfo', query: { cateId: cateListId[i] } }"
          tag="li"
          v-for="(item, i) in cateList"
          :key="i"
        >
          <a href="#" style="color: black">
            <div class="content">
              <div>
                <i :class="iconList[i]"></i>
              </div>
              <div style="margin-top: 10px">
                {{ item.categoryName }}
              </div>
            </div>
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      PayList: [],
      cateList: [],
      cateListId: [],
      hotTypeList: [],
      iconList: [
        "iconfont icon-xylophone",
        "iconfont icon-music_transcript",
        "iconfont icon-Drum",
        "iconfont icon-harp",
        "iconfont icon-Cello",
        "iconfont icon-accordion",
        "iconfont icon-gramophone_record",
        "iconfont icon-note",
        "iconfont icon-Microphone",
        "iconfont icon-harp",
        "iconfont icon-Bass_Drum",
        "iconfont icon-cymbals",
      ],
      status: false,
    };
  },
  created() {
    this.getPayList();
    this.getCateList();
  },
  methods: {
    // 电台分类
    async getCateList() {
      await this.$http.get("/dj/category/recommend").then((res) => {
        this.cateList = res.data.data;
        for (let i = 0; i < this.cateList.length; i++) {
          this.cateListId[i] = res.data.data[i].categoryId;
        }
        this.status = true;
        console.log(this.cateListId);
      });
    },
    // 付费精品
    async getPayList() {
      await this.$http.get("/dj/toplist/pay?limit=30").then((res) => {
        this.PayList = res.data.data.list;
        // console.log(this.PayList);
      });
    },
    // 获取热门数据
    async getHotTypeList(id) {
      await this.$http
        .get("/dj/radio/hot?cateId=" + id + "&limit=100")
        .then((res) => {
          this.hotTypeList = res.data.djRadios;
          console.log(this.hotTypeList);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.nav {
  ul {
    display: flex;
    justify-content: center;

    li {
      margin: 10px;
      height: 90px;
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      .content {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
      }
    }
    li:hover {
      background-color: gainsboro;
    }
  }
}
</style>

<template>
  <div id="HotInfo">
    <div class="info_list">
      <h1 style="font-size: 30px" v-if="status">
        {{ hotTypeList[0].category }}
      </h1>
      <ul class="infinite-list" style="overflow: auto">
        <router-link
          :to="{
            path: 'diantaiInfo',
            query: { id: item.id },
          }"
          tag="li"
          v-for="(item, i) in hotTypeList"
          :key="i"
        >
          <a href="#" style="color: black">
            <div class="all">
              <img v-lazy="item.picUrl" alt="" width="150px" />
              <div>
                <span class="name">{{ item.name }}</span>
                <span class="rcmdtext">{{ item.rcmdtext }}</span>
                <span class="count"
                  >节目：{{ item.programCount }}，订阅：{{
                    item.subCount
                  }}</span
                >
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
  name: "HotInfo",
  data() {
    return {
      hotTypeList: [],
      status: false,
    };
  },
  created() {
    // 接收传过来的参数
    let cateId = this.$route.query.cateId;
    console.log(cateId);
    this.getHotTypeList(cateId);
  },
  methods: {
    // 获取热门数据
    async getHotTypeList(id) {
      await this.$http
        .get("/dj/radio/hot?cateId=" + id + "&limit=100")
        .then((res) => {
          this.hotTypeList = res.data.djRadios;
          this.status = true;
          console.log(this.hotTypeList);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.info_list {
  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      width: 730px;
      margin: 10px;
      .all {
        display: flex;
        div {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          // justify-content: center;
          .name {
            margin-top: 20px;
            font-size: 16px;
          }
          .rcmdtext {
            margin-top: 10px;
            color: grey;
            font-size: 14px;
            line-height: 25px;
          }
          .count {
            color: grey;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>

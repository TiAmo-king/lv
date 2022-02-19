<template>
  <div>
    <div class="cotainer">
      <span> 官方榜 </span>
      <div
        v-for="(item, i) in paihangPicList.slice(0, 4)"
        :key="i"
        class="buju"
      >
        <router-link
          tag="div"
          class="pic"
          :to="{ path: 'songListDetails', query: { item: item } }"
        >
          <a href="javascript:;">
            <div class="newDate">{{ item.updateTime | onlyDate }}更新</div>
            <img
              v-lazy="item.coverImgUrl"
              alt=""
              width="300px"
              style="border-radius: 10px"
            />
          </a>
        </router-link>
        <div class="dataTable">
          <ul v-if="status">
            <li v-for="(info, j) in paihangDataList[i].tracks" :key="j">
              <div style="width: 60px; text-align: center">
                {{ j + 1 }}
              </div>
              <div style="width: 700px">
                {{ info.first }}
              </div>
              <div>
                {{ info.second }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="quanqiu">
      <span> 全球榜 </span>
      <div class="all">
        <ul>
          <router-link
            :key="i"
            v-for="(item, i) in paihangPicList.slice(4, paihangPicList.lenght)"
            tag="li"
            :to="{ path: 'songListDetails', query: { item: item } }"
          >
            <a href="javascript:;" style="color: #000">
              <div class="content">
                <div>
                  <div class="palyCount">
                    <i class="iconfont icon-yinlequan"></i>
                    {{ item.playCount | wang }}
                  </div>
                  <img
                    v-lazy="item.coverImgUrl"
                    alt=""
                    width="150px;"
                    style="border-radius: 10px"
                  />
                </div>
                <div class="font">
                  {{ item.name }}
                </div>
              </div>
            </a>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      paihangPicList: [],
      paihangDataList: [],
      paihangSoongList: [],
      status: false,
    };
  },
  components: {},
  created() {
    this.getPaiHangPicList();
    this.getPaiHangDataList();
  },
  mounted() {},
  methods: {
    // 排行榜图片区域
    async getPaiHangPicList() {
      await this.$http.get("/toplist").then((res) => {
        this.paihangPicList = res.data.list;
      });
    },
    // 排行版数据区域
    async getPaiHangDataList() {
      await this.$http.get("/toplist/detail").then((res) => {
        this.paihangDataList = res.data.list;
        console.log(this.paihangDataList);
        this.status = true;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  .buju {
    display: flex;
    .pic {
      position: relative;
      margin: 40px;
      margin-top: 55px;
      .newDate {
        color: #ffffff;
        position: absolute;
        bottom: 90px;
        left: 80px;
      }
    }
  }
  .dataTable {
    ul {
      width: 1000px;
      margin: 40px;
      margin-top: 55px;
      li {
        display: flex;
        // justify-content: space-between;
        line-height: 50px;
      }
      li:hover {
        background-color: #ccc;
      }
      li:nth-of-type(odd) {
        background-color: #f9f9f9;
      }
      li:nth-of-type(even) {
        background-color: #ccc;
      }
    }
  }
}
.quanqiu {
  .all {
    ul {
      width: 1420px;
      display: flex;
      flex-wrap: wrap;
      // justify-content: center;
      li {
        width: 233px;
        .content {
          position: relative;
          .palyCount {
            color: #fff;
            position: absolute;
            right: 90px;
            top: 2px;
            font-size: 10px;
          }
          .font {
            width: 150px;
          }
        }
      }
    }
  }
}
</style>

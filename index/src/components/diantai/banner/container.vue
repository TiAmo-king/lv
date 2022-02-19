<template>
  <div>
    <!-- 个性推荐 -->
    <div class="gexing">
      <div class="title_more">
        <strong>个性推荐</strong>
        <!-- <a href="#">更多</a> -->
      </div>
      <el-divider></el-divider>
      <ul v-if="status5">
        <router-link
          v-for="(item, i) in personalizeList"
          :key="i"
          :to="{ path: 'diantaiInfo', query: { id: personalizeList[i].id } }"
          tag="li"
        >
          <a href="#">
            <div class="name">{{ item.name }}</div>
            <img v-lazy="item.picUrl" alt="" width="200px" />
            <div class="title">{{ item.rcmdText }}</div>
          </a>
        </router-link>
      </ul>
    </div>
    <!-- 情感 -->
    <div class="gexing" v-if="status1">
      <div class="title_more">
        <strong>情感</strong>
        <router-link
          :to="{
            path: 'hotinfo',
            query: { cateId: qingganType[0].categoryId },
          }"
          >更多</router-link
        >
      </div>
      <el-divider></el-divider>
      <ul>
        <router-link
          v-for="(item1, i1) in qingganType"
          :key="i1"
          :to="{ path: 'diantaiInfo', query: { id: qingganType[i1].id } }"
          tag="li"
        >
          <a href="#">
            <div class="name">{{ item1.name }}</div>
            <img v-lazy="item1.picUrl" alt="" width="200px" />
            <div class="title">{{ item1.rcmdtext }}</div>
          </a>
        </router-link>
      </ul>
    </div>
    <!-- 创作翻唱 -->
    <div class="gexing" v-if="status2">
      <div class="title_more">
        <strong>创作翻唱</strong>
        <router-link
          :to="{
            path: 'hotinfo',
            query: { cateId: chuanZuoType[0].categoryId },
          }"
          >更多</router-link
        >
      </div>
      <el-divider></el-divider>
      <ul>
        <router-link
          v-for="(item2, i2) in chuanZuoType"
          :key="i2"
          :to="{ path: 'diantaiInfo', query: { id: chuanZuoType[i2].id } }"
          tag="li"
        >
          <a href="#">
            <div class="name">{{ item2.name }}</div>
            <img v-lazy="item2.picUrl" alt="" width="200px" />
            <div class="title">{{ item2.rcmdtext }}</div>
          </a>
        </router-link>
      </ul>
    </div>
    <!-- 音乐推荐 -->
    <div class="gexing" v-if="status3">
      <div class="title_more">
        <strong>音乐推荐</strong>
        <router-link
          :to="{
            path: 'hotinfo',
            query: { cateId: musicTuijian[0].categoryId },
          }"
          >更多</router-link
        >
      </div>
      <el-divider></el-divider>
      <ul>
        <router-link
          v-for="(item3, i3) in musicTuijian"
          :key="i3"
          :to="{ path: 'diantaiInfo', query: { id: musicTuijian[i3].id } }"
          tag="li"
        >
          <a href="#">
            <div class="name">{{ item3.name }}</div>
            <img v-lazy="item3.picUrl" alt="" width="200px" />
            <div class="title">{{ item3.rcmdtext }}</div>
          </a>
        </router-link>
      </ul>
    </div>
    <!-- 脱口秀 -->
    <div class="gexing" v-if="status4">
      <div class="title_more">
        <strong>脱口秀</strong>
        <router-link
          :to="{ path: 'hotinfo', query: { cateId: tuoKouXiu[0].categoryId } }"
          >更多</router-link
        >
      </div>
      <el-divider></el-divider>
      <ul>
        <router-link
          v-for="(item4, i4) in tuoKouXiu"
          :key="i4"
          :to="{ path: 'diantaiInfo', query: { id: tuoKouXiu[i4].id } }"
          tag="li"
        >
          <a href="#">
            <div class="name">{{ item4.name }}</div>
            <img v-lazy="item4.picUrl" alt="" width="200px" />
            <div class="title">{{ item4.rcmdtext }}</div>
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
      personalizeList: [],
      qingganType: [],
      chuanZuoType: [],
      musicTuijian: [],
      tuoKouXiu: [],
      gexingId: [],
      qingganId: [],
      chuangzuoId: [],
      musicId: [],
      tuokouxiuId: [],
      status1: false,
      status2: false,
      status3: false,
      status4: false,
      status5: false,
    };
  },
  created() {
    this.getPersonalizeList();
    this.getQingGanTypeList();
    this.getChuanZuoTypeList();
    this.getMusicTuijianList();
    this.getTuoKouXiuList();
  },
  methods: {
    // 个性推荐
    async getPersonalizeList() {
      await this.$http.get("/dj/personalize/recommend").then((res) => {
        this.personalizeList = res.data.data;
        this.status5 = true;
        console.log(this.personalizeList);
      });
    },
    // 情感类
    async getQingGanTypeList() {
      await this.$http.get("/dj/radio/hot?cateId=3&limit=0").then((res) => {
        this.qingganType = res.data.djRadios;
        this.status1 = true;
        console.log(this.qingganType);
      });
    },
    // 创作翻唱
    async getChuanZuoTypeList() {
      await this.$http.get("/dj/radio/hot?cateId=2001&limit=2").then((res) => {
        this.chuanZuoType = res.data.djRadios;
        this.status2 = true;
      });
    },
    // 音乐推荐
    async getMusicTuijianList() {
      await this.$http.get("/dj/radio/hot?cateId=1&limit=7").then((res) => {
        this.musicTuijian = res.data.djRadios;
        this.status3 = true;
      });
    },
    // 脱口秀
    async getTuoKouXiuList() {
      await this.$http.get("/dj/radio/hot?cateId=4&limit=7").then((res) => {
        this.status4 = true;
        this.tuoKouXiu = res.data.djRadios;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.gexing {
  .title_more {
    display: flex;
    justify-content: space-between;
    a {
      color: #000;
    }
  }
  ul {
    display: flex;
    justify-content: center;
    li {
      margin: 0 22px;
      a {
        position: relative;
        .name {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          position: absolute;
          width: 200px;
          z-index: 99;
          bottom: 5px;
          left: 2px;
          color: #fff;
          box-shadow: 5px 5px 20px #000 inset;
        }
        .title {
          color: #000;
          width: 200px;
        }
      }
    }
  }
}
</style>

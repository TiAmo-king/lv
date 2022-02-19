import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    temp: [],
    songList: [], //歌曲列表
    songUrl: "",
    // 搜索
    rowData: [],
    playLists: [], //歌单
    artistList: [], //歌手
    albumList: [], //专辑
    videoList: [], //视频
    djRadio: [], //电台
    userList: [],
    params: 0,
    serachKey: "",
    // 评论
    total: 0,
    hotComment: [],
    comments: [],
    // 视频
    showVisible: false,
    videoUrl: "",
    videoInfo: [],
    videoDetail: {},
    videoRecommend: [],
    // 抽屉
    drawer: false,
    // 列表双击样式
    rowName: "",
    isShow1: false,
    isShow2: false,
    isShow3: false,
  },
  mutations: {
    newSongList(state, data) {
      state.songList = data;
    },
    // 歌曲url
    newsongUrl(state, data) {
      state.songUrl = data;
    },
    // 双击的行数据
    newRowdata(state, data) {
      state.rowData = data;
    },
    newPlayLists(state, data) {
      state.playLists = data;
    },
    newArtistList(state, data) {
      state.artistList = data;
    },
    newAlbumList(state, data) {
      state.albumList = data;
    },
    newVideoList(state, data) {
      state.videoList = data;
    },
    // 电台列表
    newDjRadio(state, data) {
      state.djRadio = data;
    },
    // 用户列表
    newUserList(state, data) {
      state.userList = data;
    },
    // 热门评论
    newHotComment(state, data) {
      console.log(data);
      state.hotComment = data;
    },
    // 最近评论
    newComments(state, data) {
      state.comments = data;
    },
    // 评论总数
    newTotal(state, data) {
      state.total = data;
    },
    // 控制video对话框的打开关闭
    newShowVisible(state, data) {
      state.showVisible = data;
    },
    // videoUrl
    newVideoUrl(state, data) {
      state.videoUrl = data;
    },
    // 视频信息
    newVideoInfo(state, data) {
      state.videoInfo = data;
    },
    // mv评论点赞数
    newVideoDetail(state, data) {
      state.videoDetail = data;
    },
    // 推荐视频
    newVideoRecommend(state, data) {
      state.videoRecommend = data;
    },
    // 抽屉状态
    newDrawer(state, data) {
      state.drawer = data;
    },
    newRowName(state, data) {
      state.rowName = data;
    },
    newIsShow1(state, data) {
      state.isShow1 = data;
    },
    newIsShow2(state, data) {
      state.isShow2 = data;
    },
    newIsShow3(state, data) {
      state.isShow3 = data;
    },
  },

  actions: {
    // 搜索音乐
    async serachSong(context, params) {
      await axios("search?keywords=" + params).then((res) => {
        console.log(res.data.result.songs);
        context.commit("newSongList", res.data.result.songs);
      });
      // 歌手
      await axios("search?keywords=" + params + "&type=100").then((res) => {
        console.log(res.data.result.artists);
        context.commit("newIsShow1", true);
        context.commit("newArtistList", res.data.result.artists);
      });
      // 用户
      await axios("search?keywords=" + params + "&type=1002").then((res) => {
        // console.log(res.data.result.userprofiles);
        context.commit("newUserList", res.data.result.userprofiles);
      });
      // 专辑
      await axios("search?keywords=" + params + "&type=10").then((res) => {
        // console.log(res.data.result.albums);
        context.commit("newAlbumList", res.data.result.albums);
      });
      // 歌单
      await axios("search?keywords=" + params + "&type=1000").then((res) => {
        context.commit("newPlayLists", res.data.result.playLists);
      });
      // 视频
      await axios("search?keywords=" + params + "&type=1014").then((res) => {
        // console.log(res.data.result.videos);
        context.commit("newVideoList", res.data.result.videos);
      });
      // 电台
      await axios("search?keywords=" + params + "&type=1009").then((res) => {
        context.commit("newDjRadio", res.data.result.djRadios);
        context.commit("newIsShow2", true);
      });
    },
    // 双击播放
    getBack(context, row) {
      axios("check/music?id=" + row.id)
        .then((res) => {
          console.log(res.data);
          axios("song/url?id=" + row.id).then((res1) => {
            console.log(res1.data.data[0].url);
            context.commit("newsongUrl", res1.data.data[0].url);
            context.commit("newRowdata", row);

            console.log(this.state.rowData);
          });
        })
        .catch((error) => {
          this.$msg.error(error);
        });
    },
    // 打开播放列表
    showDraw(context) {
      context.commit("newDrawer", true);
    },
    //
    getMySongList(context) {
      axios("/artist/songs?id=9612").then((res) => {
        context.commit("newSongList", res.data.songs);
      });
    },
  },

  modules: {},
});

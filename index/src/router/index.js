import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/tuijian",
    },
    {
      path: "/index",
      name: Index,
      component: Index,
      children: [
        {
          path: "/shipin",
          redirect: "/vedio",
          component: () => import("../components/shipin/index.vue"),
          name: "shipin",
          children: [
            {
              path: "/vedio",
              name: "vedio",
              component: () => import("../components/shipin/shipin/vedio.vue"),
              children: [
                {
                  path: "/spcommand",
                  name: "spcommand",
                  component: () =>
                    import("../components/shipin/shipin/command.vue"),
                },
              ],
            },
            {
              path: "/mv",
              name: "mv",
              component: () => import("../components/shipin/mv/MV.vue"),
            },
          ],
        },
        {
          path: "/mysong",
          name: "MySong",
          component: () => import("../components/mysong/MySong.vue"),
        },
        {
          path: "/yinyueguan",
          redirect: "/tuijian",
          name: "YinYueGuan",
          component: () => import("../components/yinyueguan/yinyueguana.vue"),
          children: [
            {
              path: "/tuijian",
              // name:tuijian,
              component: () =>
                import("../components/yinyueguan/nav/tuijian.vue"),
            },
            {
              path: "/gedan",
              // name:gedan,
              component: () =>
                import("../components/yinyueguan/nav/gedan/gedan.vue"),
              children: [
                {
                  path: "/gedaninfo",
                  // name:gedan,
                  component: () =>
                    import(
                      "../components/yinyueguan/nav/gedan/gedanInfo/gedanInfo.vue"
                    ),
                },
              ],
            },
            {
              path: "/dingzhi",
              // name:dingzhi,
              component: () =>
                import("../components/yinyueguan/nav/dingzhi.vue"),
            },
            {
              path: "/newsongs",
              // name:newsongs,
              component: () =>
                import("../components/yinyueguan/nav/newsongs.vue"),
            },
          ],
        },
        {
          path: "/diantai",
          name: Index,
          component: () => import("../components/diantai/index.vue"),
        },
        {
          path: "/hotinfo",
          name: "HotInfo",
          component: () => import("../components/diantai/HotInfo.vue"),
        },
        {
          path: "/diantaiInfo",
          component: () => import("../components/diantai/desc/desc.vue"),
        },
        {
          path: "/paihang",
          component: () => import("../components/paihangbang/index.vue"),
        },
        {
          path: "/serach",
          name: "serach",
          component: () => import("../components/serach/Serach.vue"),
          children: [],
        },
        {
          path: "/playlist",
          name: "playlist",
          component: () => import("../components/serach/playlist/playlist.vue"),
        },
        {
          path: "/seachMV",
          name: "seachMV",
          component: () => import("../components/serach/mv/mv.vue"),
        },
        {
          path: "/songListDetails",
          name: "songListDetails",
          component: () => import("../components/command/songList.vue"),
        },
        {
          path: "/phbDesc",
          name: "phbDesc",
          component: () => import("../components/paihangbang/command/desc.vue"),
        },
      ],
    },
  ],
});

// router.beforeEach((to,from,next)=>{

//   if(to.path==='/songListDetails'){
//     const val = this.$route.query.item
//     if(val === ''){
//       return next(this.$router.go(-1))
//     }
//     next()
//   }
// })

export default router;

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/global.css";
import "./assets/icon/iconfont.css";
import Vuex from "vuex";
import ElementUI, { Message } from "element-ui";
import cookie from "vue-cookies";
import VueLazyload from "vue-lazyload";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import 'lib-flexible/flexible'
Vue.use(cookie);
// 配置cookieimport cookie from 'vue-cookie'
Vue.prototype.$cookie = cookie;
//配置时候prototype.$这里的名字自己定义不是固定是cookie
Vue.prototype.$msg = Message;
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true; //允许跨域
axios.defaults.baseURL = "http://localhost:3000/"; //设置请求头部
Vue.prototype.$http = axios; //把axios挂载到Vue原型

// 时间过滤器
Vue.filter("dateFormat", (shijianchuo) => {
  const dt = new Date(shijianchuo);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");
  const h = (dt.getHours() + "").padStart(2, "0");
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  const s = (dt.getSeconds() + "").padStart(2, "0");
  return `${y}-${m}-${d}-${h}:${mm}:${s}`;
});
// 日期
Vue.filter("onlyDate", (shijianchuo) => {
  const dt = new Date(shijianchuo);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");
  return `${y}-${m}-${d}`;
});
// 时长
Vue.filter("shichang", (shijianchuo) => {
  const dt = new Date(shijianchuo);
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  const s = (dt.getSeconds() + "").padStart(2, "0");
  return `${mm}:${s}`;
});
// 简化次数单位
Vue.filter("wang", (count) => {
  if (count > 100000) {
    count = count / 10000;
    return parseInt(count) + "万";
  } else {
    return count;
  }
});
Vue.filter("ararr", (ar) => {
  if (ar[1] === undefined) return ar[0].name;
  return ar[0].name + "/" + ar[1].name;
});

// 图片懒加载
Vue.use(VueLazyload);
// 配置项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "dist/error.png",
  loading: "dist/loading.gif",
  attempt: 1,
});

// 请求拦截器
axios.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});
axios.interceptors.response.use((config) => {
  NProgress.done();
  return config;
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

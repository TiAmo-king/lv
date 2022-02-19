<template>
  <div>
    <banner></banner>
    <command></command>
    <comtainer-list></comtainer-list>
  </div>
</template>
<script>
import Banner from "./banner/Banner.vue";
import Command from "./banner/command.vue";
import comtainerList from "./banner/container.vue";
export default {
  data() {
    return {};
  },
  components: {
    Banner,
    Command,
    comtainerList,
  },
};
</script>
<style lang="less" scoped></style>

<template>
  <div>
    <video-dialog></video-dialog>
  </div>
</template>

<script>
import videoDialog from "../../command/videoDialog.vue";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    videoDialog,
  },
  created() {
    let vid = this.$route.query.mvId;
    console.log(vid);
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped></style>

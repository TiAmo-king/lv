<template>
  <div>
    <el-table @row-dblclick="getBack" :data="mySong" style="width: 100%">
      <el-table-column type="index" width="50">
        <i class="iconfont icon-xiazai"></i>
      </el-table-column>
      <el-table-column type="index" width="50">
        <i class="iconfont icon-xiazai"></i>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题"> </el-table-column>
      <el-table-column prop="ar[0].name" label="姓名" width="300">
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" width="300">
      </el-table-column>
      <el-table-column width="300">
        <audio :src="songUrl" autoplay></audio>
      </el-table-column>
    </el-table>
  </div>
</template>

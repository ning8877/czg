<template>
  <el-container style="height:100%">
    <el-aside width="auto">
      <CommonAside></CommonAside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <CommonHeader></CommonHeader>
      </el-header>
      <el-main style="padding:30px">
        <keep-alive>
          <router-view> </router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>


<style scoped>
.header{
  padding:0;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  background-color:#fff;
}
</style>

<script>
  import CommonAside from '../components/CommonAside'
  import CommonHeader from '../components/CommonHeader'
  export default {
    components: {
      CommonAside,
      CommonHeader,
    },
  }
</script>

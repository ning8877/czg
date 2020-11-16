<template>
  <div id="app">
    <el-container style="height:100%" v-if="$route.path!=='/login'">
      <!-- aside -->
      <el-aside width="auto">
        <CommonAside></CommonAside>
      </el-aside>

      <el-container>
        <!-- header -->
        <el-header class="header">
          <CommonHeader></CommonHeader>
        </el-header>
        <!-- main -->
        <el-main style="padding:20px">
          <transition name="slide-fade" mode="out-in">
            <router-view> </router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-if="$route.path=='/login'"></router-view>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside'
import CommonHeader from '@/components/CommonHeader'
export default {
  components: {
    CommonAside,
    CommonHeader,
  },
}

</script>

<style lang="scss">
#app{
  height: 100vh;
  .header{
    padding:0;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    background-color:#fff;
    z-index: 9;
  }
  .slide-fade-enter-active {
    transition: all .6s ease;
  }
  .slide-fade-leave-active {
    transition: all .6s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(100px);
    opacity: 0;
  }
}
</style>


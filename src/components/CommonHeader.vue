<template>
  <el-header class="common-header">
    <!-- 左侧 当前路径 -->
    <div class="l-content">
      <el-breadcrumb>
        <el-breadcrumb-item :to="current.path" v-if="current">
          <span class="current">{{current.label}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

   <!-- 右侧 username和退出 -->
    <div class="r-content">
      <div class="info">
        <span class="name">{{username}}</span>
      </div>
      <el-tooltip content="退出" placement="bottom" effect="dark">
        <i class="el-icon-switch-button" @click="logOut"></i>
      </el-tooltip>
    </div>

  </el-header>
</template>

<style lang="scss" scoped>
.common-header{
  display: flex;
  height: 100%;
  width: 100%;
  min-width: 750px;
  justify-content: space-between;
  align-items: center;

  .l-content{
    display: flex;
    align-items: center;
    width: 300px;
    min-width: 200px;

    /* 当前的路径 */
    .current{
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      color:#000;
      &:hover{
        color:rgba(52, 55, 68,.8);
      }
    }
  }

  .r-content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name{
      color: #ff903d;
      font-size: 16px;
    }
    /* 退出按钮 */
    .el-icon-switch-button:before{
      cursor: pointer;
      width: 22px;
      margin:0 15px;
    }
  }
}
</style>

<script>
import { mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      current: state =>state.header.curMenu,
      username:state =>state.user.username
    }),
  },
  methods: {
    logOut(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$store.commit('clearUsername') 
      localStorage.clear()
      this.$router.push({name:'login'})
    }
  },
  created(){
    this.$store.commit('getUsername')
    this.$store.commit('getCurMenu')
  }
}
</script>
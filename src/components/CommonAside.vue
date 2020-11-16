<template>
    <el-menu :default-active="$route.path" router class="el-menu-vertical-demo"
      background-color="#343744" text-color="#bfcdb9" active-text-color="#ff903d" 
      style="height: 100%; border-right:0">
        <div class="logo">
          <img :src="logoImg" alt="餐掌柜" class="logoImg">
        </div>
        <!-- 不存在子节点的侧边栏 -->
        <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>

        <!-- 存在子节点的侧边栏 -->
        <el-submenu index="index" v-for="(item,index) in hasChildren" :key="index" @click="clickMenu(item)">
            <template slot="title">
              <i :class="'el-icon-'+item.icon"></i>
              <span>{{item.label}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children"
                  :key="subIndex" @click="clickMenu(subItem)" style="padding-left:46px;">
                  <span>{{subItem.label}}</span>
              </el-menu-item>
            </el-menu-item-group>
        </el-submenu>

    </el-menu>
</template>

<style lang="scss">
.el-menu{
  height: 100%;
  border: 0;
  h3{
      color:#ffffff;
      text-align:center;
      line-height:48px;
  }
  .logo{
      height: 60px;
      width: 200px;
      padding: 12px 5px;
      background-color: #ffcfac;
      text-align: center;
      .logoImg{
          width:122.5px
      }
  }
  .el-menu-item.is-active {
    background-color: #EAEEFF;
  }
}
</style>
<script>
export default {
  computed:{
    noChildren(){
      return this.asideMenu.filter(item => !item.children);
    },
    hasChildren(){
      return this.asideMenu.filter(item => item.children);
    },
  },
  data(){
      return {
        logoImg:require('../assets/images/logo.png'),
        asideMenu:[
          {
            name:'asd',
            label:'集团管理',
            icon:'food',
            children:[
              {
                path:'/brand',
                name:'brand',
                label:'品牌管理'
              },
              {
                path:'/store',
                name:'store',
                label:'门店管理'
              },
              {
                path:'/storeManager',
                name:'storeManager',
                label:'店长管理'
              }
            ]
          }
        ] 
      }
    }, 
  methods: {
    clickMenu(item) {
      this.$store.commit('setCurMenu',item)
    }
  },
}
    
</script>


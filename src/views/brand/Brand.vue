<template>
  <div class="brand">    
    <div class="brandList">
      <div class="list">
          <!-- 添加品牌 -->
        <div class="item item_add" @click="addBrand">
          <div class="add">+</div>
          <div class="add_text">添加品牌</div>
        </div>

        <!-- 品牌列表 -->
        <div class="item" v-for="(item, index) in list" :key="index">
          <!-- 品牌logo -->
          <div class="img" style="width: 100%; height: 150px; overflow: hidden;">
            <img :src="item.logo==''?logo:item.logo" class="image">
          </div>
          <!-- 品牌信息 -->
          <div>
            <div class="brandNameText">{{item.brandName}}</div>
            <div class="info">{{item.info}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.el-main{
  padding-top:0;
}
.brand{
  overflow: hidden;
  min-width: 750px;
  min-height: 100%;
  .brandList{
    .list{
      padding:0;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      z-index: 1;
      .item{
        margin: 1%;
        width:18%;
        min-height: 270px;
        box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 12px;
        line-height: 2;
        padding: 15px;
        border-radius: 3px;
        background: rgb(255, 255, 255);
        text-align: center;
        .img{
          width: 100%; 
          height: 150px; 
          overflow: hidden;
          .image{
            width: 100%;;
          }
        }
        .brandNameText{
          color: rgb(32, 35, 42);
          font-size: 16px;
          line-height: 50px;
        }
        .info{
          width: 100%;
          font-size: 13px;
          line-height: 20px;
          color: rgb(129, 134, 147);
        }
      }
      .item_add{
        /* 添加新的品牌 */
        .add{
          display: inline-block;
          width: 66px;
          height: 66px;
          font-size: 52px;
          color: rgb(255, 255, 255);
          line-height: 66px;
          margin-top: 60px;
          background: rgb(129, 134, 147);
          border-radius: 100%;
        }
        .add_text{
          color: rgb(32, 35, 42);
          font-size: 16px;
          line-height: 50px;
        }
        &:hover{
          cursor: pointer;
          .add{
            background-color:rgb(255, 144, 61);
          }
          .add_text{
            color:rgb(255, 144, 61);
          }
        }
      }
    }
  }
}

</style>

<script>

import {_brand} from '@/api/brand'
export default {
  data() {
    return {
    logo:'http://canzg-wsl.itheima.net/web/img/img_brand01@2x.2afaf10d.png',
    input:'',
    config:{
        pagesizes:[10, 20, 30, 40],
        pagesize:10,
        page:1,
        total:0,
    },
    list:[],
    }
  },
  methods:{
    addBrand(){
      this.$router.push("/addBrand")
    },
    getList(){
      let page =1
      let pageSize = 100
      _brand(page,pageSize).then(res=>{
        if(res.data.code == 200 && res.data.data.counts>0){
          res = res.data
          this.list = []
          res.data.items.map(item=>{
            this.list.push(item)
          })
          this.config.total = res.data.counts
        }
      }).catch(err=>{
        throw(err)
      })
    },
  },
  created(){
    this.getList()
  }
}
        
</script>
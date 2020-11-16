<template>
  <div class="store-manager">  
      <!--header  -->
    <div class="store-manager-header">
      <el-input v-model.trim="criteria"  size="small" placeholder="请输入店长联系方式或姓名" @keyup.enter.native="search">
         <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
      </el-input>
      <el-button type="primary"  size="small" @click="add" style="color:#fff">+添加</el-button>
    </div>
      <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" stripe :header-cell-style="{'font-weight':'600px'}">
        <el-table-column  v-for="item in tableLabel"  :label="item.label"  
          :key="item.prop" :prop="item.prop" show-overflow-tooltip>
        </el-table-column>
        <!--操作栏 -->
        <el-table-column  class="operate" width="200" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="medium" style="color:#419eff" @click="handleEdit(scope.row.storeManagerId)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="medium" style="color:#f56c6c"  
                @click="handleChange(scope.row)">{{scope.row.status==1?'停用':'启用'}}</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="medium" style="color:#f56c6c" @click="handleDelete(scope.row)">
                删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination  class="pagination" :config = "config"
          @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="config.page"   layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="config.pagesizes" :page-size="config.pagesize" :total="config.total"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {_store,_changeStatus, _delStoreM,_search} from '@/api/storeM'
import '@/assets/scss/common.scss'
export default {
  data() {
    return {
      criteria:'',
      config:{
        pagesizes:[10, 20, 30, 40],
        pagesize:10,
        page:1,
        total:0,
      },
      //表格列名及引用的数据
      tableLabel:[
        {
          model:'storeManagerName',
          prop:'storeManagerName',
          label:'店长姓名'
        },
        {
          model:'storeManagerPhone',
          prop:'storeManagerPhone',
          label:'联系方式'
        },
        {
          model:'storeNames',
          prop:'storeNames',
          label:'所属店面',
        },
        {
          model:'statusLabel',
          prop:'statusLabel',
          label:'账号状态',
        },
      ],
      //表格数据
      tableData:[],
    }
  },
  methods:{
    // 改变分页的条数
    handleSizeChange(val) {
      this.config.pagesize = val
      this.getList(this.config.page,this.config.pagesize)
    },
    // 改变分页的页数
    handleCurrentChange(val) {
      this.config.page = val
      this.getList(this.config.page,this.config.pagesize)
    },
    add(){
      this.$router.push("./addStoreM")
    },
    handleEdit(id){
      this.$router.push({path:"./editStoreM", query: {id:id}})
    },
    // 获取列表
    getList(page,pageSize){
      _store(page,pageSize).then(res=>{
        res = res.data
        this.tableData =res.data.items.map(item=>{
          item.statusLabel = item.status == 1?"启用":"停用"
          item.storeNames =''
          if(item.stores !== null && item.stores.length >0){
            item.stores.forEach((tt,index)=>{
              item.storeNames +=  tt.storeName + '、'
            })
            item.storeNames = item.storeNames.substring(0,item.storeNames.length-1)  
          }
          return item
        })
        this.config.total = res.data.counts
        }).catch(err=>{
            throw(err)
        })
    },

    // 根据名字或联系方式查询
    search(){
      if(this.criteria == ''){
        this.getList(this.config.page,this.config.pagesize)
      }else{
        _search(1,10,this.criteria).then(res=>{
          if(res && res.data){
            res= res.data
            this.tableData =res.data.items.map(item=>{
              item.statusLabel = item.status == 1?"启用":"停用"
              item.storeNames =''
              if(item.stores !== null && item.stores.length >1){
                  item.stores.forEach((tt,index)=>{
                      item.storeNames += tt.storeName + '、'
                  })  
              }else{
                  item.storeNames = item.stores[0].storeName
              }
              return item
          })
          }
        }).catch(err=>{
          throw(err)
        })
      }
    },
    // 修改店长的状态
    handleChange(row){
      this.$confirm('是否调整店长的状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          let id = row.storeManagerId
          let status = row.status==0?1:0
          _changeStatus(id,status).then(res=>{
            if(res && res.data){
              res = res.data
              if(res.code === 200 ){
                this.$message({type: 'success',message: '更改成功!'});
                this.getList(this.config.page,this.config.pagesize)
              }else{
                this.$message({type: 'success',message: res.message});
              }
            }
          }).catch(err=>{
              throw(err)
          })         
      });
    },

    // 删除
    handleDelete(row){
      this.$confirm('确定删除该店长?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _delStoreM( row.storeManagerId).then(res=>{
          if(res && res.data){
            res = res.data
            if(res.code ==200){
              this.$message({type: 'success',message:"删除成功"});
              this.getList(this.config.page,this.config.pagesize)
            }else{
              this.$message({type: 'error',message:res.message});
            }
          }
        }).catch(err=>{
            throw(err)
        })     
      });
    }

  },
  created(){
    this.getList(this.config.page,this.config.pagesize)
  }
}
</script>


<style lang="scss" scoped>
.store-manager{
  height: auto;
  min-height: 500px;
  background-color: #fff;
  padding: 15px 14px;
  overflow: hidden; 

  &-header{
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 650px;
    width: 100%;
    .el-input{
      width: 250px;
    }
  }
  .table{
    .operate{
      min-width:230px;
    }
    .pagination{
      width:100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
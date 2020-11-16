<template>
  <div class="store">  
    <!-- header -->
    <div class="store-header">
      <el-input size="small" placeholder="请输入门店名称" v-model.trim="name" @keyup.enter.native="searchByName">
        <i slot="prefix" class="el-input__icon el-icon-search" @click="searchByName"></i>
      </el-input>
      <el-button type="primary" size="small" @click="add" style="color:#fff">+添加</el-button>
    </div>

    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" stripe :header-cell-style="{'font-weight':'600px'}">
        <el-table-column  v-for="item in tableLabel"  :label="item.label"  
          :key="item.prop" :prop="item.prop" show-overflow-tooltip>
        </el-table-column>

        <!-- 操作栏 -->
        <el-table-column class="operate" width="200" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" style="color:#f56c6c"  
                @click="disabled(scope.row)">{{scope.row.status==0?"开业":"停业"}}</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="small" style="color:#419eff" @click="handleEdit(scope.row.storeId)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="small" style="color:#f56c6c" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
        <!-- 分页 -->
      <el-pagination  :config = "config" class="pagination"
        @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="config.page"   layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="config.pagesizes" :page-size="config.pagesize" :total="config.total">
      </el-pagination>

    </div>
  </div>
</template>


<script>
import {_store,_delStore,_disabled,_searchByName} from '@/api/store'
export default {
  data() {
    return {
      name:'',
      config:{
        pagesizes:[10, 20, 30, 40],
        pagesize:10,
        page:1,
        total:0,
      },
      tableLabel:[
        {
          model:'storeName',
          prop:'storeName',
          label:'门店名称'
        },
        {
          model:'brandName',
          prop:'brandName',
          label:'所属品牌'
        },
        {
          model:'category',
          prop:'category',
          label:'所属业态',
        },
        {
          model:'address',
          prop:'address',
          label:'详细地址',
        },
        {
          model:'contact',
          prop:'contact',
          label:'负责人',
        },
        {
          model:'contactPhone',
          prop:'contactPhone',
          label:'门店电话',
        },
        {
          model:'statusLabel',
          prop:'statusLabel',
          label:'门店状态',
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
    // 改变分页 的页数
    handleCurrentChange(val) {
      this.config.page = val
      this.getList(this.config.page,this.config.pagesize)
    },
    add(){
      this.$router.push('./addStore')
    },
    handleEdit(id){
      this.$router.push({path:'./editStore',query:{id:id}})
    },
    // 获取店铺列表
    getList(page,pageSize){
      _store(page, pageSize).then(res=>{
        res = res.data
        this.tableData =res.data.items.map(item=>{
          item.statusLabel = item.status == 1?"开业":"停业"
          item.brandName = item.brand.brandName
          item.category = item.brand.category
          return item
        })
        this.config.total = res.data.counts
      }).catch(err=>{
        throw(err)
      })
    },
    // 根据店铺名称进行搜索
    searchByName(){
      if(this.name == ''){
        this.getList(this.config.page,this.config.pagesize)
      }else{
        _searchByName(1,10,this.name).then(res=>{
          res = res.data
          this.tableData =res.data.items.map(item=>{
            item.statusLabel = item.status == 1?"开业":"停业"
            item.brandName = item.brand.brandName
            item.category = item.brand.category
            return item
          })
          this.config.total = res.data.counts
        }).catch(err=>{
          throw(err)
        }) 
      }
    },
    // 禁用或者启用店铺
    disabled(row){
      this.$confirm('是否调整门店的状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          let id = row.storeId
          let status = row.status==1? 0:1
          _disabled(id,status).then(res=>{
              res = res.data
              if(res.code === 200 ){
                this.$message({type: 'success',message: '门店状态更改成功!'});
                this.getList(this.config.page,this.config.pagesize)
              }else{
                this.$message({type: 'error',message: res.message});
              }
          }).catch(err=>{
              throw(err)
          })         
      });
    },

    // 删除店铺
    handleDelete(row){
      this.$confirm('确定删除该店铺?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = row.storeId
        _delStore(id).then(res=>{
          res = res.data
          if(res.code == 200){
            this.$message({type: 'success',message: '删除成功!'});
            this.getList(this.config.page,this.config.pagesize)
          }else{
            this.$message({type:'success',message: res.message});
          }
        }).catch(err=>{
            throw(err)
        })     
      });
    },

      // 获取门店省份信息
      // GET /store/listProvince
      getProvince(){
          this.$http.get('/store/listProvince').then(res=>{
              res = res.data
            if(res.code ==200) {
                this.province_option = res.data
                this.province_option.unshift("全部")
            }
          })
      },
          // GET /store/getStoreByProvince/{province}
      getStoreByProvince(){
          if(this.province !=="全部"){
              this.$http.get('/store/getStoreByProvince/'+this.province).then(res=>{
                  res = res.data
                  if(res.code ==200){
                      this.tableData =res.data
                  }
              })
          }else{
              this.getList()
          }
      },
  },
  created(){
    this.getList(this.config.page,this.config.pagesize)
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/common.scss';
</style>
<style lang="scss" scoped>
.store{
  height: auto;
  min-height: 500px;
  background-color: #fff;
  padding: 15px 14px;
  overflow: hidden; 

  &-header{
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    min-width: 650px;
    width: 100%;
    align-items: center;

    .el-input{
      width: 250px;
    }
  }
  .table{
    /* 操作 */
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
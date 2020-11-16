<template>
  <div class="editStore">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      
      <el-form-item label="门店名称:" prop="storeName">
        <el-input size="small" v-model="ruleForm.storeName" placeholder="请输入门店名称"></el-input>
      </el-form-item>

      <el-form-item label="所属品牌:" prop="brandId">
        <el-select  size="small" v-model="ruleForm.brandId" placeholder="请选择所属品牌">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="地区:" required>
        <area-cascader v-model="ruleForm.selected" :data="pca" type="text"  placeholder="请选择地区"></area-cascader>
      </el-form-item>

      <el-form-item label="联系人:" prop="contact">
        <el-input  size="small" v-model="ruleForm.contact"  placeholder="请输入门店负责人"></el-input>
      </el-form-item>

      <el-form-item label="联系电话:" prop="contactPhone">
        <el-input  size="small" v-model="ruleForm.contactPhone"  placeholder="请输入联系方式"></el-input>
      </el-form-item>

      <el-form-item label="详细地址:" prop="address">
          <el-input autosize size="small" type="textarea"  v-model="ruleForm.address"  placeholder="建议您如实填写详细地址，例如街道名称，门牌号，楼层和房间号码等"></el-input>
      </el-form-item>
    </el-form>

    <div class="btn">
      <el-button  size="small" type="plain"  @click="cancel">取消</el-button>
      <el-button  size="small" type="primary" @click="saveForm('ruleForm')">保存</el-button>
    </div>

  </div>
</template>

<script>
import { AreaCascader } from "vue-area-linkage"
import { pca } from 'area-data';

import {_brand} from '@/api/brand'
import {_searchById,_add,_update} from '@/api/store'
export default {
    data() {
      return {
        options:'',
        pca:pca,
        ruleForm: {
          storeId:this.$route.query.id,
          brandId:'',
          storeName:'',
          contact: '',
          contactPhone:'',
          province:'',
          city: '',
          area: '',
          address:'',
          selected:[],
        },
        rules: {
          brandId:[
            { required: true, message: '请选择所属品牌', trigger: 'change' },
          ],
          storeName: [
            { required: true, message: '请输入门店名称', trigger: 'blur' },
          ],
          contact: [
            { required: true, message: '请输入门店负责人', trigger: 'blur' }
          ],
          contactPhone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '请选择地区', trigger: 'change' }
          ],
          area: [
            { required: true, message: '请输入详细地址', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      // 保存
      saveForm(formName) {
        if(this.ruleForm.selected){
          this.ruleForm.province = this.ruleForm.selected[0]
          this.ruleForm.city = this.ruleForm.selected[0]
          this.ruleForm.area = this.ruleForm.selected[1]
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _update(this.ruleForm).then(res=>{
              res = res.data
              if(res.code === 200){
                this.$message({type:'success',message:"更新成功"})
                this.$router.back()
              }else{
                 this.$message({type:'error',message:res.message})
              }
            }).catch(err=>{
              throw(err)
            })
          }
        });
      },
    
      cancel() {
        this.$router.back();
      },
      searchById(id){
        _searchById(id).then(res=>{
          if(res && res.data){
            res = res.data
            for(let item in this.ruleForm){
              if(item !="brandId" || item !="selected"){
                this.ruleForm[item] =  res.data[item]
              }
            }
            this.ruleForm.brandId = res.data.brand.brandId
            console.log(this.ruleForm.city,this.ruleForm.area)
            if(this.ruleForm.city){
              this.ruleForm.selected = [this.ruleForm.city,this.ruleForm.area]
            }
          }
        })
      },
      getBrandList(){
        _brand(1,100).then(res=>{
          if(res.data.code == 200 && res.data.data.counts>0){
            res = res.data
            this.options = []
            res.data.items.map(item=>{
              this.options.push({value:item.brandId,label:item.brandName})
            })
          }
        }).catch(err=>{
          throw(err)
        })
      },
    },

  created(){
    this.getBrandList()
    this.searchById(this.$route.query.id)
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

.area-select.large{
  width: 250px;
}
.area-select .area-selected-trigger{
  padding:0px 15px;
  line-height: 32px;
}
</style>

<style lang="scss" scoped>
.editStore{
  background-color: #fff;
  width: 100%;
  min-width: 750px;
  padding: 15px;

  .el-form{
    width: 80%;
    min-width: 550px;
    padding-left:60px;
    margin-bottom: 20px;
    .el-input{
      width: 250px;
    }
    .el-input--suffix{
      .el-input__inner{
        padding-right:65px;
      }
    } 
  }
  .btn{
    display: flex;
    justify-content: center;
    padding-top:15px;
    border-top: 1px solid #f3f3f3;
  }
}
</style>
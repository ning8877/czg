import request from './request'

// 获取品牌列表
export function _brand(page,pageSize){
  return request({
    url:`/brand/pageList/${page}/${pageSize}`,
    method:'get',
    params:{page:page,pageSize:pageSize}
  })
}

//上传图片
export function _fileUpload(params){
  return request({
    url:'/fileUpload',
    method:'post',
    data:params
  })
}

//添加品牌信息
export function _addBrand(params){
  return request({
    url:'/brand/add',
    method:'post',
    data:params
  })
}
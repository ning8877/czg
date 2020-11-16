import request from './request'

// 获取列表
export function _store(page,pageSize){
  return request({
    url:`/store/pageList/${page}/${pageSize}`,
    method:'get',
    params:{page:page,pageSize:pageSize}
  })
}
// 删除店铺
export function _delStore(storeId){
  return request({
    url:`/store/del/${storeId}`,
    method:'delete',
    params:{id:storeId}
  })
}


//更新店铺状态
export function _disabled(storeId,status){
  return request({
    url:`/store/disabled/${storeId}/${status}`,
    method:'put',
    data:{id:storeId,status:status}
  })
}
//编辑店铺信息
export function _update(storeInfo){
  return request({
    url:'/store/update',
    method:'put',
    data:storeInfo
  })
}
//添加店铺
export function _add(storeInfo){
  return request({
    url:`/store/add/`,
    method:'post',
    data:storeInfo
  })
}

//根据id查询信息
export function _searchById(storeId){
  return request({
    url:`/store/${storeId}`,
    method:'get',
    data:{id:storeId}
  })
}
//根据店铺名称查询信息
export function _searchByName(page,pageSize,name){
  return request({
    url:`/store/search/${page}/${pageSize}/${name}`,
    method:'get',
    params:{page:page,pageSize:pageSize,name:name},
    data:{page:page,pageSize:pageSize,name:name}
  })
}
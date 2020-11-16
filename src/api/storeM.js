import request from './request'

// 获取列表
export function _store(page,pageSize){
  return request({
    url:`/storeManager/pageList/${page}/${pageSize}`,
    method:'get',
    params:{page:page,pageSize:pageSize}
  })
}
//根据id查询店长信息
export function _searchById(storeManagerId){
  return request({
    url:`/storeManager/${storeManagerId}`,
    method:'get',
    data:{id:storeManagerId}
  })
}
// 删除店长
export function _delStoreM(storeManagerId){
  return request({
    url:`/storeManager/del/${storeManagerId}`,
    method:'delete',
    params:{id:storeManagerId}
  })
}


//更新店长状态
export function _changeStatus(storeManagerId,status){
  return request({
    url:`/storeManager/${storeManagerId}/${status}`,
    method:'put',
    data:{id:storeManagerId,status:status}
  })
}
//编辑店长信息
export function _update(storeManager){
  return request({
    url:'/storeManager/update',
    method:'put',
    data:storeManager
  })
}
//添加店长
export function _add(storeManager){
  return request({
    url:`/storeManager/add`,
    method:'post',
    data:storeManager
  })
}

//根据省份获取店铺
export function _getStoreByProvince(region){
  return request({
    url:`/storeManager/getStoreByProvince/all`,
    method:'get',
    params:{region:'all'}
  })
}

//根据店长名称或联系方式获取店长信息
export function _search(page,pageSize,criteria){
  return request({
    url:`/storeManager/pageList/${page}/${pageSize}`,
    method:'get',
    params:{page:page,pageSize:pageSize,criteria:criteria},
    data:{page:page,pageSize:pageSize,criteria:criteria}
  })
}
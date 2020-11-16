import request from './request'

export function _login(params){
  return request({
    url:'/login',
    method:'post',
    data:params
  })
}
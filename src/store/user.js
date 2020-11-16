import Cookie from 'js-cookie'
export default {
  state:{
    token:'',
    username:'',
  },
  mutations:{
    // 用户名
    setUsername(state,val){
      state.username = val
      localStorage.setItem('username',val)
    },
    // token
    setToken(state,val){
      state.token = val
      localStorage.setItem('token',val)
    },

    //刷新时，vuex里面的数据可能会丢失，需要从cookie里面重新获取
    getToken(state){
      state.token = localStorage.getItem('token')
    },
    getUsername(state){
      state.username =  localStorage.getItem('username')
    },

    clearUsername(state){
      state.username =''
      localStorage.removeItem('username')
    },
    clearToken(state){
      state.token =''
      localStorage.removeItem('token')
    },
  },  
}
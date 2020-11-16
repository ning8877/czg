export default {
  state:{
    curMenu:null,
  },


  mutations:{
    // 设置值
    setCurMenu(state,val){
        state.curMenu = val
        localStorage.setItem('current',JSON.stringify(val))
    },
    // 刷新时重新设置值
    getCurMenu(state){
        state.curMenu =  JSON.parse(localStorage.getItem('current'))
    },

    clearMenu(state){
        state.menu = []
        localStorage.removeItem('menu')
    },
  }
}
import Vue from 'vue'
import VueRouter from 'vue-router'

//解决在页面中不能点击这个页面的路由的报错
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(VueRouter)


const login = ()=>import('@/views/login/Login')
const brand = ()=>import('@/views/brand/Brand')
const addBrand = ()=>import('@/views/brand/AddBrand')
const store = ()=>import('@/views/store/Store')
const addStore = ()=>import('@/views/store/AddStore')
const editStore = ()=>import('@/views/store/EditStore')
const storeManager =()=>import('@/views/storeManager/StoreManager')
const addStoreM =()=>import('@/views/storeManager/AddStoreM')
const editStoreM =()=>import('@/views/storeManager/EditStoreM')

export default new VueRouter({
  routes:[
    {
      path:'',
      redirect:'/brand'
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/brand',
      name:'brand',
      meta:{index:1},
      component:brand
    },
    {
      path:'/addBrand',
      name:'addBrand',
      meta:{index:2},
      component:addBrand
    },
    {
      path:'/store',
      name:'store',
      meta:{index:1},
      component:store
    },
    {
      path:'/addStore',
      name:'addStore',
      meta:{index:2},
      component:addStore
    },
    {
      path:'/editStore',
      name:'editStore',
      meta:{index:2},
      component:editStore
    },
    {
      path:'/storeManager',
      name:'storeManager',
      meta:{index:1},
      component:storeManager
    },
    {
      path:'/addStoreM',
      name:'addStoreM',
      meta:{index:2},
      component:addStoreM
    },
    {
      path:'/editStoreM',
      name:'editStoreM',
      meta:{index:2},
      component:editStoreM
    }
  ]
})



